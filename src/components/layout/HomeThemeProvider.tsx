'use client';

import { useEffect } from 'react';

export function HomeThemeProvider() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    return () => {
      document.documentElement.setAttribute('data-theme', 'dark');
    };
  }, []);
  return null;
}
