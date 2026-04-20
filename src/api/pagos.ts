import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const solicitarAcceso = async (
  email: string,
  folio: string
): Promise<{ mensaje: string; estatus: string }> => {
  const { data } = await api.post('/api/pagos/solicitar-acceso', { email, folio });
  return data;
};

export const verificarEstatus = async (
  email: string
): Promise<{ estatus: string }> => {
  const { data } = await api.get(`/api/pagos/verificar-estatus/${encodeURIComponent(email)}`);
  return data;
};