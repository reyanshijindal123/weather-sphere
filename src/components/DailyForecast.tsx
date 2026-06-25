'use client';

import React from 'react';
import Image from 'next/image';
import { DailyForecast, TemperatureUnit } from '@/types';
import { convertDailyTemps } from '@/helpers/forecast-helper';
import { getTempUnit } from '@/helpers/temperature-helper';

interface DailyForecastProps {
  data: DailyForecast[];
  unit: TemperatureUnit;
}

export default function DailyForecastGrid({ data, unit }: DailyForecastProps) {
  const converted = convertDailyTemps(data, unit);
  const unitLabel = getTempUnit(unit);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-white font-semibold text-lg">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {converted.map((day, i) => (
          <div
            key={i}
            className="glass-inner rounded-2xl p-3 flex flex-col items-center gap-2 hover:bg-white/15 transition-all"
          >
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wide">{day.dayName}</span>
            <Image src={day.icon} alt={day.description} width={40} height={40} className="drop-shadow" />
            <div className="text-center">
              <p className="text-white font-bold text-sm">{day.tempMax}{unitLabel}</p>
              <p className="text-white/50 text-xs">{day.tempMin}{unitLabel}</p>
            </div>
            <span className="text-white/50 text-xs text-center leading-tight capitalize hidden sm:block">
              {day.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
