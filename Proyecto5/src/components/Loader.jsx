export default function Loader({ label = "Cargando…" }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/40 p-4">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
      <span className="text-sm text-slate-200">{label}</span>
    </div>
  );
}