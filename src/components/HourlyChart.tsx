'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HourlyForecast, TemperatureUnit } from '@/types';
import { convertHourlyTemps } from '@/helpers/forecast-helper';
import { getTempUnit } from '@/helpers/temperature-helper';

interface HourlyChartProps {
  data: HourlyForecast[];
  unit: TemperatureUnit;
}

interface TooltipData {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipData) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm shadow-xl">
      <p className="text-white/60 text-xs">{label}</p>
      <p className="text-white font-bold">{payload[0]?.value}°</p>
      {payload[1] && <p className="text-sky-300 text-xs">{payload[1].value}% rain</p>}
    </div>
  );
}

export default function HourlyChart({ data, unit }: HourlyChartProps) {
  const converted = convertHourlyTemps(data, unit);
  const unitLabel = getTempUnit(unit);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-white font-semibold text-lg">Hourly Forecast</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={converted} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="time"
            tick={{ fill: 'rgba(255, 255, 255, 0.96)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={12}
          />
          <YAxis
            yAxisId="temp"
            tick={{ fill: 'rgba(255,255,255,0.96)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            tickFormatter={(v) => `${v}${unitLabel}`}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            yAxisId="temp"
            type="monotone"
            dataKey="temp"
            stroke="#60a5fa"
            strokeWidth={2.5}
            fill="url(#tempGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#60a5fa', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
