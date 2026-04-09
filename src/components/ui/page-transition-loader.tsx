"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BarLoader from "@/components/ui/bar-loader";

const SHOW_DELAY_MS = 300;

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathRef = useRef(pathname);

  // When pathname changes, navigation has completed — cancel timer and hide loader
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      setVisible(false);
    }
  }, [pathname]);

  // Lock body scroll while the loader is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Intercept internal link clicks to start the delay timer
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      // Don't start a new timer if one is already running
      if (showTimerRef.current) return;

      showTimerRef.current = setTimeout(() => {
        setVisible(true);
        showTimerRef.current = null;
      }, SHOW_DELAY_MS);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(2,2,2,0.85)",
        backdropFilter: "blur(4px)",
        pointerEvents: "all",
      }}
    >
      <BarLoader color="#ff0033" bars={8} barWidth={10} barHeight={60} speed={1.2} />
    </div>
  );
}
