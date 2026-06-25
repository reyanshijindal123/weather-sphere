'use client';

import React from 'react';

const shimmer = 'animate-pulse bg-white/20 rounded-xl';

export function WeatherCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className={`${shimmer} h-8 w-40`} />
          <div className={`${shimmer} h-4 w-24`} />
        </div>
        <div className={`${shimmer} h-20 w-20 rounded-full`} />
      </div>
      <div className={`${shimmer} h-16 w-32`} />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${shimmer} h-16`} />
        ))}
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className={`${shimmer} h-6 w-32`} />
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${shimmer} h-28 flex-1`} />
        ))}
      </div>
    </div>
  );
}

export function GraphSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className={`${shimmer} h-6 w-40`} />
      <div className={`${shimmer} h-48 w-full`} />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
      </div>
      <p className="text-white/70 text-lg font-medium animate-pulse">Fetching weather data…</p>
    </div>
  );
}
