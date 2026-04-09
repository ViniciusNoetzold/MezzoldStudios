import { useEffect, RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), textarea:not([disabled]), ' +
  '[tabindex]:not([tabindex="-1"])';

/**
 * Focus-traps keyboard navigation inside `ref` while `active` is true.
 *
 * • Tab / Shift+Tab cycle within the trapped element.
 * • Pressing Escape calls `onEscape` (e.g. to close the modal).
 * • Focus is restored to the previously-focused element on cleanup.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
): void {
  useEffect(() => {
    if (!active) return;

    const container = ref.current;
    if (!container) return;

    // Remember which element had focus before the trap activated.
    const prevActive = document.activeElement as HTMLElement | null;

    // Helper — re-query on each key event so dynamic content is included.
    function getFocusables(): HTMLElement[] {
      return Array.from(
        container!.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter(el => getComputedStyle(el).display !== 'none');
    }

    // Focus the first focusable element after the animation frame settles.
    requestAnimationFrame(() => {
      const first = getFocusables()[0];
      first?.focus();
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = getFocusables();
      if (focusables.length === 0) { e.preventDefault(); return; }

      const first = focusables[0];
      const last  = focusables[focusables.length - 1];
      const isInside = container!.contains(document.activeElement);

      if (e.shiftKey) {
        // Shift+Tab at first element (or focus escaped) → wrap to last
        if (!isInside || document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab at last element (or focus escaped) → wrap to first
        if (!isInside || document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the element that was active before the trap.
      prevActive?.focus({ preventScroll: true });
    };
  }, [active, ref, onEscape]);
}
