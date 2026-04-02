'use client';
import * as React from "react";
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface XScrollProps extends ScrollAreaProps {
  captureRef?: React.RefObject<HTMLElement | null>;
}

export default function XScroll({ children, className, captureRef, ...props }: XScrollProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollElement = containerRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (!scrollElement) return;

    const listenerElement = captureRef?.current || scrollElement;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Already horizontal
      
      const isAtLeft = scrollElement.scrollLeft <= 0;
      const isAtRight = scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth - 1;

      // Only hijack if we can scroll
      if (e.deltaY > 0 && !isAtRight) {
        e.preventDefault();
        scrollElement.scrollBy({ left: e.deltaY * 0.5, behavior: 'auto' });
      } else if (e.deltaY < 0 && !isAtLeft) {
        e.preventDefault();
        scrollElement.scrollBy({ left: e.deltaY * 0.5, behavior: 'auto' });
      }
    };

    listenerElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => listenerElement.removeEventListener('wheel', handleWheel);
  }, [captureRef]);

  return (
    <div className="flex w-full overflow-hidden" ref={containerRef}>
      <ScrollArea className={cn('w-full flex-1', className)} {...props}>
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
