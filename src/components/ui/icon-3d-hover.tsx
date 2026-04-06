'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  heading?: string;
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  date?: string;
  readTime?: string;
  category?: string;
}

export const IconHover3D: React.FC<Props> = ({
  heading = 'Blog',
  text = 'Leia o artigo completo.',
  className = '',
  icon,
  date,
  readTime,
  category,
}) => {
  const [hovered, setHovered] = useState(false);

  const titleTransition = {
    duration: 0.28,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    type: 'tween' as const,
  };

  return (
    <motion.div
      className={`w-full flex items-center gap-6 p-5 md:p-6 rounded-2xl border border-white/[0.07] bg-[#0f0f0f] cursor-pointer select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: '#141414' }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon box */}
      <motion.div
        style={{
          width: 76,
          height: 76,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 14,
          border: '1.5px solid rgba(255,255,255,0.10)',
          backgroundColor: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
        animate={{
          borderColor: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)',
          backgroundColor: hovered ? '#111111' : '#0a0a0a',
        }}
        transition={{ duration: 0.22 }}
      >
        {/* Glow on hover */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)',
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          animate={{ opacity: hovered ? 1 : 0.6, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.22 }}
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Text content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 6 }}>
        
        {/* Meta data (Category, Date, Read Time) */}
        {(category || date || readTime) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 11, fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', marginBottom: 2 }}>
            {category && <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{category}</span>}
            {category && (date || readTime) && <span>•</span>}
            {date && <span>{date}</span>}
            {date && readTime && <span>•</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}

        {/* Heading with white fill animation */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', overflow: 'hidden', borderRadius: 4, alignSelf: 'flex-start', maxWidth: '100%' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans, sans-serif)',
              fontWeight: 700,
              fontSize: 15,
              color: '#ffffff',
              position: 'relative',
              zIndex: 2,
              padding: '2px 6px',
              whiteSpace: 'normal',
              lineHeight: '1.4',
            }}
          >
            {heading}
          </span>
          <motion.span
            style={{
              position: 'absolute',
              inset: 0,
              color: '#0a0a0a',
              fontWeight: 700,
              fontSize: 15,
              fontFamily: 'var(--font-sans, sans-serif)',
              clipPath: hovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              zIndex: 3,
              padding: '2px 6px',
              lineHeight: '1.4',
            }}
            animate={{ clipPath: hovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
            transition={titleTransition}
          >
            {heading}
          </motion.span>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              transformOrigin: 'left center',
              scaleX: 0,
              zIndex: 1,
              borderRadius: 4,
            }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={titleTransition}
          />
        </div>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: 'var(--font-sans, sans-serif)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.40)',
            lineHeight: '1.55',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
};
