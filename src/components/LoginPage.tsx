'use client';

import React, { useState } from 'react';
import { Cloud, User, Mail, ArrowRight } from 'lucide-react';
import { User as UserType } from '@/types';
import { setUser } from '@/helpers/storage-helper';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function validate(): boolean {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim() || name.trim().length < 2) errs.name = 'Please enter your name (min 2 chars).';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const user: UserType = { name: name.trim(), email: email.trim(), createdAt: Date.now() };
    setUser(user);
    onLogin(user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4 shadow-xl">
            <Cloud size={32} className="text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight">Nimbus</h1>
          <p className="text-white/60 text-sm mt-1">Your personal weather companion</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 space-y-6">
          <div>
            <h2 className="text-white text-xl font-semibold">Get started</h2>
            <p className="text-white/50 text-sm mt-1">Enter your details to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Your name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-white placeholder:text-white/30 text-sm outline-none focus:ring-2 focus:ring-white/30 transition-all ${errors.name ? 'ring-2 ring-red-400/50' : ''}`}
                />
              </div>
              {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-white placeholder:text-white/30 text-sm outline-none focus:ring-2 focus:ring-white/30 transition-all ${errors.email ? 'ring-2 ring-red-400/50' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-lg"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <p className="text-white/30 text-xs text-center mt-6">Your data stays on your device.</p>
      </div>
    </div>
  );
}
