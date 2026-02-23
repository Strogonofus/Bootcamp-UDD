import { useState } from "react";
import { getCurrentWeather } from "./services/openmeteo.js";
import WeatherCard from "./components/WeatherCard.jsx";

export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    try {
      setError("");
      const result = await getCurrentWeather(city);
      setData(result);
    } catch (err) {
      setData(null);
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold mb-4 text-blue-200">
          🌤 Weather App
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe una ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl"
          >
            Buscar
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-300">
            ❌ {error}
          </p>
        )}

        {data && (
          <WeatherCard data={data} />
        )}
      </div>
    </div>
  );
}