"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAccent } from "../layout/AccentProvider";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: number;
    title: string;
    description: string;
    link?: string;
    // eslint-disable-next-line
    icon: any;
    tags: string[];
    accentData: { border: string; glow: string; text: string; bg: string; glowRgb: string; borderActive: string; shadowActive: string; };
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setAccent } = useAccent();

  const handleTap = (idx: number) => {
    // On touch devices, tap toggles the accent — hover handles desktop
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setHoveredIndex((prev) => {
        const next = prev === idx ? null : idx;
        if (next !== null) {
          const a = items[next].accentData;
          setAccent(a.text.replace('text-', 'bg-'), a.glowRgb);
        }
        return next;
      });
    }
  };

  const handleHover = (idx: number | null) => {
    setHoveredIndex(idx);
    if (idx !== null) {
      const a = items[idx].accentData;
      setAccent(a.text.replace('text-', 'bg-'), a.glowRgb);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const accent = item.accentData;
        const isHovered = hoveredIndex === idx;

        return (
          <div
            key={item.id}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => handleHover(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => handleTap(idx)}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-white/[0.05] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className={cn(
               isHovered ? accent.border : 'border-white/10 group-hover:border-white/20'
            )}>
              <div className={cn('p-2 rounded-lg w-fit mb-4', accent.bg)}>
                <Icon className={cn('size-5', accent.text)} strokeWidth={1.5} />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <div className="flex flex-wrap gap-1.5 mt-6">
                 {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        'font-mono text-[9px] tracking-widest uppercase border px-2 py-1 rounded transition-colors',
                        isHovered
                          ? [accent.text, 'border-current/30 bg-current/5']
                          : 'border-white/15 text-white/55 bg-white/[0.04]'
                      )}
                    >
                      {tag}
                    </span>
                 ))}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden bg-[#141414] border relative z-20 transition-colors duration-300",
        className
      )}
    >
      <div className="relative z-50 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white font-bold uppercase tracking-widest leading-snug mt-2 text-sm md:text-base", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-white/80 tracking-wide leading-relaxed text-xs md:text-sm flex-1",
        className
      )}
    >
      {children}
    </p>
  );
};
