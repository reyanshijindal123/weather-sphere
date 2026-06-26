'use client';

import React from 'react';
import Image from 'next/image';
import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset, Thermometer, Heart } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '@/types';
import { formatTemp, convertTemp } from '@/helpers/temperature-helper';
import { formatTime, formatDate } from '@/helpers/date-helper';
import { formatVisibility, formatWindSpeed, capitalizeDescription, getIconUrl } from '@/helpers/weather-helper';
import { useWeatherStore } from '@/app/store/weatherStore';

interface WeatherCardProps {
  data:WeatherData;
  unit: TemperatureUnit;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onUnitToggle: () => void;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="glass-inner p-3 rounded-xl flex items-center gap-3">
      <div className="text-white/60 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-white/50 text-xs">{label}</p>
        <p className="text-white font-semibold text-sm truncate">{value}</p>
      </div>
    </div>
  );
}

export default function WeatherCard({ data,unit, isFavourite, onToggleFavourite, onUnitToggle }: WeatherCardProps) {
  
  const temp = convertTemp(data.temp, unit);
  const feelsLike = convertTemp(data.feelsLike, unit);
  const unitLabel = unit === 'celsius' ? '°C' : '°F';

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-3xl font-bold">
            {data.city}
            <span className="text-white/50 text-xl font-normal">, {data.country}</span>
          </h2>
          <p className="text-white/60 text-sm mt-1">{formatDate(data.dt)}</p>
          <p className="text-white/80 text-base mt-1 capitalize">{capitalizeDescription(data.description)}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={onToggleFavourite}
            className={`p-2 rounded-xl transition-all ${isFavourite ? 'bg-rose-500/30 text-rose-400' : 'bg-white/10 text-white/50 hover:text-rose-400'}`}
            title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Heart size={18} className={isFavourite ? 'fill-rose-400' : ''} />
          </button>
          <Image
            src={getIconUrl(data.icon, 4)}
            alt={data.description}
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>
      </div>

      {/* Temperature */}
      <div className="flex items-end gap-4">
        <div className="text-white font-bold" style={{ fontSize: '5rem', lineHeight: 1 }}>
          {temp}
          <span className="text-4xl">{unitLabel}</span>
        </div>
        <div className="pb-2">
          <button
            onClick={onUnitToggle}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
          >
            Switch to {unit === 'celsius' ? '°F' : '°C'}
          </button>
          <p className="text-white/50 text-xs mt-1">Feels like {feelsLike}{unitLabel}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatItem icon={<Droplets size={16} />} label="Humidity" value={`${data.humidity}%`} />
        <StatItem icon={<Wind size={16} />} label="Wind" value={formatWindSpeed(data.windSpeed)} />
        <StatItem icon={<Gauge size={16} />} label="Pressure" value={`${data.pressure} hPa`} />
        <StatItem icon={<Eye size={16} />} label="Visibility" value={formatVisibility(data.visibility)} />
        <StatItem icon={<Sunrise size={16} />} label="Sunrise" value={formatTime(data.sunrise, data.timezone)} />
        <StatItem icon={<Sunset size={16} />} label="Sunset" value={formatTime(data.sunset, data.timezone)} />
      </div>
    </div>
  );
}
