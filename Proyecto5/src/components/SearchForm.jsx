import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce.js";

export default function SearchForm({ onSearch }) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 350);

  useEffect(() => {
    // Búsqueda automática cuando el usuario deja de escribir (opcional)
    // Si no lo quieres, borra este useEffect y usa solo el submit.
  }, [debounced]);

  function handleSubmit(e) {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-sm outline-none focus:border-slate-500"
        placeholder="Ej: Santiago, CL"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Buscar ciudad"
      />
      <button
        type="submit"
        className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
      >
        Buscar
      </button>
    </form>
  );
}