'use client';

import React from 'react';
import { Sun, Moon, Monitor, Heart, LogOut, Cloud } from 'lucide-react';
import { User } from '@/types';
import { useThemeMode } from '@/hooks';

interface NavbarProps {
  user: User;
  favouritesCount: number;
  onLogout: () => void;
}

const themeIcons = {
  light: <Sun size={16} />,
  dark: <Moon size={16} />,
  system: <Monitor size={16} />,
};

export default function Navbar({ user, favouritesCount, onLogout }: NavbarProps) {
  const { currentTheme, cycleTheme, mounted } = useThemeMode();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/10 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Cloud size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight hidden sm:block">Nimbus</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* User greeting */}
          <span className="text-white/70 text-sm hidden md:block truncate max-w-[120px]">
            Hi, {user.name.split(' ')[0]}
          </span>

          {/* Favourites count */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 text-white/80 text-sm">
            <Heart size={14} className="fill-rose-400 text-rose-400" />
            <span className="font-semibold">{favouritesCount}</span>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
              title={`Theme: ${currentTheme}`}
            >
              {themeIcons[currentTheme]}
            </button>
          )}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/30 text-white/80 hover:text-white transition-all text-sm"
          >
            <LogOut size={14} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
