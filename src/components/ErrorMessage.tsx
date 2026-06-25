'use client';

import React from 'react';
import { AlertTriangle, MapPinOff, WifiOff, SearchX } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

function getErrorIcon(message: string) {
  if (message.includes('permission') || message.includes('location')) return <MapPinOff size={32} />;
  if (message.includes('network') || message.includes('fetch')) return <WifiOff size={32} />;
  if (message.includes('not found') || message.includes('City')) return <SearchX size={32} />;
  return <AlertTriangle size={32} />;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="glass-card p-8 flex flex-col items-center gap-4 text-center">
      <div className="text-orange-400">{getErrorIcon(message)}</div>
      <div>
        <p className="text-white font-semibold">Something went wrong</p>
        <p className="text-white/60 text-sm mt-1 max-w-sm">{message}</p>
      </div>
    </div>
  );
}
