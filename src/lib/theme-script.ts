/**
 * Inline script — injected into <head> before React hydrates.
 * Sets data-theme on <html> with zero FOUC.
 * Must be a self-contained IIFE — no imports, no module syntax.
 */
export const themeScript = `(function(){
  try {
    var saved = localStorage.getItem('mezzold-theme');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e){}
})();`;
