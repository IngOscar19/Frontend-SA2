type GafeteProps = {
  datos: {
    estatus: string;
    email: string;
    folio: string;
  };
};

const Gafete = ({ datos }: GafeteProps) => {
  const nombre = datos.email.split('@')[0].toUpperCase();
  const codigo = `${nombre.split('.')[0]}-${datos.folio}`;

  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 p-6 shadow-2xl text-center relative overflow-hidden">
      
      {/* Luces decorativas de fondo (Glow) */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Encabezado del Gafete */}
        <div className="bg-slate-950/80 rounded-2xl px-4 py-4 mb-6 border border-slate-800 shadow-inner">
          <p className="text-cyan-500/80 text-xs font-mono font-semibold uppercase tracking-widest mb-1">
            Congreso de Programación 2026
          </p>
          <p className="text-slate-100 text-sm font-bold tracking-widest">ITSES</p>
        </div>

        {/* Información del Usuario */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-mono">
            Usuario / Correo
          </p>
          <p className="text-sm font-medium text-slate-300">{datos.email}</p>
        </div>

        {/* Código de Acceso (Destacado) */}
        <div className="bg-slate-950 rounded-2xl px-4 py-5 border border-cyan-500/30 mb-8 relative group">
          <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-cyan-400/70 uppercase tracking-widest mb-2 font-mono">
            Código de acceso
          </p>
          <p className="text-2xl font-black text-cyan-400 tracking-widest font-mono drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            {codigo}
          </p>
        </div>

        {/* Acción */}
        <button
          onClick={() => window.print()}
          className="w-full bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
        >
          {/* Ícono SVG de impresión genérico */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Descargar gafete
        </button>

        <p className="text-xs text-slate-500 mt-5 font-mono">
          [ Presenta este código en el acceso ]
        </p>
      </div>
    </div>
  );
};

export default Gafete;