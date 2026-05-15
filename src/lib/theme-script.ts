/**
 * Inline script injected into <head> before React hydrates.
 * Reads the saved preference from localStorage to avoid flash of wrong theme.
 * Falls back to dark (the default Mezzold theme).
 */
export const themeScript = `(function(){
  try {
    var saved = localStorage.getItem('mezzold-theme');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;
