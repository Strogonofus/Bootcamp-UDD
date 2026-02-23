// 1️⃣ Obtener coordenadas desde nombre de ciudad
async function getCoordinates(city) {
  const geoUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
  geoUrl.searchParams.set("name", city);
  geoUrl.searchParams.set("count", 1);
  geoUrl.searchParams.set("language", "es");
  geoUrl.searchParams.set("format", "json");

  const geoRes = await fetch(geoUrl.toString());
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Ciudad no encontrada");
  }

  return geoData.results[0];
}

// 2️⃣ Obtener clima actual con lat/lon
export async function getCurrentWeather(city) {
  const location = await getCoordinates(city);

  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", location.latitude);
  weatherUrl.searchParams.set("longitude", location.longitude);
  weatherUrl.searchParams.set("current", "temperature_2m,wind_speed_10m");
  weatherUrl.searchParams.set("timezone", "auto");

  const weatherRes = await fetch(weatherUrl.toString());
  const weatherData = await weatherRes.json();

  return {
    name: location.name,
    country: location.country,
    temperature: weatherData.current.temperature_2m,
    wind: weatherData.current.wind_speed_10m,
  };
}