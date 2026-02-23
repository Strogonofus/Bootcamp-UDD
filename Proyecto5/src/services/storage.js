const KEY = "weather_favorites_v1";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(city) {
  const current = getFavorites();
  const exists = current.includes(city);
  const next = exists ? current.filter((c) => c !== city) : [city, ...current];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function removeFavorite(city) {
  const current = getFavorites();
  const next = current.filter((c) => c !== city);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}