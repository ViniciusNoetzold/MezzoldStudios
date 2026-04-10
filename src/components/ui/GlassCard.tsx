'use client';

import React, { useCallback, useRef } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'red' | 'cyan' | 'emerald' | 'none';
  rippleColor?: string; // CSS color for the ripple — defaults to white
}

export function GlassCard({
  children,
  className = '',
  glowColor = 'none',
  rippleColor = 'rgba(255,255,255,0.35)',
}: GlassCardProps) {
  const glowClass = glowColor !== 'none' ? `hover:glow-${glowColor}` : '';
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const nextId = useRef(0);

  const spawnRipple = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const el = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let cx: number, cy: number;

    if ('touches' in e) {
      cx = e.touches[0].clientX - el.left;
      cy = e.touches[0].clientY - el.top;
    } else {
      cx = e.clientX - el.left;
      cy = e.clientY - el.top;
    }

    const id = nextId.current++;
    setRipples((prev) => [...prev, { id, x: cx, y: cy }]);

    // Remove after animation completes (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return (
    <div
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-foreground/20 hover:-translate-y-1 active:scale-[0.97] cursor-pointer select-none overflow-hidden relative ${glowClass} ${className}`}
      onMouseDown={spawnRipple}
      onTouchStart={spawnRipple}
    >
      {/* Ripple layer */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            background: rippleColor,
            animation: 'glassRipple 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        />
      ))}

      {children}

      <style>{`
        @keyframes glassRipple {
          0%   { width: 0;     height: 0;     opacity: 1; }
          100% { width: 300px; height: 300px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
