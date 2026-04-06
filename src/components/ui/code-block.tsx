'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const lines = (code ?? '').split('\n');

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#070707] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_40px_-12px_rgba(0,0,0,0.6)]">

      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-white/[0.025]">
        <div className="flex items-center gap-2">
          <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          {lang && (
            <span className="ml-3 font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 border border-white/[0.08] px-2 py-0.5 rounded-md">
              {lang}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copiar código"
          className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] uppercase transition-colors duration-150 cursor-pointer"
          style={{ color: copied ? 'rgb(52 211 153)' : 'rgba(255,255,255,0.28)' }}
        >
          {copied ? (
            <>
              <Check size={10} />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy size={10} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="flex overflow-x-auto">

        {/* Line numbers — desktop only */}
        <div
          aria-hidden="true"
          className="hidden md:flex flex-col shrink-0 pt-5 pb-5 px-4 select-none border-r border-white/[0.05]"
          style={{ background: 'rgba(255,255,255,0.012)' }}
        >
          {lines.map((_, i) => (
            <span
              key={i}
              className="font-mono leading-relaxed text-right"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.12)', lineHeight: '1.7' }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code */}
        <pre
          className="flex-1 p-5 font-mono leading-relaxed overflow-x-auto"
          style={{
            fontSize: 12.5,
            color: 'rgba(255,255,255,0.82)',
            lineHeight: '1.7',
            background: 'transparent',
          }}
        >
          <code>{code}</code>
        </pre>

      </div>
    </div>
  );
}
