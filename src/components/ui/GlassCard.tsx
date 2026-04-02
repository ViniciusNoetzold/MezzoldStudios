import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'red' | 'cyan' | 'emerald' | 'none';
}

export function GlassCard({ children, className = '', glowColor = 'none' }: GlassCardProps) {
  const glowClass = glowColor !== 'none' ? `hover:glow-${glowColor}` : '';
  
  return (
    <div className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${glowClass} ${className}`}>
      {children}
    </div>
  );
}
