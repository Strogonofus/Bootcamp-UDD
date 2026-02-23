export default function WeatherCard({ data }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">
        {data.name}, {data.country}
      </h2>

      <p className="mt-3 text-3xl font-semibold">
        🌡 {data.temperature}°C
      </p>

      <p className="mt-2">
        💨 Viento: {data.wind} km/h
      </p>
    </div>
  );
}