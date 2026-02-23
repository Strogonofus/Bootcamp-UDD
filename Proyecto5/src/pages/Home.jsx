import { useMemo, useState } from "react";
import SearchForm from "../components/SearchForm.jsx";
import Loader from "../components/Loader.jsx";
import ErrorState from "../components/ErrorState.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import { getCurrentWeather } from "../services/weatherstack.js";
import { getFavorites, toggleFavorite } from "../services/storage.js";

export default function Home() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const favorites = useMemo(() => getFavorites(), [data]); // simple refresh

  async function handleSearch(query) {
    try {
      setStatus("loading");
      setError("");
      const result = await getCurrentWeather(query);

      if (result?.error) {
        throw new Error(result.error.info || "Error al consultar la API");
      }

      setData(result);
      setStatus("success");
    } catch (e) {
      setData(null);
      setError(e?.message ?? "Error desconocido");
      setStatus("error");
    }
  }

  function handleToggleFavorite(locationName) {
    toggleFavorite(locationName);
    // refrescar UI: pequeño truco (sin complicar con más estado)
    setData((prev) => (prev ? { ...prev } : prev));
  }

  const locationName = data
    ? `${data.location.name}, ${data.location.country}`
    : "";

  const isFav = locationName ? favorites.includes(locationName) : false;

  return (
    <div>
      <h2 className="text-xl font-semibold">Busca el clima</h2>
      <p className="mt-1 text-sm text-slate-300">
        Escribe una ciudad (ej: “Santiago, CL”).
      </p>

      <div className="mt-4">
        <SearchForm onSearch={handleSearch} />
      </div>

      {status === "loading" ? (
        <div className="mt-4">
          <Loader label="Consultando Weatherstack…" />
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-4">
          <ErrorState title="No se pudo obtener el clima" message={error} />
        </div>
      ) : null}

      {status === "success" && data ? (
        <WeatherCard
          data={data}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFav}
        />
      ) : null}
    </div>
  );
}