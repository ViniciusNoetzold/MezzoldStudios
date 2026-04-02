'use client';

import React, { useEffect, useRef } from 'react';

const HalideTopoHero: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance animation
    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';

    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)';
    }, 300);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
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
          width: '900px', // Um pouco maior que o original, mas ainda formato de quadro
          height: '550px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Layer 1 – Imagem de Workspace Dev / Código */}
        <div
          ref={(el) => { if (el) layersRef.current[0] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(255,255,255,0.02)',
            boxShadow: 'inset 0 0 100px 30px rgba(2,2,2,1), 0 20px 60px rgba(0,0,0,0.8)',
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1) contrast(1.1) brightness(0.2)',
            borderRadius: '24px',
          }}
        />
        {/* Layer 2 – Brilho e contraste digital */}
        <div
          ref={(el) => { if (el) layersRef.current[1] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            border: 'none',
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(0.3) contrast(1.3) brightness(0.5)',
            opacity: 0.3,
            mixBlendMode: 'screen',
            borderRadius: '24px',
          }}
        />
        {/* Layer 3 – Toque sutil vermelho/neon por cima */}
        <div
          ref={(el) => { if (el) layersRef.current[2] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(255,0,51,0.05)',
            background: 'radial-gradient(ellipse at top right, rgba(255,0,51,0.15), transparent 70%)',
            boxShadow: 'inset 0 0 40px rgba(255,0,51,0.05)',
            opacity: 0.8,
            mixBlendMode: 'overlay',
            borderRadius: '24px',
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
            backgroundImage:
              'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,0,51,0.04) 41px, transparent 42px)',
            transform: 'translateZ(120px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export { HalideTopoHero };
