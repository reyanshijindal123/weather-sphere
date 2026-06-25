import { TemperatureUnit } from '@/types';

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const value = convertTemp(celsius, unit);
  return `${value}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

export function getTempUnit(unit: TemperatureUnit): string {
  return unit === 'fahrenheit' ? '°F' : '°C';
}
