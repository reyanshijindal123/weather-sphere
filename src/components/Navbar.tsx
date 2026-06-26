'use client';

import { Sun, Moon, Monitor, Heart, LogOut, Cloud } from 'lucide-react';
import { User } from '@/types';
import React ,{useState} from "react";

interface NavbarProps {
  user: User;
  favouritesCount: number;
  onLogout: () => void;
}

const  themeIcons= {
  light: <Sun size={16} />,
  dark: <Moon size={16} />,
  system: <Monitor size={16} />,
};

export default function Navbar({ user, favouritesCount, onLogout }: NavbarProps) {
  const[showLogoutModal, setShowLogoutModal] = useState(false);


  return (
  <>
    {/* ── Navbar ── */}
    <nav className="sticky top-0 z-50 glass-card rounded-none! border-b border-white/10 px-4 py-3">
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

          {/* Logout button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all text-sm shadow-md hover:shadow-lg"
          >
            <LogOut size={14} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>

    {/* ── Logout Modal ── */}
    {showLogoutModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-[90%] max-w-sm rounded-2xl bg-slate-900 border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Logout</h2>
          <p className="mt-2 text-white/70">Are you sure you want to logout?</p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            >
              Cancel
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    
    )}
  </>
  );
}
  