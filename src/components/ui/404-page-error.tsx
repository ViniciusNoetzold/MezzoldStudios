"use client";

import React, { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "lg" | "icon";
  children: React.ReactNode;
}

function Button({ variant = "default", size = "default", children, className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-mono text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = {
    default:
      "bg-electric-red text-white hover:bg-electric-red/80 focus:ring-electric-red/50 shadow-[0_0_20px_-4px_rgba(255,0,51,0.5)]",
    outline:
      "border border-white/10 bg-white/5 text-mezzold-text hover:bg-white/10 hover:border-white/20 focus:ring-white/20 backdrop-blur-md",
  };

  const sizes = {
    default: "h-9 px-4 rounded-lg",
    lg: "h-11 px-6 rounded-xl text-base",
    icon: "h-9 w-9 rounded-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-mezzold-bg text-mezzold-text flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,0,51,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center text-center gap-6 max-w-lg"
        style={{ animation: "fadeIn 0.6s ease both" }}
      >
        {/* 404 */}
        <div className="relative select-none">
          <span
            className="text-[10rem] sm:text-[14rem] font-mono font-black leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,0,51,0.3)",
              textShadow: "0 0 80px rgba(255,0,51,0.15)",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[14rem] font-mono font-black leading-none tracking-tighter text-electric-red"
            style={{
              clipPath: "inset(0 0 60% 0)",
              opacity: 0.9,
              animation: "glitch 4s infinite",
            }}
            aria-hidden="true"
          >
            404
          </span>
        </div>

        {/* Label */}
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-electric-red/40" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-electric-red/70">
            Página não encontrada
          </span>
          <div className="h-px w-8 bg-electric-red/40" />
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm sm:text-base leading-relaxed font-mono max-w-sm">
          A rota que você tentou acessar não existe ou foi removida. Verifique o
          endereço ou volte para o início.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Button
            size="lg"
            onClick={() => (window.location.href = "/")}
            aria-label="Ir para página inicial"
          >
            <Home size={18} aria-hidden="true" />
            Ir para o início
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            aria-label="Voltar para a página anterior"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Voltar
          </Button>
        </div>

        {/* Support link */}
        <p className="text-white/25 text-xs font-mono mt-2">
          Algo quebrado?{" "}
          <Link
            href="/#contact"
            className="text-electric-red/60 hover:text-electric-red transition-colors underline underline-offset-4"
          >
            Fale com a gente
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitch {
          0%, 90%, 100% { clip-path: inset(0 0 60% 0); transform: none; }
          91% { clip-path: inset(0 0 55% 0); transform: translateX(-3px); }
          93% { clip-path: inset(0 0 65% 0); transform: translateX(3px); }
          95% { clip-path: inset(0 0 58% 0); transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
}

export default Component;
