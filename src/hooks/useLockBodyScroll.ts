import { useEffect } from 'react';

/**
 * Locks body scroll when `locked` is true.
 *
 * Prevents layout shift on Windows (and any OS with overlay scrollbars) by
 * measuring the scrollbar width BEFORE applying `overflow: hidden` and
 * compensating with an equal `padding-right` on the body.
 *
 * Cleans up automatically when the component that calls this hook unmounts,
 * so the user is never left unable to scroll.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    // Capture scrollbar width while the scrollbar is still visible.
    // window.innerWidth includes the scrollbar; clientWidth does not.
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Snapshot existing inline values so we can restore them exactly.
    const prevOverflow     = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // Lock scroll and compensate for the scrollbar disappearing.
    document.body.style.overflow     = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow     = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}
