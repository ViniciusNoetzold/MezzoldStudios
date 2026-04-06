'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  const [tapped, setTapped] = React.useState(false);

  const handleClick = () => {
    // Only use state-based flip on touch devices — pointer devices use CSS hover
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setTapped((f) => !f);
    }
  };

  return (
    <div
      className="group/flipping-card [perspective:1000px] w-full"
      style={
        {
          "--height": typeof height === "number" ? `${height}px` : height,
          "--width": typeof width === "number" ? `${width}px` : width,
          minHeight: "var(--height)",
        } as React.CSSProperties
      }
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Toque para ver os detalhes"
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
    >
      <div
        className={cn(
          "relative rounded-xl border border-white/10 bg-transparent shadow-2xl transition-all duration-700 [transform-style:preserve-3d]",
          // Desktop: CSS hover flip
          "group-hover/flipping-card:[transform:rotateY(180deg)]",
          // Mobile: state-based flip
          tapped && "[transform:rotateY(180deg)]",
          "h-[var(--height)] w-[var(--width)]",
          className
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-neutral-950 text-neutral-50 overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <div className="[transform:translateZ(40px)] h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-neutral-900 border border-white/5 text-neutral-50 overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="[transform:translateZ(40px)] h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
