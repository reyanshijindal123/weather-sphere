'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { getUser, removeUser } from '@/helpers/storage-helper';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import { FullPageLoader } from '@/components/Skeletons';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = getUser();
    setUser(stored);
    setHydrated(true);
  }, []);

  function handleLogin(u: User) {
    setUser(u);
  }

  function handleLogout() {
    removeUser();
    setUser(null);
  }

  if (!hydrated) return <FullPageLoader />;
  if (!user) return <LoginPage onLogin={handleLogin} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}
