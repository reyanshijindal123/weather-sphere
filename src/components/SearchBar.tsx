'use client';

import React, { useState, useRef } from 'react';
import { Search, Clock, MapPin, X } from 'lucide-react';
import { SearchHistory, FavouriteCity } from '@/types';

interface SearchBarProps {
  onSearch: (city: string) => void;
  history: SearchHistory[];
  favourites: FavouriteCity[];
  isLoading: boolean;
}

export default function SearchBar({ onSearch, history, favourites, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  }

  function handleSelect(city: string) {
    setQuery(city);
    setShowDropdown(false);
    onSearch(city);
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Search city…"
          className="w-full pl-11 pr-12 py-3 rounded-2xl glass-input text-white placeholder:text-white/40 text-sm font-medium outline-none focus:ring-2 focus:ring-white/30 transition-all"
          disabled={isLoading}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white/80 hover:text-white text-xs font-semibold transition-all disabled:opacity-180"
        >
          Go
        </button>
      </form>

      {showDropdown && (history.length > 0 || favourites.length > 0) && (
        <div className="absolute top-full mt-2 w-full glass-card rounded-2xl overflow-hidden z-50 shadow-2xl">
          {history.length > 0 && (
            <div className="p-2">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider px-2 py-1">Recent</p>
              {history.map((h) => (
                <button
                  key={h.id}
                  onMouseDown={() => handleSelect(h.city)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white text-sm transition-all text-left"
                >
                  <Clock size={13} className="text-white/40 shrink-0" />
                  {h.city}
                </button>
              ))}
            </div>
          )}
          {favourites.length > 0 && (
            <div className="p-2 border-t border-white/10">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider px-2 py-1">Favourites</p>
              {favourites.map((f) => (
                <button
                  key={f.id}
                  onMouseDown={() => handleSelect(f.city)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white text-sm transition-all text-left"
                >
                  <MapPin size={13} className="text-rose-400 shrink-0" />
                  {f.city}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
