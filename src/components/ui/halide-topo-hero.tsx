'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/layout/ThemeProvider';

const HalideTopoHero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  const currentRotX = useRef(55);
  const currentRotZ = useRef(-25);
  const targetRotX = useRef(55);
  const targetRotZ = useRef(-25);
  const currentLayerPos = useRef<{ x: number; y: number }[]>([
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
  ]);
  const targetLayerPos = useRef<{ x: number; y: number }[]>([
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
  ]);
  const glowPos = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);
  const isLightRef = useRef(isLight);

  // Keep ref in sync with prop so the RAF loop reads it without stale closure
  useEffect(() => {
    isLightRef.current = isLight;
  }, [isLight]);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  function animate() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const speed = isHovering.current ? 0.08 : 0.03;

    currentRotX.current = lerp(currentRotX.current, targetRotX.current, speed);
    currentRotZ.current = lerp(currentRotZ.current, targetRotZ.current, speed);
    canvas.style.transform = `rotateX(${currentRotX.current}deg) rotateZ(${currentRotZ.current}deg)`;

    layersRef.current.forEach((layer, index) => {
      if (!layer) return;
      const depth = (index + 1) * 20;
      const tx = targetLayerPos.current[index];
      const cx = currentLayerPos.current[index];
      cx.x = lerp(cx.x, tx.x, speed);
      cx.y = lerp(cx.y, tx.y, speed);
      layer.style.transform = `translateZ(${depth}px) translate(${cx.x}px, ${cx.y}px)`;
    });

    if (glowRef.current) {
      const glowColor = isLightRef.current
        ? `radial-gradient(circle 400px at ${glowPos.current.x}% ${glowPos.current.y}%, rgba(220,0,40,0.14) 0%, rgba(200,60,0,0.06) 40%, transparent 70%)`
        : `radial-gradient(circle 400px at ${glowPos.current.x}% ${glowPos.current.y}%, rgba(255,0,51,0.18) 0%, rgba(255,80,0,0.08) 40%, transparent 70%)`;
      glowRef.current.style.background = glowColor;
    }

    rafRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      isHovering.current = true;

      const xFactor = (window.innerWidth / 2 - e.pageX) / 20;
      const yFactor = (window.innerHeight / 2 - e.pageY) / 20;

      targetRotX.current = 55 + yFactor * 0.7;
      targetRotZ.current = -25 + xFactor * 0.7;

      layersRef.current.forEach((_, index) => {
        targetLayerPos.current[index] = {
          x: xFactor * (index + 1) * 0.55,
          y: yFactor * (index + 1) * 0.55,
        };
      });

      if (canvas) {
        const rect = canvas.closest('[data-halide-wrapper]')?.getBoundingClientRect()
          ?? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        glowPos.current = {
          x: ((e.clientX - rect.left) / (rect.width || 1)) * 100,
          y: ((e.clientY - rect.top) / (rect.height || 1)) * 100,
        };
      }
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      targetRotX.current = 55;
      targetRotZ.current = -25;
      layersRef.current.forEach((_, index) => {
        targetLayerPos.current[index] = { x: 0, y: 0 };
      });
    };

    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';

    const timeout = setTimeout(() => {
      canvas.style.transition = 'opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      setTimeout(() => { canvas.style.transition = 'none'; }, 2600);
    }, 300);

    const wrapper = canvas.closest('[data-halide-wrapper]') ?? canvas.parentElement;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { threshold: 0 }
    );
    if (wrapper) io.observe(wrapper);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    if (!prefersReduced) rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      io.disconnect();
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line
  }, []);

  /* ─── Theme-specific style tokens ────────────────────────── */
  const layer1Style: React.CSSProperties = isLight
    ? {
        filter: 'grayscale(0.4) contrast(1.05) brightness(0.72)',
        boxShadow: 'inset 0 0 80px 20px rgba(220,220,225,0.55), 0 30px 80px rgba(160,160,170,0.45)',
        border: '1px solid rgba(0,0,0,0.07)',
      }
    : {
        filter: 'grayscale(0.6) contrast(1.2) brightness(0.45)',
        boxShadow: 'inset 0 0 80px 20px rgba(2,2,2,0.9), 0 30px 80px rgba(0,0,0,0.9)',
        border: '1px solid rgba(255,255,255,0.04)',
      };

  const layer2Style: React.CSSProperties = isLight
    ? {
        filter: 'grayscale(0.5) contrast(1.1) brightness(0.9)',
        opacity: 0.25,
        mixBlendMode: 'multiply',
      }
    : {
        filter: 'grayscale(0.1) contrast(1.4) brightness(0.7)',
        opacity: 0.45,
        mixBlendMode: 'screen',
      };

  const layer4Style: React.CSSProperties = isLight
    ? {
        border: '1px solid rgba(200,0,30,0.08)',
        background: 'radial-gradient(ellipse at top right, rgba(200,0,30,0.09), transparent 65%)',
        boxShadow: 'inset 0 0 50px rgba(200,0,30,0.04)',
        opacity: 0.85,
        mixBlendMode: 'multiply',
      }
    : {
        border: '1px solid rgba(255,0,51,0.08)',
        background: 'radial-gradient(ellipse at top right, rgba(255,0,51,0.12), transparent 65%)',
        boxShadow: 'inset 0 0 50px rgba(255,0,51,0.06)',
        opacity: 0.9,
        mixBlendMode: 'overlay',
      };

  const topoColor = isLight ? 'rgba(180,0,30,0.07)' : 'rgba(255,0,51,0.06)';

  const shineStyle: React.CSSProperties = isLight
    ? { background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)' }
    : { background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)' };

  return (
    <div
      data-halide-wrapper
      style={{
        perspective: '2000px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        ref={canvasRef}
        style={{
          position: 'relative',
          width: 'min(960px, 100vw)',
          height: 'min(580px, 56vw)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Layer 1 – Base image */}
        <div
          ref={(el) => { if (el) layersRef.current[0] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1400')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
            ...layer1Style,
          }}
        />

        {/* Layer 2 – Accent overlay */}
        <div
          ref={(el) => { if (el) layersRef.current[1] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1400')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
            ...layer2Style,
          }}
        />

        {/* Layer 3 – Dynamic glow that follows mouse */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: isLight
              ? 'radial-gradient(circle 400px at 50% 50%, rgba(220,0,40,0.14) 0%, transparent 70%)'
              : 'radial-gradient(circle 400px at 50% 50%, rgba(255,0,51,0.18) 0%, transparent 70%)',
            borderRadius: '24px',
            mixBlendMode: isLight ? 'multiply' : 'overlay',
            pointerEvents: 'none',
            transition: 'background 0.15s ease',
          }}
        />

        {/* Layer 4 – Static red neon tint */}
        <div
          ref={(el) => { if (el) layersRef.current[2] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            ...layer4Style,
          }}
        />

        {/* Topographic contour lines */}
        <div
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 38px, ${topoColor} 39px, transparent 40px)`,
            transform: 'translateZ(140px)',
            pointerEvents: 'none',
          }}
        />

        {/* Shine line sweep */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            transform: 'translateZ(5px)',
            pointerEvents: 'none',
            ...shineStyle,
          }}
        />
      </div>
    </div>
  );
};

export { HalideTopoHero };
