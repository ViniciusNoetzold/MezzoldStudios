"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mezzold_cookie_consent");
    if (!consent) {
      // Pequeno delay para a mensagem aparecer de forma elegante logo após o carregamento inicial
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mezzold_cookie_consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "120%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6 pointer-events-none"
        >
          <div 
            className="pointer-events-auto max-w-4xl mx-auto rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ 
              background: 'rgba(5, 5, 5, 0.85)',
              backdropFilter: 'blur(24px) saturate(180%)',
             }}
          >
            <div className="flex-1 flex gap-4">
              <div className="shrink-0 mt-1 text-2xl drop-shadow-md">
                🛡️
              </div>
              <div>
                <h3 className="font-sans font-black text-white text-lg tracking-tight mb-1 flex items-center gap-2">
                  Bem-vindo ao Mezzold Studio 👋
                </h3>
                <p className="text-xs md:text-sm text-white/50 leading-relaxed font-sans font-medium">
                  Tratamos seus dados com o mesmo rigor tecnológico que aplicamos às nossas soluções. Utilizamos cookies mínimos e não-intrusivos para assegurar uma experiência fluida, segura e otimizada.
                </p>
              </div>
            </div>
            
            <div className="flex shrink-0 w-full md:w-auto gap-3">
              <a 
                href="/privacidade"
                className="flex flex-1 md:flex-none items-center justify-center h-11 px-5 rounded-xl border border-white/10 text-white/60 font-mono text-[10px] tracking-[0.2em] uppercase hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-[0.98]"
              >
                Política
              </a>
              <button
                onClick={handleAccept}
                className="flex flex-1 md:flex-none items-center justify-center h-11 px-7 rounded-xl bg-white text-black font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-200 active:scale-[0.98]"
              >
                Ciente
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
