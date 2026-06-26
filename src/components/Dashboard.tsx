'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { User, FavouriteCity } from '@/types';
import { useWeather, useForecast, useGeolocation, useTempUnit } from '@/hooks';
import { groupForecastByDay, getHourlyForecast } from '@/helpers/forecast-helper';
import { getWeatherBackground } from '@/helpers/weather-helper';
import { buildCityId } from '@/helpers/location-helper';
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  isFavourite,
  getSearchHistory,
  addSearchHistory,
} from '@/helpers/storage-helper';

import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import HourlyChart from '@/components/HourlyChart';
import DailyForecastGrid from '@/components/DailyForecast';
import ErrorMessage from '@/components/ErrorMessage';
import { WeatherCardSkeleton, ForecastSkeleton, GraphSkeleton } from '@/components/Skeletons';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const weather = useWeather();
  const forecast = useForecast();
  const geo = useGeolocation();
  const { unit, toggleUnit } = useTempUnit();

  const [favourites, setFavourites] = useState<FavouriteCity[]>([]);
  const [searchHistory, setSearchHistory] = useState(getSearchHistory());

  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  // Auto-fetch from geolocation
  useEffect(() => {
    if (geo.coords) {
      weather.fetchByCoords(geo.coords.lat, geo.coords.lon);
      forecast.fetchByCoords(geo.coords.lat, geo.coords.lon);
    }
  }, [geo.coords]);

  const handleSearch = useCallback(
    (city: string) => {
      weather.fetchByCity(city);
      forecast.fetchByCity(city);
      addSearchHistory(city);
      setSearchHistory(getSearchHistory());
    },
    [weather, forecast]
  );

  function handleToggleFavourite() {
    if (!weather.data) return;
    const id = buildCityId(weather.data.city, weather.data.country);
    if (isFavourite(id)) {
      removeFavourite(id);
    } else {
      addFavourite({ id, city: weather.data.city, country: weather.data.country, addedAt: Date.now() });
    }
    setFavourites(getFavourites());
  }

  const currentFavId = weather.data ? buildCityId(weather.data.city, weather.data.country) : '';
  const bgGradient = weather.data ? getWeatherBackground(weather.data.conditionMain) : 'from-sky-600 via-blue-500 to-indigo-600';

  const daily = forecast.data ? groupForecastByDay(forecast.data.items) : [];
  const hourly = forecast.data ? getHourlyForecast(forecast.data.items) : [];

  const isLoading = weather.loading || forecast.loading;
  const hasData = weather.data !== null;
  const error = weather.error ?? forecast.error ?? geo.error;

  return (
    <div className={`min-h-screen bg-gradient-to-br transition-all duration-1000 ${bgGradient}`}>
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar user={user} favouritesCount={favourites.length} onLogout={onLogout} />

        <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
            history={searchHistory}
            favourites={favourites}
            isLoading={isLoading}
          />

          {/* Error state */}
          {error && !isLoading && <ErrorMessage message={error} />}

          {/* Loading state */}
          {isLoading && !hasData && (
            <div className="space-y-6">
              <WeatherCardSkeleton />
              <GraphSkeleton />
              <ForecastSkeleton />
            </div>
          )}

          {/* Data */}
          {weather.data && (
            <div className="space-y-6 animate-fadeIn">
              <WeatherCard
                data={weather.data}
                unit={unit}
                isFavourite={isFavourite(currentFavId)}
                onToggleFavourite={handleToggleFavourite}
                onUnitToggle={toggleUnit}
              />

              {hourly.length > 0 && <HourlyChart data={hourly} unit={unit} />}
              {daily.length > 0 && <DailyForecastGrid data={daily} unit={unit} />}
            </div>
          )}

          {/* Empty state */}
          {!weather.data && !isLoading && !error && (
            <div className="glass-card p-12 text-center">
              <p className="text-white/50 text-lg">Search for a city to get started</p>
              <p className="text-white/30 text-sm mt-2">Or allow location access for local weather</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
