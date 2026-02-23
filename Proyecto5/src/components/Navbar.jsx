import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  [
    "rounded-xl px-3 py-2 text-sm transition",
    isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌦️</span>
          <h1 className="text-base font-semibold">Weather App</h1>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}