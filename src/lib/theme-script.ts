/**
 * Inline script — injected into <head> before React hydrates.
 * Always sets dark theme — light theme removed.
 */
export const themeScript = `(function(){
  try {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.removeItem('mezzold-theme');
  } catch(e){}
})();`;
