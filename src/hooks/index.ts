'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ForecastData, TemperatureUnit } from '@/types';
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecastByCity, fetchForecastByCoords } from '@/services/weather-service';
import { getCurrentPosition } from '@/helpers/location-helper';
import { getTempUnit, setTempUnit as saveTempUnit } from '@/helpers/storage-helper';
import { useTheme } from 'next-themes';
import { ThemeMode } from '@/types';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(key, JSON.stringify(resolved));
          } catch {
            // ignore
          }
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, set] as const;
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeatherByCity(city);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeatherByCoords(lat, lon);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchByCity, fetchByCoords };
}

export function useForecast() {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchForecastByCity(city);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchForecastByCoords(lat, lon);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchByCity, fetchByCoords };
}

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      setCoords({ lat: position.latitude, lon: position.longitude });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Location error.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    detect();
  }, [detect]);

  return { coords, loading, error, detect };
}

export function useThemeMode() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (theme as ThemeMode) ?? 'system' : 'system';
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(currentTheme) + 1) % order.length];
    setTheme(next);
  }, [currentTheme, setTheme]);

  return { currentTheme, isDark, mounted, cycleTheme, setTheme };
}

export function useTempUnit() {
  const [unit, setUnitState] = useState<TemperatureUnit>('celsius');

  useEffect(() => {
    setUnitState(getTempUnit());
  }, []);

  const toggleUnit = useCallback(() => {
    setUnitState((prev) => {
      const next: TemperatureUnit = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      saveTempUnit(next);
      return next;
    });
  }, []);

  return { unit, toggleUnit };
}
