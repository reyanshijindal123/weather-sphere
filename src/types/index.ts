export interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
  conditionMain: string;
  timezone: number;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  conditionMain: string;
  pop: number;
}

export interface ForecastData {
  city: string;
  country: string;
  items: ForecastItem[];
}

export interface DailyForecast {
  date: string;
  dayName: string;
  icon: string;
  description: string;
  tempMax: number;
  tempMin: number;
  conditionMain: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  pop: number;
}

export interface User {
  name: string;
  email: string;
  createdAt: number;
}

export interface FavouriteCity {
  id: string;
  city: string;
  country: string;
  addedAt: number;
}

export interface SearchHistory {
  id: string;
  city: string;
  searchedAt: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type ThemeMode = 'light' | 'dark' | 'system';
export type WeatherCondition = 'Clear' | 'Clouds' | 'Rain' | 'Drizzle' | 'Snow' | 'Thunderstorm' | 'Mist' | 'Haze' | 'Fog' | 'Default';
