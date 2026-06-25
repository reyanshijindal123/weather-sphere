import { User, FavouriteCity, SearchHistory, TemperatureUnit } from '@/types';
import { STORAGE_KEYS, MAX_SEARCH_HISTORY } from '@/constants';

function safeGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private browsing
  }
}

function safeRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function getUser(): User | null {
  return safeGet<User>(STORAGE_KEYS.USER);
}

export function setUser(user: User): void {
  safeSet(STORAGE_KEYS.USER, user);
}

export function removeUser(): void {
  safeRemove(STORAGE_KEYS.USER);
}

export function getFavourites(): FavouriteCity[] {
  return safeGet<FavouriteCity[]>(STORAGE_KEYS.FAVOURITES) ?? [];
}

export function addFavourite(city: FavouriteCity): void {
  const favs = getFavourites();
  if (!favs.find((f) => f.id === city.id)) {
    safeSet(STORAGE_KEYS.FAVOURITES, [...favs, city]);
  }
}

export function removeFavourite(id: string): void {
  const favs = getFavourites().filter((f) => f.id !== id);
  safeSet(STORAGE_KEYS.FAVOURITES, favs);
}

export function isFavourite(id: string): boolean {
  return getFavourites().some((f) => f.id === id);
}

export function getSearchHistory(): SearchHistory[] {
  return safeGet<SearchHistory[]>(STORAGE_KEYS.SEARCH_HISTORY) ?? [];
}

export function addSearchHistory(city: string): void {
  const history = getSearchHistory().filter((h) => h.city.toLowerCase() !== city.toLowerCase());
  const newEntry: SearchHistory = { id: crypto.randomUUID(), city, searchedAt: Date.now() };
  safeSet(STORAGE_KEYS.SEARCH_HISTORY, [newEntry, ...history].slice(0, MAX_SEARCH_HISTORY));
}

export function clearSearchHistory(): void {
  safeRemove(STORAGE_KEYS.SEARCH_HISTORY);
}

export function getTempUnit(): TemperatureUnit {
  return safeGet<TemperatureUnit>(STORAGE_KEYS.TEMP_UNIT) ?? 'celsius';
}

export function setTempUnit(unit: TemperatureUnit): void {
  safeSet(STORAGE_KEYS.TEMP_UNIT, unit);
}
