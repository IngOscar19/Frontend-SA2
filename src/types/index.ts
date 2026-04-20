export type EstatusPago =
  | 'IDLE'
  | 'PROCESANDO'
  | 'CONFIRMADO'
  | 'PAGO PENDIENTE'
  | 'FOLIO INVÁLIDO'
  | 'ERROR';

export type FormularioData = {
  correo: string;
  folio: string;
};

export type RespuestaAPI = {
  estatus: EstatusPago;
  pago?: {
    id: number;
    folio_id: string;
    nombre: string;
    pago_verificado: boolean;
    canjeado: boolean;
    created_at: string;
  };
  codigo_acceso?: string;
  error?: string;
};