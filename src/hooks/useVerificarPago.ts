import { useState, useEffect, useRef, useCallback } from 'react';
import { solicitarAcceso, verificarEstatus } from '../api/pagos';

const INTERVALO_MS = 7000;

export type EstatusPago =
  | 'IDLE'
  | 'PROCESANDO'
  | 'Aceptado'
  | 'Rechazado'
  | 'ERROR';

type UseVerificarPagoReturn = {
  estatus: EstatusPago;
  error: string | null;
  iniciarVerificacion: (email: string, folio: string) => void;
  reiniciar: () => void;
};

export const useVerificarPago = (): UseVerificarPagoReturn => {
  const [estatus, setEstatus] = useState<EstatusPago>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<string>('');
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const detenerPolling = useCallback(() => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  }, []);

  const consultar = useCallback(async () => {
    try {
      const respuesta = await verificarEstatus(emailRef.current);
      const nuevoEstatus = respuesta.estatus as EstatusPago;
      setEstatus(nuevoEstatus);

      if (nuevoEstatus === 'Aceptado' || nuevoEstatus === 'Rechazado') {
        detenerPolling();
      }
    } catch {
      setEstatus('ERROR');
      setError('No se pudo conectar con el servidor.');
      detenerPolling();
    }
  }, [detenerPolling]);

  const iniciarVerificacion = useCallback(
    async (email: string, folio: string) => {
      emailRef.current = email;
      setEstatus('PROCESANDO');
      setError(null);

      try {
        await solicitarAcceso(email, folio);
        intervaloRef.current = setInterval(consultar, INTERVALO_MS);
      } catch (err) {
      setEstatus('ERROR');
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(
        axiosError?.response?.data?.error ?? 'No se pudo enviar la solicitud. Intenta de nuevo.'
      );
    }
      
    },
    [consultar]
  );

  const reiniciar = useCallback(() => {
    detenerPolling();
    setEstatus('IDLE');
    setError(null);
    emailRef.current = '';
  }, [detenerPolling]);

  useEffect(() => {
    return () => detenerPolling();
  }, [detenerPolling]);

  return { estatus, error, iniciarVerificacion, reiniciar };
};

