"use client";

import React from "react";

interface BarLoaderProps {
  bars?: number;
  barWidth?: number;
  barHeight?: number;
  /** Hex color, e.g. "#ff0033". Defaults to lime green. */
  color?: string;
  speed?: number;
  className?: string;
}

const BarLoader: React.FC<BarLoaderProps> = ({
  bars = 8,
  barWidth = 10,
  barHeight = 70,
  color = "#7CF562",
  speed = 1.2,
  className,
}) => {
  const barsArray = Array.from({ length: bars });

  return (
    <div className={`relative flex justify-center items-end gap-1 ${className ?? ""}`}>
      {barsArray.map((_, i) => (
        <div
          key={i}
          className="rounded-t-xl"
          style={{
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            backgroundColor: color,
            transformOrigin: "bottom",
            animation: `barLoader ${speed}s ease-in-out infinite`,
            animationDelay: `${(i + 1) * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BarLoader;
