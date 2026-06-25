export const STORAGE_KEYS = {
  USER: 'weather_user',
  FAVOURITES: 'weather_favourites',
  SEARCH_HISTORY: 'weather_search_history',
  TEMP_UNIT: 'weather_temp_unit',
  THEME: 'weather_theme',
} as const;

export const MAX_SEARCH_HISTORY = 5;
export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const ICON_BASE_URL = 'https://openweathermap.org/img/wn';

export const WEATHER_BACKGROUNDS: Record<string, string> = {
  Clear: 'from-amber-400 via-orange-300 to-sky-400',
  Clouds: 'from-slate-500 via-slate-400 to-slate-300',
  Rain: 'from-slate-700 via-blue-800 to-slate-600',
  Drizzle: 'from-slate-600 via-blue-700 to-slate-500',
  Snow: 'from-sky-200 via-blue-100 to-white',
  Thunderstorm: 'from-slate-900 via-purple-900 to-slate-800',
  Mist: 'from-slate-400 via-gray-300 to-slate-200',
  Haze: 'from-amber-300 via-orange-200 to-yellow-100',
  Fog: 'from-gray-400 via-gray-300 to-gray-200',
  Default: 'from-sky-600 via-blue-500 to-indigo-600',
};

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
