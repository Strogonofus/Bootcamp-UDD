import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
      <h2 className="text-xl font-semibold">404</h2>
      <p className="mt-2 text-sm text-slate-300">Esta página no existe.</p>
      <Link
        to="/"
        className="mt-4 inline-block rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900"
      >
        Volver al inicio
      </Link>
    </div>
  );
}