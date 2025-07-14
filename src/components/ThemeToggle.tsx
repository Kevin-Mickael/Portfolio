'use client';

import React, { useEffect, useState } from 'react';
import { Row, ToggleButton, useTheme } from '@once-ui-system/core';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('light');

  // Fonction pour détecter le thème actuel
  const getCurrentTheme = (): 'light' | 'dark' | 'system' => {
    const savedTheme = localStorage.getItem('data-theme');
    if (savedTheme === 'system' || !savedTheme) {
      return 'system';
    }
    return savedTheme as 'light' | 'dark';
  };

  // Fonction pour obtenir le thème résolu (light/dark)
  const getResolvedTheme = (): 'light' | 'dark' => {
    const current = getCurrentTheme();
    if (current === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return current;
  };

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    if (mounted) {
      setCurrentTheme(getCurrentTheme());
    }
  }, [theme, mounted]);

  // Écouter les changements de préférence système
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getCurrentTheme() === 'system') {
        setCurrentTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  if (!mounted) {
    return (
      <ToggleButton
        prefixIcon="dark"
        onClick={() => {}}
        aria-label="Chargement du thème"
        disabled
      />
    );
  }

  const resolvedTheme = getResolvedTheme();
  const icon = resolvedTheme === 'dark' ? 'light' : 'dark';
  const nextTheme = currentTheme === 'system' ? 'light' : 
                   currentTheme === 'light' ? 'dark' : 'light';

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Passer en mode ${nextTheme === 'dark' ? 'sombre' : 'clair'}`}
    />
  );
};
