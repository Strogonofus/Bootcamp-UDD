import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/storage.js";
import { getCurrentWeather } from "../services/weatherstack.js";
import Loader from "../components/Loader.jsx";
import ErrorState from "../components/ErrorState.jsx";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [weatherByCity, setWeatherByCity] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(getFavorites());
  }, []);

  useEffect(() => {
    async function loadAll() {
      try {
        setStatus("loading");
        setError("");

        const results = {};
        for (const city of items) {
          const res = await getCurrentWeather(city);
          if (res?.error) continue;
          results[city] = res;
        }
        setWeatherByCity(results);
        setStatus("success");
      } catch (e) {
        setError(e?.message ?? "Error desconocido");
        setStatus("error");
      }
    }

    if (items.length) loadAll();
  }, [items]);

  function handleRemove(city) {
    removeFavorite(city);
    setItems(getFavorites());
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Favoritos</h2>
      <p className="mt-1 text-sm text-slate-300">
        Ciudades guardadas en tu navegador.
      </p>

      {!items.length ? (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
          <p className="text-sm text-slate-200">No tienes favoritos aún.</p>
        </div>
      ) : null}

      {status === "loading" ? (
        <div className="mt-4">
          <Loader label="Cargando favoritos…" />
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-4">
          <ErrorState title="No se pudieron cargar los favoritos" message={error} />
        </div>
      ) : null}

      <div className="mt-4 grid gap-3">
        {items.map((city) => {
          const data = weatherByCity[city];
          const temp = data?.current?.temperature;
          const desc = data?.current?.weather_descriptions?.[0];

          return (
            <div
              key={city}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/30 p-4"
            >
              <div>
                <p className="font-semibold">{city}</p>
                {data ? (
                  <p className="text-sm text-slate-300">
                    {temp}°C · {desc}
                  </p>
                ) : (
                  <p className="text-sm text-slate-400">Sin datos aún</p>
                )}
              </div>

              <button
                onClick={() => handleRemove(city)}
                className="rounded-xl bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
              >
                Quitar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}