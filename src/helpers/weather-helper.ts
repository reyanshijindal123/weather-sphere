import { WeatherCondition } from '@/types';
import { WEATHER_BACKGROUNDS, ICON_BASE_URL } from '@/constants';

export function getWeatherBackground(condition: string): string {
  return WEATHER_BACKGROUNDS[condition] ?? WEATHER_BACKGROUNDS['Default'];
}

export function getWeatherCondition(main: string): WeatherCondition {
  const valid: WeatherCondition[] = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Snow', 'Thunderstorm', 'Mist', 'Haze', 'Fog'];
  return valid.includes(main as WeatherCondition) ? (main as WeatherCondition) : 'Default';
}

export function getIconUrl(icon: string, size: 2 | 4 = 2): string {
  return `${ICON_BASE_URL}/${icon}@${size}x.png`;
}

export function getWindDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export function formatVisibility(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
}

export function formatWindSpeed(mps: number): string {
  return `${Math.round(mps * 3.6)} km/h`;
}

export function capitalizeDescription(desc: string): string {
  return desc.charAt(0).toUpperCase() + desc.slice(1);
}
