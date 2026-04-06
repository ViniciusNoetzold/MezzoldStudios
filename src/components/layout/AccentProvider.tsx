'use client';

import React, { createContext, useContext, useState } from 'react';

type AccentContextType = {
  accentColor: string;
  accentRgb: string;
  setAccent: (color: string, rgb: string) => void;
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export function AccentProvider({ children }: { children: React.ReactNode }) {
  // Default fallback initial tone from Mezzold (electric-red)
  const [accentColor, setAccentColor] = useState('bg-[#ff0033]');
  const [accentRgb, setAccentRgb] = useState('255,0,51');

  return (
    <AccentContext.Provider value={{ accentColor, accentRgb, setAccent: (c, r) => { setAccentColor(c); setAccentRgb(r); } }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const context = useContext(AccentContext);
  if (!context) return { accentColor: 'bg-[#ff0033]', accentRgb: '255,0,51', setAccent: () => {} };
  return context;
}
