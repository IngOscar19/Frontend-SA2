import { useState, type FormEvent } from 'react';
import { useVerificarPago } from '../hooks/useVerificarPago';
import Gafete from '../components/Gafete';

type FormularioData = {
  email: string;
  folio: string;
};

const Home = () => {
  const [form, setForm] = useState<FormularioData>({ email: '', folio: '' });
  const { estatus, error, iniciarVerificacion, reiniciar } = useVerificarPago();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    iniciarVerificacion(form.email.trim(), form.folio.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 selection:bg-cyan-500/30">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase shadow-[0_0_10px_rgba(34,211,238,0.1)]">
            ITSES · 2026
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
            GATEKEEPER
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-light">
            Sistema de Verificación de Acceso
          </p>
        </div>

        {/* ── FORMULARIO (IDLE o ERROR) ── */}
        {(estatus === 'IDLE' || estatus === 'ERROR') && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-200 mb-1">
              Solicitar acceso
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Ingresa tus credenciales para verificar el pago
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Correo institucional
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nombre@itses.edu.mx"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Folio de pago
                </label>
                <input
                  type="text"
                  name="folio"
                  value={form.folio}
                  onChange={handleChange}
                  placeholder="Ej. FOL001"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                />
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                  <p className="text-sm text-rose-400 text-center font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 mt-4 shadow-lg shadow-cyan-500/25"
              >
                Verificar acceso →
              </button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-6">
              Solo dominios <span className="text-slate-300 font-medium">@itses.edu.mx</span> autorizados
            </p>
          </div>
        )}

        {/* ── PROCESANDO — Polling activo ── */}
        {estatus === 'PROCESANDO' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10 text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-cyan-500/50 border-b-transparent border-l-transparent rounded-full animate-spin" />
            </div>
            <p className="text-slate-200 font-bold text-lg tracking-wide">Validando Credenciales</p>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Estableciendo conexión segura...<br />
              Consultando red cada 7 segundos.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500/40 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-cyan-500/70 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* ── ACEPTADO — Contenido protegido ── */}
        {estatus === 'Aceptado' && (
          <div className="space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-4 text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <p className="text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2">
                <span className="text-lg">✓</span> Pago verificado — Acceso concedido
              </p>
            </div>

            {/* Gafete Digital — CONTENIDO PROTEGIDO */}
            <div className="bg-slate-900 rounded-3xl p-1 border border-slate-800 shadow-2xl">
              <Gafete datos={{ estatus: 'Aceptado', email: form.email, folio: form.folio }} />
            </div>

            <button
              onClick={reiniciar}
              className="w-full text-sm text-slate-400 hover:text-cyan-400 transition-colors py-2 flex items-center justify-center gap-2"
            >
              <span>←</span> Consultar otro folio
            </button>
          </div>
        )}

        {/* ── RECHAZADO ── */}
        {estatus === 'Rechazado' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3">
              <span className="text-2xl">✕</span>
            </div>
            <h2 className="text-xl font-bold text-slate-200 mb-2">Acceso Denegado</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              El folio ingresado no se encuentra en la base de datos o ya fue registrado previamente.
            </p>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-left">
              <p className="text-xs text-slate-500 font-mono mb-3 uppercase tracking-wider">Log de intento:</p>
              <div className="space-y-1">
                <p className="text-sm text-slate-300">
                  <span className="text-slate-500 inline-block w-16">USER:</span> {form.email}
                </p>
                <p className="text-sm text-slate-300">
                  <span className="text-slate-500 inline-block w-16">KEY:</span> {form.folio}
                </p>
              </div>
            </div>

            <button
              onClick={reiniciar}
              className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3.5 rounded-xl transition-colors duration-200 border border-slate-700"
            >
              Reintentar
            </button>
          </div>
        )}

      </div>
    </main>
  );
};

export default Home;