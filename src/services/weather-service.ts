import { WeatherData, ForecastData, ForecastItem } from '@/types';
import { API_BASE_URL } from '@/constants';
import { kelvinToCelsius } from '@/helpers/temperature-helper';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY ?? '';

function assertApiKey(): void {
  if (!API_KEY) throw new Error('OpenWeatherMap API key is missing. Set NEXT_PUBLIC_OPENWEATHERMAP_API_KEY.');
}

async function apiFetch(endpoint: string, params: Record<string, string>): Promise<unknown> {
  assertApiKey();
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  url.searchParams.set('appid', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());

  if (!res.ok) {
    if (res.status === 404) throw new Error('City not found. Please check the name and try again.');
    if (res.status === 401) throw new Error('Invalid API key. Please check your configuration.');
    if (res.status === 429) throw new Error('Too many requests. Please try again later.');
    throw new Error(`Weather service error (${res.status}). Please try again.`);
  }

  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWeatherData(data: any): WeatherData {
  return {
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temp: kelvinToCelsius(data.main.temp),
    feelsLike: kelvinToCelsius(data.main.feels_like),
    tempMin: kelvinToCelsius(data.main.temp_min),
    tempMax: kelvinToCelsius(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed ?? 0,
    windDeg: data.wind?.deg ?? 0,
    pressure: data.main.pressure,
    visibility: data.visibility ?? 10000,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    conditionMain: data.weather[0].main,
    timezone: data.timezone,
    dt: data.dt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapForecastItem(item: any): ForecastItem {
  return {
    dt: item.dt,
    temp: kelvinToCelsius(item.main.temp),
    feelsLike: kelvinToCelsius(item.main.feels_like),
    tempMin: kelvinToCelsius(item.main.temp_min),
    tempMax: kelvinToCelsius(item.main.temp_max),
    humidity: item.main.humidity,
    windSpeed: item.wind?.speed ?? 0,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    conditionMain: item.weather[0].main,
    pop: item.pop ?? 0,
  };
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const data = await apiFetch('weather', { q: city });
  return mapWeatherData(data);
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const data = await apiFetch('weather', { lat: String(lat), lon: String(lon) });
  return mapWeatherData(data);
}

export async function fetchForecastByCity(city: string): Promise<ForecastData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (await apiFetch('forecast', { q: city, cnt: '40' })) as any;
  return {
    city: data.city.name,
    country: data.city.country,
    items: data.list.map(mapForecastItem),
  };
}

export async function fetchForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (await apiFetch('forecast', { lat: String(lat), lon: String(lon), cnt: '40' })) as any;
  return {
    city: data.city.name,
    country: data.city.country,
    items: data.list.map(mapForecastItem),
  };
}
