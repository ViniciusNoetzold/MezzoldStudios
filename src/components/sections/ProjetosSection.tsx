'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterKey = 'all' | 'performance' | 'dashboard' | 'saas' | 'automacao' | 'design-system' | 'experimento';
type Accent = 'red' | 'cyan' | 'emerald';

interface Project {
  id: string;
  category: Exclude<FilterKey, 'all'>;
  accent: Accent;
  catLabel: string;
  title: string;
  desc: string;
  tags: string[];
  tipo: string;
  ano: string;
  stack: string;
  href: string;
  cover: React.ReactNode;
}

// ─── Filters ──────────────────────────────────────────────────────────────────

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'performance', label: 'Performance' },
  { key: 'dashboard', label: 'Dashboards' },
  { key: 'saas', label: 'SaaS' },
  { key: 'automacao', label: 'Automação' },
  { key: 'design-system', label: 'Design System' },
  { key: 'experimento', label: 'Experimentos' },
];

// ─── Accent styles ────────────────────────────────────────────────────────────

const ACCENTS: Record<Accent, { cat: string; borderTop: string; hoverBorder: string; hoverShadow: string; cta: string; tag: string }> = {
  red:     { cat: 'text-electric-red', borderTop: 'bg-electric-red', hoverBorder: 'hover:border-electric-red/40', hoverShadow: 'hover:shadow-[0_0_32px_rgba(255,0,51,.10)]', cta: 'group-hover:text-electric-red', tag: 'border-electric-red/20 text-electric-red/70 bg-electric-red/[0.04]' },
  cyan:    { cat: 'text-cyan',         borderTop: 'bg-cyan',         hoverBorder: 'hover:border-cyan/40',         hoverShadow: 'hover:shadow-[0_0_32px_rgba(6,182,212,.10)]', cta: 'group-hover:text-cyan',    tag: 'border-cyan/20 text-cyan/70 bg-cyan/[0.04]' },
  emerald: { cat: 'text-emerald',      borderTop: 'bg-emerald',      hoverBorder: 'hover:border-emerald/40',      hoverShadow: 'hover:shadow-[0_0_32px_rgba(16,185,129,.10)]', cta: 'group-hover:text-emerald', tag: 'border-emerald/20 text-emerald/70 bg-emerald/[0.04]' },
};

// ─── SVG Covers ───────────────────────────────────────────────────────────────

function FeaturedCover() {
  return (
    <svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="560" height="420" fill="#0a0a0a"/>
      <defs><pattern id="fg1" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/></pattern></defs>
      <rect width="560" height="420" fill="url(#fg1)"/>
      {/* Sidebar */}
      <rect x="24" y="24" width="110" height="372" rx="8" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
      <text x="38" y="52" fontFamily="'DM Mono',monospace" fontSize="9" fill="#ededed" fontWeight="700" letterSpacing="2">MZZ</text>
      <rect x="38" y="60" width="74" height="0.5" fill="rgba(255,255,255,0.08)"/>
      <rect x="34" y="72" width="84" height="22" rx="5" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.22)" strokeWidth="0.6"/>
      <rect x="42" y="80" width="8" height="8" rx="2" fill="#06b6d4"/><text x="56" y="88" fontFamily="monospace" fontSize="7" fill="#06b6d4">Dashboard</text>
      <rect x="42" y="102" width="8" height="8" rx="2" fill="rgba(237,237,237,0.2)"/><text x="56" y="110" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Links</text>
      <rect x="42" y="120" width="8" height="8" rx="2" fill="rgba(237,237,237,0.2)"/><text x="56" y="128" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Analytics</text>
      <rect x="42" y="138" width="8" height="8" rx="2" fill="rgba(237,237,237,0.2)"/><text x="56" y="146" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Config</text>
      <rect x="34" y="360" width="84" height="22" rx="5" fill="rgba(255,0,51,0.10)" stroke="rgba(255,0,51,0.18)" strokeWidth="0.6"/>
      <text x="50" y="374" fontFamily="monospace" fontSize="7" fill="rgba(255,0,51,0.8)">PRO PLAN</text>
      {/* Topbar */}
      <rect x="148" y="24" width="388" height="36" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
      <text x="162" y="47" fontFamily="monospace" fontSize="8" fill="rgba(237,237,237,0.3)">mezzlink.io/dashboard</text>
      <rect x="480" y="33" width="42" height="18" rx="4" fill="rgba(255,0,51,0.85)"/>
      <text x="487" y="45" fontFamily="monospace" fontSize="7" fill="#fff">+ NOVO</text>
      {/* KPI row */}
      <rect x="148" y="72" width="88" height="54" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="160" y="90" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">TOTAL LINKS</text>
      <text x="160" y="110" fontFamily="'DM Sans',sans-serif" fontSize="18" fill="#ededed" fontWeight="900">1,248</text>
      <rect x="246" y="72" width="88" height="54" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="258" y="90" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">CLIQUES HOJE</text>
      <text x="258" y="110" fontFamily="'DM Sans',sans-serif" fontSize="18" fill="#06b6d4" fontWeight="900">8,391</text>
      <rect x="344" y="72" width="88" height="54" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="356" y="90" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">CONVERSÃO</text>
      <text x="356" y="110" fontFamily="'DM Sans',sans-serif" fontSize="18" fill="#10b981" fontWeight="900">4.8%</text>
      <rect x="442" y="72" width="94" height="54" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="454" y="90" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">UPTIME</text>
      <text x="454" y="110" fontFamily="'DM Sans',sans-serif" fontSize="18" fill="#ededed" fontWeight="900">99.9%</text>
      {/* Chart */}
      <rect x="148" y="138" width="220" height="120" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="160" y="158" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">CLIQUES / DIA</text>
      <polyline points="160,230 178,215 196,220 214,200 232,208 250,185 268,192 286,172 304,180 322,160 340,168 358,148" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="160,230 178,215 196,220 214,200 232,208 250,185 268,192 286,172 304,180 322,160 340,168 358,148 358,230" fill="rgba(6,182,212,0.06)" stroke="none"/>
      {/* Link table */}
      <rect x="378" y="138" width="158" height="120" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="390" y="158" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">ÚLTIMOS LINKS</text>
      <rect x="384" y="164" width="146" height="0.5" fill="rgba(255,255,255,0.06)"/>
      <text x="390" y="178" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">mzz.io/kEj2a</text><text x="480" y="178" fontFamily="monospace" fontSize="7" fill="#06b6d4">1.2k</text>
      <text x="390" y="194" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">mzz.io/tYw9x</text><text x="480" y="194" fontFamily="monospace" fontSize="7" fill="#06b6d4">847</text>
      <text x="390" y="210" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">mzz.io/pLmR3</text><text x="480" y="210" fontFamily="monospace" fontSize="7" fill="#06b6d4">391</text>
      <text x="390" y="226" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">mzz.io/qBn7s</text><text x="480" y="226" fontFamily="monospace" fontSize="7" fill="#06b6d4">218</text>
      {/* URL shortener */}
      <rect x="148" y="272" width="388" height="124" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="162" y="292" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)">ENCURTAR URL</text>
      <rect x="162" y="300" width="280" height="26" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7"/>
      <text x="172" y="317" fontFamily="monospace" fontSize="8" fill="rgba(237,237,237,0.3)">https://seusite.com/pagina-longa...</text>
      <rect x="450" y="300" width="72" height="26" rx="4" fill="rgba(255,0,51,0.85)"/>
      <text x="463" y="317" fontFamily="monospace" fontSize="8" fill="#fff">CRIAR</text>
      <rect x="162" y="336" width="360" height="44" rx="4" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.15)" strokeWidth="0.7"/>
      <text x="174" y="356" fontFamily="monospace" fontSize="9" fill="#06b6d4">mzz.io/xP9kR</text>
      <text x="174" y="371" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">Criado agora • 0 cliques • Ativo</text>
      {/* Glow */}
      <defs><radialGradient id="glowFeat" cx="80%" cy="80%" r="40%"><stop offset="0%" stopColor="rgba(255,0,51,0.12)"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
      <rect width="560" height="420" fill="url(#glowFeat)"/>
    </svg>
  );
}

function Cover1() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg1" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4"/></pattern>
        <radialGradient id="glowPerf" cx="18%" cy="50%" r="30%"><stop offset="0%" stopColor="rgba(255,0,51,0.15)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg1)"/>
      <circle cx="100" cy="130" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
      <circle cx="100" cy="130" r="60" fill="none" stroke="#ff0033" strokeWidth="8" strokeDasharray="320" strokeDashoffset="80" strokeLinecap="round" transform="rotate(-90 100 130)"/>
      <circle cx="100" cy="130" r="44" fill="#111"/>
      <text x="100" y="125" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontWeight="900" fontSize="26" fill="#ededed">94</text>
      <text x="100" y="142" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="2">SCORE</text>
      <text x="180" y="52" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="1.5">LCP</text>
      <rect x="210" y="44" width="300" height="10" rx="3" fill="rgba(255,255,255,0.05)"/><rect x="210" y="44" width="252" height="10" rx="3" fill="#10b981"/><text x="516" y="53" fontFamily="monospace" fontSize="7" fill="#10b981">1.2s</text>
      <text x="180" y="76" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="1.5">FID</text>
      <rect x="210" y="68" width="300" height="10" rx="3" fill="rgba(255,255,255,0.05)"/><rect x="210" y="68" width="66" height="10" rx="3" fill="#06b6d4"/><text x="516" y="77" fontFamily="monospace" fontSize="7" fill="#06b6d4">18ms</text>
      <text x="180" y="100" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="1.5">CLS</text>
      <rect x="210" y="92" width="300" height="10" rx="3" fill="rgba(255,255,255,0.05)"/><rect x="210" y="92" width="30" height="10" rx="3" fill="#10b981"/><text x="516" y="101" fontFamily="monospace" fontSize="7" fill="#10b981">0.01</text>
      <text x="180" y="124" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="1.5">TTFB</text>
      <rect x="210" y="116" width="300" height="10" rx="3" fill="rgba(255,255,255,0.05)"/><rect x="210" y="116" width="150" height="10" rx="3" fill="#ff0033"/><text x="516" y="125" fontFamily="monospace" fontSize="7" fill="#ff0033">310ms</text>
      <text x="180" y="158" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.22)" letterSpacing="1.5">WATERFALL</text>
      <rect x="210" y="165" width="24" height="6" rx="1" fill="#06b6d4" opacity="0.8"/>
      <rect x="236" y="165" width="60" height="6" rx="1" fill="#ff0033" opacity="0.7"/>
      <rect x="298" y="165" width="36" height="6" rx="1" fill="#10b981" opacity="0.7"/>
      <rect x="210" y="177" width="48" height="6" rx="1" fill="#06b6d4" opacity="0.6"/>
      <rect x="260" y="177" width="90" height="6" rx="1" fill="#ff0033" opacity="0.5"/>
      <rect x="210" y="189" width="120" height="6" rx="1" fill="#10b981" opacity="0.5"/>
      <rect width="540" height="260" fill="url(#glowPerf)"/>
    </svg>
  );
}

function Cover2() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg2" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"/></pattern>
        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(6,182,212,0.18)"/><stop offset="100%" stopColor="transparent"/></linearGradient>
        <radialGradient id="glowDash2" cx="60%" cy="30%" r="40%"><stop offset="0%" stopColor="rgba(6,182,212,0.10)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg2)"/>
      <rect x="16" y="16" width="100" height="54" rx="5" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"/>
      <text x="28" y="35" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.3)" letterSpacing="1">REQUESTS</text>
      <text x="28" y="56" fontFamily="'DM Sans',sans-serif" fontSize="20" fontWeight="900" fill="#06b6d4">24.8k</text>
      <text x="28" y="65" fontFamily="monospace" fontSize="6" fill="#10b981">↑ 12%</text>
      <rect x="126" y="16" width="100" height="54" rx="5" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"/>
      <text x="138" y="35" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.3)" letterSpacing="1">LATÊNCIA</text>
      <text x="138" y="56" fontFamily="'DM Sans',sans-serif" fontSize="20" fontWeight="900" fill="#ededed">84ms</text>
      <text x="138" y="65" fontFamily="monospace" fontSize="6" fill="#10b981">↓ 8ms</text>
      <rect x="236" y="16" width="100" height="54" rx="5" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"/>
      <text x="248" y="35" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.3)" letterSpacing="1">ERROS</text>
      <text x="248" y="56" fontFamily="'DM Sans',sans-serif" fontSize="20" fontWeight="900" fill="#ff0033">0.2%</text>
      <rect x="346" y="16" width="100" height="54" rx="5" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"/>
      <text x="358" y="35" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.3)" letterSpacing="1">UPTIME</text>
      <text x="358" y="56" fontFamily="'DM Sans',sans-serif" fontSize="20" fontWeight="900" fill="#10b981">99.9%</text>
      <rect x="456" y="16" width="68" height="54" rx="5" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.18)" strokeWidth="0.6"/>
      <circle cx="476" cy="38" r="5" fill="none" stroke="#06b6d4" strokeWidth="1.2"/>
      <circle cx="476" cy="38" r="2" fill="#06b6d4"/>
      <text x="470" y="60" fontFamily="monospace" fontSize="6.5" fill="#06b6d4">LIVE</text>
      <rect x="16" y="82" width="340" height="112" rx="5" fill="#0e0e0e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <text x="28" y="100" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)" letterSpacing="1">THROUGHPUT / 60s</text>
      <polyline points="28,165 55,155 82,148 109,158 136,142 163,132 190,138 217,118 244,124 271,108 298,115 325,104 344,100" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="28,165 55,155 82,148 109,158 136,142 163,132 190,138 217,118 244,124 271,108 298,115 325,104 344,100 344,185 28,185" fill="url(#lineGrad2)" stroke="none"/>
      <circle cx="344" cy="100" r="3.5" fill="#06b6d4"/>
      <rect x="366" y="82" width="158" height="112" rx="5" fill="#0e0e0e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <text x="378" y="100" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)" letterSpacing="1">EVENT LOG</text>
      <circle cx="379" cy="116" r="2.5" fill="#10b981"/><text x="386" y="119" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.55)">200 GET /api/links</text>
      <circle cx="379" cy="130" r="2.5" fill="#10b981"/><text x="386" y="133" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.55)">201 POST /api/new</text>
      <circle cx="379" cy="144" r="2.5" fill="#ff0033"/><text x="386" y="147" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.55)">503 DB timeout</text>
      <circle cx="379" cy="158" r="2.5" fill="#10b981"/><text x="386" y="161" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.55)">200 GET /health</text>
      <rect x="16" y="206" width="508" height="38" rx="5" fill="#0e0e0e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <circle cx="32" cy="225" r="4" fill="#10b981"/>
      <text x="42" y="229" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.5)">Sistema Operacional</text>
      <text x="172" y="229" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">CPU 18%</text>
      <text x="252" y="229" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">RAM 2.1GB</text>
      <text x="332" y="229" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">p99 102ms</text>
      <rect width="540" height="260" fill="url(#glowDash2)"/>
    </svg>
  );
}

function Cover3() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg3" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4"/></pattern>
        <radialGradient id="glowDS3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(16,185,129,0.10)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg3)"/>
      {/* Header */}
      <text x="20" y="28" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.28)" letterSpacing="1.5">COMPONENT LIBRARY v2.4.1</text>
      <rect x="20" y="34" width="500" height="0.5" fill="rgba(255,255,255,0.06)"/>
      {/* Buttons row */}
      <text x="20" y="54" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.25)" letterSpacing="1">BUTTONS</text>
      <rect x="20" y="60" width="80" height="26" rx="13" fill="#ededed"/>
      <text x="60" y="77" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#0a0a0a">PRIMARY</text>
      <rect x="110" y="60" width="72" height="26" rx="13" fill="none" stroke="rgba(237,237,237,0.25)" strokeWidth="1"/>
      <text x="146" y="77" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">GHOST</text>
      <rect x="192" y="60" width="68" height="26" rx="13" fill="rgba(255,0,51,0.85)"/>
      <text x="226" y="77" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#fff">DANGER</text>
      <rect x="270" y="60" width="60" height="26" rx="13" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <text x="300" y="77" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#06b6d4">INFO</text>
      {/* Inputs row */}
      <text x="20" y="108" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.25)" letterSpacing="1">INPUTS</text>
      <rect x="20" y="114" width="140" height="26" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <text x="32" y="131" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">Placeholder text</text>
      <rect x="170" y="114" width="140" height="26" rx="4" fill="rgba(6,182,212,0.05)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="182" y="131" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">user@email.com</text>
      <rect x="320" y="114" width="140" height="26" rx="4" fill="rgba(255,0,51,0.04)" stroke="rgba(255,0,51,0.5)" strokeWidth="1"/>
      <text x="332" y="131" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Campo inválido</text>
      <text x="332" y="145" fontFamily="monospace" fontSize="6" fill="rgba(255,0,51,0.7)">Campo obrigatório</text>
      {/* Cards row */}
      <text x="20" y="168" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.25)" letterSpacing="1">CARDS</text>
      <rect x="20" y="174" width="160" height="70" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      <rect x="20" y="174" width="160" height="3" rx="1" fill="#10b981"/>
      <text x="32" y="192" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">CARD TITLE</text>
      <text x="32" y="206" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.6)">Componente visual</text>
      <text x="32" y="218" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.6)">com múltiplos estados.</text>
      <rect x="130" y="230" width="40" height="8" rx="3" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.6"/>
      <text x="150" y="237" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#10b981">VER</text>
      {/* Color tokens */}
      <text x="200" y="168" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.25)" letterSpacing="1">TOKENS</text>
      <rect x="200" y="174" width="24" height="24" rx="4" fill="#ff0033"/>
      <text x="200" y="208" fontFamily="monospace" fontSize="5.5" fill="rgba(237,237,237,0.4)">red</text>
      <rect x="232" y="174" width="24" height="24" rx="4" fill="#06b6d4"/>
      <text x="232" y="208" fontFamily="monospace" fontSize="5.5" fill="rgba(237,237,237,0.4)">cyan</text>
      <rect x="264" y="174" width="24" height="24" rx="4" fill="#10b981"/>
      <text x="264" y="208" fontFamily="monospace" fontSize="5.5" fill="rgba(237,237,237,0.4)">emerald</text>
      <rect x="296" y="174" width="24" height="24" rx="4" fill="#ededed"/>
      <text x="296" y="208" fontFamily="monospace" fontSize="5.5" fill="rgba(237,237,237,0.4)">light</text>
      {/* Type scale */}
      <text x="340" y="168" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.25)" letterSpacing="1">TYPE SCALE</text>
      <text x="340" y="196" fontFamily="sans-serif" fontSize="28" fontWeight="900" fill="rgba(237,237,237,0.7)">Aa</text>
      <text x="380" y="192" fontFamily="sans-serif" fontSize="20" fontWeight="700" fill="rgba(237,237,237,0.5)">Aa</text>
      <text x="412" y="190" fontFamily="sans-serif" fontSize="14" fontWeight="500" fill="rgba(237,237,237,0.4)">Aa</text>
      <text x="436" y="190" fontFamily="sans-serif" fontSize="10" fill="rgba(237,237,237,0.3)">Aa</text>
      <rect width="540" height="260" fill="url(#glowDS3)"/>
    </svg>
  );
}

function Cover4() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg4" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"/></pattern>
        <radialGradient id="glowIoT4" cx="35%" cy="50%" r="40%"><stop offset="0%" stopColor="rgba(6,182,212,0.12)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg4)"/>
      {/* Node map panel */}
      <rect x="16" y="16" width="250" height="194" rx="5" fill="#0e0e0e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <text x="28" y="34" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)" letterSpacing="1">NODE MAP</text>
      {/* Connections - dashed lines between nodes */}
      <line x1="100" y1="90" x2="155" y2="120" stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <line x1="155" y1="120" x2="210" y2="90" stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <line x1="100" y1="90" x2="60" y2="140" stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <line x1="155" y1="120" x2="200" y2="155" stroke="rgba(255,0,51,0.3)" strokeWidth="0.8" strokeDasharray="3,2"/>
      {/* NODE_01 */}
      <circle cx="100" cy="90" r="16" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="100" y="87" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#06b6d4">NODE</text>
      <text x="100" y="96" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#06b6d4">_01</text>
      {/* NODE_02 */}
      <circle cx="210" cy="90" r="16" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="210" y="87" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#06b6d4">NODE</text>
      <text x="210" y="96" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#06b6d4">_02</text>
      {/* GATEWAY */}
      <circle cx="155" cy="120" r="20" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.2"/>
      <text x="155" y="117" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#10b981">GATE</text>
      <text x="155" y="126" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#10b981">WAY</text>
      {/* NODE_04 */}
      <circle cx="60" cy="140" r="14" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="60" y="137" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#06b6d4">NODE</text>
      <text x="60" y="146" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#06b6d4">_04</text>
      {/* NODE_05 - red alert */}
      <circle cx="200" cy="155" r="14" fill="rgba(255,0,51,0.12)" stroke="#ff0033" strokeWidth="1"/>
      <text x="200" y="152" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#ff0033">NODE</text>
      <text x="200" y="161" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#ff0033">_05</text>
      {/* Alert badge */}
      <circle cx="212" cy="143" r="5" fill="#ff0033"/>
      <text x="212" y="146" textAnchor="middle" fontFamily="monospace" fontSize="6" fontWeight="900" fill="#fff">!</text>
      {/* Signal chart panel */}
      <rect x="276" y="16" width="248" height="194" rx="5" fill="#0e0e0e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <text x="288" y="34" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)" letterSpacing="1">TELEMETRY READINGS</text>
      {/* Status readings */}
      <text x="288" y="58" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Temp</text><text x="380" y="58" fontFamily="monospace" fontSize="7" fill="#10b981">23.4°C</text>
      <rect x="288" y="62" width="200" height="2" rx="1" fill="rgba(255,255,255,0.05)"/><rect x="288" y="62" width="120" height="2" rx="1" fill="#10b981" opacity="0.6"/>
      <text x="288" y="82" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Hum</text><text x="380" y="82" fontFamily="monospace" fontSize="7" fill="#06b6d4">68%</text>
      <rect x="288" y="86" width="200" height="2" rx="1" fill="rgba(255,255,255,0.05)"/><rect x="288" y="86" width="136" height="2" rx="1" fill="#06b6d4" opacity="0.6"/>
      <text x="288" y="106" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Pressure</text><text x="380" y="106" fontFamily="monospace" fontSize="7" fill="#ff0033">⚠ HIGH</text>
      <rect x="288" y="110" width="200" height="2" rx="1" fill="rgba(255,255,255,0.05)"/><rect x="288" y="110" width="190" height="2" rx="1" fill="#ff0033" opacity="0.7"/>
      <text x="288" y="130" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">RSSI</text><text x="380" y="130" fontFamily="monospace" fontSize="7" fill="#ededed">-62 dBm</text>
      <rect x="288" y="134" width="200" height="2" rx="1" fill="rgba(255,255,255,0.05)"/><rect x="288" y="134" width="80" height="2" rx="1" fill="rgba(237,237,237,0.4)"/>
      <text x="288" y="154" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">Bat</text><text x="380" y="154" fontFamily="monospace" fontSize="7" fill="#10b981">87%</text>
      <rect x="288" y="158" width="200" height="2" rx="1" fill="rgba(255,255,255,0.05)"/><rect x="288" y="158" width="174" height="2" rx="1" fill="#10b981" opacity="0.6"/>
      {/* Signal sparkline */}
      <text x="288" y="176" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.2)" letterSpacing="1">SIGNAL / 30s</text>
      <polyline points="288,192 306,188 324,182 342,190 360,178 378,172 396,180 414,168 432,174 450,162 468,170 486,158 504,164" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Status bar */}
      <rect x="16" y="220" width="508" height="28" rx="4" fill="#0e0e0e" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
      <circle cx="32" cy="234" r="3" fill="#ff0033"/>
      <text x="42" y="238" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.4)">NODE_05 ALERT: Pressure threshold exceeded</text>
      <text x="420" y="238" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)">5 nodes online</text>
      <rect width="540" height="260" fill="url(#glowIoT4)"/>
    </svg>
  );
}

function Cover5() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg5" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"/></pattern>
        <radialGradient id="glowAuto5" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="rgba(6,182,212,0.10)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg5)"/>
      {/* Pipeline label */}
      <text x="20" y="28" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.25)" letterSpacing="1.5">PIPELINE · EVENT-DRIVEN</text>
      <rect x="20" y="34" width="500" height="0.5" fill="rgba(255,255,255,0.06)"/>
      {/* Main pipeline nodes */}
      {/* TRIGGER */}
      <rect x="20" y="70" width="72" height="36" rx="6" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1"/>
      <text x="56" y="86" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#10b981">TRIGGER</text>
      <text x="56" y="98" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="rgba(16,185,129,0.6)">webhook</text>
      {/* Arrow TRIGGER → FILTER */}
      <line x1="92" y1="88" x2="124" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <line x1="120" y1="84" x2="124" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <line x1="120" y1="92" x2="124" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      {/* FILTER */}
      <rect x="124" y="70" width="72" height="36" rx="6" fill="rgba(6,182,212,0.10)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="160" y="86" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#06b6d4">FILTER</text>
      <text x="160" y="98" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="rgba(6,182,212,0.6)">rules</text>
      {/* Arrow FILTER → TRANSFORM */}
      <line x1="196" y1="88" x2="228" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <line x1="224" y1="84" x2="228" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <line x1="224" y1="92" x2="228" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      {/* TRANSFORM */}
      <rect x="228" y="70" width="80" height="36" rx="6" fill="rgba(6,182,212,0.10)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="268" y="86" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#06b6d4">TRANSFORM</text>
      <text x="268" y="98" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="rgba(6,182,212,0.6)">map/reduce</text>
      {/* Arrow TRANSFORM → ACTION */}
      <line x1="308" y1="88" x2="340" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <line x1="336" y1="84" x2="340" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      <line x1="336" y1="92" x2="340" y2="88" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      {/* ACTION */}
      <rect x="340" y="70" width="72" height="36" rx="6" fill="rgba(6,182,212,0.10)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="376" y="86" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#06b6d4">ACTION</text>
      <text x="376" y="98" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="rgba(6,182,212,0.6)">emit</text>
      {/* Arrow ACTION → OUT */}
      <line x1="412" y1="88" x2="444" y2="88" stroke="rgba(16,185,129,0.4)" strokeWidth="1"/>
      <line x1="440" y1="84" x2="444" y2="88" stroke="rgba(16,185,129,0.4)" strokeWidth="1"/>
      <line x1="440" y1="92" x2="444" y2="88" stroke="rgba(16,185,129,0.4)" strokeWidth="1"/>
      {/* OUT */}
      <rect x="444" y="70" width="68" height="36" rx="6" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1"/>
      <text x="478" y="86" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#10b981">OUT</text>
      <text x="478" y="98" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="rgba(16,185,129,0.6)">success</text>
      {/* RETRY/FAIL branch below FILTER */}
      <line x1="160" y1="106" x2="160" y2="128" stroke="rgba(255,0,51,0.35)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <rect x="120" y="128" width="80" height="30" rx="5" fill="rgba(255,0,51,0.08)" stroke="rgba(255,0,51,0.4)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <text x="160" y="143" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(255,0,51,0.8)">RETRY / FAIL</text>
      <text x="160" y="153" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="rgba(255,0,51,0.5)">max 3 retries</text>
      {/* LOG/AUDIT below TRIGGER */}
      <line x1="56" y1="106" x2="56" y2="128" stroke="rgba(237,237,237,0.15)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <rect x="20" y="128" width="72" height="30" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <text x="56" y="143" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.4)">LOG</text>
      <text x="56" y="153" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="rgba(237,237,237,0.25)">audit trail</text>
      {/* Status bar */}
      <rect x="16" y="210" width="508" height="34" rx="5" fill="#0e0e0e" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
      <circle cx="32" cy="227" r="4" fill="#10b981"/>
      <text x="44" y="231" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.5)">Pipeline ativo</text>
      <rect x="130" y="218" width="0.5" height="18" fill="rgba(255,255,255,0.08)"/>
      <text x="140" y="231" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">Exec 1.842ms</text>
      <rect x="250" y="218" width="0.5" height="18" fill="rgba(255,255,255,0.08)"/>
      <text x="260" y="231" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">Events/s: 248</text>
      <rect width="540" height="260" fill="url(#glowAuto5)"/>
    </svg>
  );
}

function Cover6() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg6" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"/></pattern>
        <radialGradient id="glowStack6" cx="80%" cy="80%" r="45%"><stop offset="0%" stopColor="rgba(255,0,51,0.12)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg6)"/>
      {/* Step indicator */}
      <circle cx="32" cy="28" r="10" fill="#ff0033"/>
      <text x="32" y="32" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#fff">1</text>
      <line x1="42" y1="28" x2="60" y2="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      <circle cx="70" cy="28" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
      <text x="70" y="32" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(237,237,237,0.3)">2</text>
      <line x1="80" y1="28" x2="98" y2="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      <circle cx="108" cy="28" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
      <text x="108" y="32" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(237,237,237,0.3)">3</text>
      <text x="140" y="32" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.25)">Selecione o objetivo do projeto</text>
      {/* Options grid */}
      <rect x="16" y="50" width="148" height="76" rx="6" fill="rgba(255,0,51,0.06)" stroke="#ff0033" strokeWidth="1"/>
      <text x="28" y="70" fontFamily="monospace" fontSize="7" fill="#ff0033">MVP Rápido</text>
      <text x="28" y="84" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.4)">Validar ideia em</text>
      <text x="28" y="94" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.4)">2-4 semanas</text>
      <rect x="24" y="106" width="52" height="12" rx="3" fill="rgba(255,0,51,0.15)"/>
      <text x="50" y="116" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#ff0033">SELECIONADO</text>
      <rect x="174" y="50" width="148" height="76" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      <text x="186" y="70" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">SaaS Produto</text>
      <text x="186" y="84" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.35)">Plataforma escalável</text>
      <text x="186" y="94" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.35)">com billing</text>
      <rect x="16" y="136" width="148" height="76" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      <text x="28" y="156" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">Dashboard</text>
      <text x="28" y="170" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.35)">Visualização de</text>
      <text x="28" y="180" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.35)">dados complexos</text>
      <rect x="174" y="136" width="148" height="76" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      <text x="186" y="156" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.6)">Enterprise</text>
      <text x="186" y="170" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.35)">Solução corporativa</text>
      <text x="186" y="180" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.35)">sob medida</text>
      {/* Summary panel */}
      <rect x="336" y="50" width="188" height="162" rx="6" fill="#0e0e0e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
      <text x="350" y="70" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)" letterSpacing="1">STACK RECOMENDADA</text>
      <rect x="350" y="80" width="60" height="18" rx="9" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.6"/>
      <text x="380" y="93" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#06b6d4">NEXT.JS</text>
      <rect x="418" y="80" width="60" height="18" rx="9" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.6"/>
      <text x="448" y="93" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#06b6d4">SUPABASE</text>
      <rect x="350" y="106" width="56" height="18" rx="9" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.6"/>
      <text x="378" y="119" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#06b6d4">VERCEL</text>
      <rect x="414" y="106" width="56" height="18" rx="9" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.6"/>
      <text x="442" y="119" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#06b6d4">STRIPE</text>
      <rect x="350" y="140" width="160" height="0.5" fill="rgba(255,255,255,0.06)"/>
      <text x="350" y="158" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.3)">Prazo estimado: 3-4 semanas</text>
      <text x="350" y="172" fontFamily="monospace" fontSize="6" fill="rgba(237,237,237,0.3)">Orçamento: sob consulta</text>
      {/* GERAR PROPOSTA button */}
      <rect x="344" y="184" width="172" height="24" rx="5" fill="rgba(255,0,51,0.85)"/>
      <text x="430" y="200" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#fff">GERAR PROPOSTA</text>
      <rect width="540" height="260" fill="url(#glowStack6)"/>
    </svg>
  );
}

function Cover7() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg7" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"/></pattern>
        <radialGradient id="glowCode7" cx="80%" cy="20%" r="40%"><stop offset="0%" stopColor="rgba(16,185,129,0.12)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg7)"/>
      {/* Left panel - ANTES */}
      <rect x="16" y="16" width="226" height="220" rx="6" fill="#0e0e0e" stroke="rgba(255,0,51,0.25)" strokeWidth="0.8"/>
      <text x="28" y="36" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="1">ANTES</text>
      <rect x="16" y="42" width="226" height="0.5" fill="rgba(255,0,51,0.15)"/>
      {/* Red deletion lines */}
      <rect x="28" y="52" width="140" height="8" rx="1" fill="rgba(255,0,51,0.15)"/>
      <text x="32" y="59" fontFamily="monospace" fontSize="6.5" fill="rgba(255,0,51,0.7)">- function getData() {'{'}</text>
      <rect x="28" y="66" width="180" height="8" rx="1" fill="rgba(255,0,51,0.15)"/>
      <text x="32" y="73" fontFamily="monospace" fontSize="6.5" fill="rgba(255,0,51,0.7)">-   var result = [];</text>
      <rect x="28" y="80" width="200" height="8" rx="1" fill="rgba(255,0,51,0.15)"/>
      <text x="32" y="87" fontFamily="monospace" fontSize="6.5" fill="rgba(255,0,51,0.7)">-   for(var i=0; i&lt;arr.length; i++)</text>
      <rect x="28" y="94" width="170" height="8" rx="1" fill="rgba(255,0,51,0.15)"/>
      <text x="32" y="101" fontFamily="monospace" fontSize="6.5" fill="rgba(255,0,51,0.7)">-     result.push(arr[i].value)</text>
      <text x="32" y="116" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)">  // sem tratamento</text>
      <rect x="28" y="120" width="160" height="8" rx="1" fill="rgba(255,0,51,0.15)"/>
      <text x="32" y="127" fontFamily="monospace" fontSize="6.5" fill="rgba(255,0,51,0.7)">-   return result</text>
      <text x="32" y="142" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)">{'}'}</text>
      {/* Quality score */}
      <rect x="28" y="185" width="196" height="36" rx="4" fill="rgba(255,0,51,0.06)" stroke="rgba(255,0,51,0.2)" strokeWidth="0.6"/>
      <text x="36" y="201" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">QUALIDADE</text>
      <text x="36" y="216" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="900" fill="#ff0033">42</text>
      <text x="64" y="216" fontFamily="monospace" fontSize="10" fill="rgba(255,0,51,0.5)">/100</text>
      {/* Divider */}
      <rect x="248" y="16" width="40" height="220" rx="0" fill="transparent"/>
      <text x="268" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(237,237,237,0.2)" transform="rotate(-90 268 128)">DIFF</text>
      <rect x="267" y="16" width="0.5" height="220" fill="rgba(255,255,255,0.06)"/>
      {/* Right panel - DEPOIS */}
      <rect x="292" y="16" width="232" height="220" rx="6" fill="#0e0e0e" stroke="rgba(16,185,129,0.25)" strokeWidth="0.8"/>
      <text x="304" y="36" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.35)" letterSpacing="1">DEPOIS</text>
      <rect x="292" y="42" width="232" height="0.5" fill="rgba(16,185,129,0.15)"/>
      {/* Green addition lines */}
      <rect x="304" y="52" width="180" height="8" rx="1" fill="rgba(16,185,129,0.12)"/>
      <text x="308" y="59" fontFamily="monospace" fontSize="6.5" fill="rgba(16,185,129,0.8)">+ async function getData() {'{'}</text>
      <rect x="304" y="66" width="200" height="8" rx="1" fill="rgba(16,185,129,0.12)"/>
      <text x="308" y="73" fontFamily="monospace" fontSize="6.5" fill="rgba(16,185,129,0.8)">+   const result: string[] = [];</text>
      <rect x="304" y="80" width="210" height="8" rx="1" fill="rgba(16,185,129,0.12)"/>
      <text x="308" y="87" fontFamily="monospace" fontSize="6.5" fill="rgba(16,185,129,0.8)">+   for (const item of arr) {'{'}</text>
      <rect x="304" y="94" width="190" height="8" rx="1" fill="rgba(16,185,129,0.12)"/>
      <text x="308" y="101" fontFamily="monospace" fontSize="6.5" fill="rgba(16,185,129,0.8)">+     result.push(item.value);</text>
      <text x="308" y="116" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)">  {'}'}</text>
      <rect x="304" y="120" width="175" height="8" rx="1" fill="rgba(16,185,129,0.12)"/>
      <text x="308" y="127" fontFamily="monospace" fontSize="6.5" fill="rgba(16,185,129,0.8)">+   return result;</text>
      <text x="308" y="142" fontFamily="monospace" fontSize="6.5" fill="rgba(237,237,237,0.25)">{'}'}</text>
      {/* Quality score */}
      <rect x="304" y="185" width="204" height="36" rx="4" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.6"/>
      <text x="312" y="201" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.3)">QUALIDADE</text>
      <text x="312" y="216" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="900" fill="#10b981">91</text>
      <text x="340" y="216" fontFamily="monospace" fontSize="10" fill="rgba(16,185,129,0.5)">/100</text>
      <text x="374" y="216" fontFamily="monospace" fontSize="8" fill="rgba(16,185,129,0.7)">+49 pontos</text>
      <rect width="540" height="260" fill="url(#glowCode7)"/>
    </svg>
  );
}

function Cover8() {
  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
      <rect width="540" height="260" fill="#080808"/>
      <defs>
        <pattern id="pg8" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/></pattern>
        <radialGradient id="glowMzz8" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(6,182,212,0.10)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#pg8)"/>
      <text x="270" y="140" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="72" fontWeight="900" fill="rgba(6,182,212,0.08)" letterSpacing="-2">mzz.io</text>
      <text x="270" y="148" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="24" fontWeight="900" fill="rgba(6,182,212,0.55)" letterSpacing="0">mzz.io</text>
      <text x="270" y="172" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(237,237,237,0.25)" letterSpacing="4">ENCURTADOR · ANALYTICS · PAINEL</text>
      <rect x="200" y="188" width="140" height="1" fill="rgba(6,182,212,0.15)"/>
      <text x="270" y="208" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(237,237,237,0.2)">Produto SaaS · Node.js · PostgreSQL</text>
      <rect width="540" height="260" fill="url(#glowMzz8)"/>
    </svg>
  );
}

// ─── Projects data ────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'perf',
    category: 'performance',
    accent: 'red',
    catLabel: '[ PERFORMANCE ]',
    title: 'Performance Benchmark Simulator',
    desc: 'Análise e comparação de métricas web para identificar gargalos de velocidade e experiência.',
    tags: ['WEB VITALS', 'LIGHTHOUSE', 'NEXT.JS'],
    tipo: 'Ferramenta Web',
    ano: '2026',
    stack: 'Next.js / TS',
    href: '/cases',
    cover: <Cover1 />,
  },
  {
    id: 'monitor',
    category: 'dashboard',
    accent: 'cyan',
    catLabel: '[ DASHBOARD ]',
    title: 'Live Monitoring Dashboard',
    desc: 'Central de comando em tempo real com KPIs, gráficos animados e logs para operação digital.',
    tags: ['REAL TIME', 'DASHBOARD', 'CHARTS'],
    tipo: 'Sistema Interno',
    ano: '2026',
    stack: 'React / WS',
    href: '/cases',
    cover: <Cover2 />,
  },
  {
    id: 'ui',
    category: 'design-system',
    accent: 'emerald',
    catLabel: '[ DESIGN SYSTEM ]',
    title: 'UI Component Playground',
    desc: 'Ambiente interativo para testar componentes, variações de interface e padrões visuais.',
    tags: ['DESIGN SYSTEM', 'COMPONENTS', 'UI'],
    tipo: 'Biblioteca Visual',
    ano: '2025',
    stack: 'React / Storybook',
    href: '/cases',
    cover: <Cover3 />,
  },
  {
    id: 'iot',
    category: 'dashboard',
    accent: 'cyan',
    catLabel: '[ DASHBOARD ]',
    title: 'IoT Telemetry Dashboard',
    desc: 'Monitoramento de hardware e telemetria via MQTT, visualizando tópicos, status e diagnóstico.',
    tags: ['IOT', 'MQTT', 'TELEMETRIA'],
    tipo: 'Dados em Tempo Real',
    ano: '2025',
    stack: 'MQTT / React',
    href: '/cases',
    cover: <Cover4 />,
  },
  {
    id: 'auto',
    category: 'automacao',
    accent: 'red',
    catLabel: '[ AUTOMAÇÃO ]',
    title: 'Automation Flow Visualizer',
    desc: 'Diagrama interativo de pipeline event-driven, com visualização de eventos e gargalos em tempo real.',
    tags: ['FLOW', 'EVENTS', 'NODES'],
    tipo: 'Fluxo Operacional',
    ano: '2026',
    stack: 'Node.js / ReactFlow',
    href: '/cases',
    cover: <Cover5 />,
  },
  {
    id: 'stack-config',
    category: 'experimento',
    accent: 'red',
    catLabel: '[ CONSULTORIA ]',
    title: 'Stack Configurator',
    desc: 'Ferramenta para montar a stack ideal baseada em objetivo, orçamento e prazo do projeto.',
    tags: ['STACK', 'MVP', 'CONSULTORIA'],
    tipo: 'Ferramenta Estratégica',
    ano: '2026',
    stack: 'React / TS',
    href: '/cases',
    cover: <Cover6 />,
  },
  {
    id: 'code-diff',
    category: 'automacao',
    accent: 'emerald',
    catLabel: '[ AUTOMAÇÃO ]',
    title: 'Code Quality Diff Viewer',
    desc: 'Visualizador interativo de antes e depois de refatorações, com comparação de qualidade de código.',
    tags: ['CODE', 'TYPESCRIPT', 'REFACTOR'],
    tipo: 'Ferramenta Dev',
    ano: '2026',
    stack: 'TS / Next.js',
    href: '/cases',
    cover: <Cover7 />,
  },
  {
    id: 'mezzlink',
    category: 'saas',
    accent: 'cyan',
    catLabel: '[ PRODUTO DIGITAL ]',
    title: 'MezzLink — Encurtador de Links',
    desc: 'Produto SaaS funcional com encurtamento de URLs, analytics e painel administrativo.',
    tags: ['NODE', 'ANALYTICS', 'SAAS'],
    tipo: 'Produto Digital',
    ano: '2026',
    stack: 'Node / Analytics',
    href: '/cases',
    cover: <Cover8 />,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? 'font-mono text-[9.5px] tracking-[0.18em] uppercase px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap bg-electric-red border border-electric-red text-white shadow-[0_0_18px_rgba(255,0,51,.28)]'
          : 'font-mono text-[9.5px] tracking-[0.18em] uppercase px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap border border-foreground/20 text-foreground/50 hover:border-foreground/30 hover:text-foreground'
      }
    >
      {label}
    </button>
  );
}

function FeaturedCard() {
  const accent = ACCENTS.cyan;
  return (
    <Link href="/cases" className="block">
      <div className="border border-foreground/15 rounded-[20px] bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,0,51,.12)]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: info */}
          <div className="p-10 md:p-14 flex flex-col justify-center gap-6">
            <div>
              <p className={`font-mono text-[9px] tracking-[0.28em] uppercase mb-3 ${accent.cat}`}>
                [ PRODUTO DIGITAL ]
              </p>
              <p className="font-mono text-[clamp(5rem,12vw,8rem)] leading-none text-foreground/[0.04] font-black select-none mb-2">
                01
              </p>
              <h2 className="font-black text-[clamp(1.5rem,3.5vw,2.4rem)] tracking-tighter leading-[1.1] text-foreground uppercase mb-4">
                MezzLink —{' '}
                <span className="text-cyan">Encurtador</span>
                <br />de Links
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed max-w-[380px]">
                Produto SaaS funcional com encurtamento de URLs, analytics detalhado e painel administrativo completo. Dashboard em tempo real, plano PRO e API pública.
              </p>
            </div>
            {/* Meta */}
            <div className="flex gap-6 flex-wrap border-t border-foreground/10 pt-5">
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-foreground/30 mb-0.5">Tipo</p>
                <p className="font-mono text-[10px] text-foreground/70">Produto Digital</p>
              </div>
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-foreground/30 mb-0.5">Ano</p>
                <p className="font-mono text-[10px] text-foreground/70">2026</p>
              </div>
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-foreground/30 mb-0.5">Stack</p>
                <p className="font-mono text-[10px] text-foreground/70">Node / Analytics</p>
              </div>
            </div>
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {['NODE', 'ANALYTICS', 'SAAS'].map((tag) => (
                <span
                  key={tag}
                  className={`font-mono text-[8px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-full border ${accent.tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* CTA */}
            <div>
              <span className={`font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/40 transition-colors duration-200 ${accent.cta}`}>
                Ver projeto →
              </span>
            </div>
          </div>
          {/* Right: cover */}
          <div className="hidden md:block bg-surface-secondary min-h-[380px] relative overflow-hidden">
            <FeaturedCover />
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const accent = ACCENTS[project.accent];
  return (
    <Link href={project.href} className="block group">
      <div
        className={`border border-[var(--border)] rounded-[18px] bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 ${accent.hoverShadow} ${accent.hoverBorder} flex flex-col`}
      >
        {/* Top accent line */}
        <div className={`h-px ${accent.borderTop} opacity-60 group-hover:opacity-100 transition-opacity`} />
        {/* Cover */}
        <div className="h-[260px] overflow-hidden bg-surface-secondary relative">
          <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500">
            {project.cover}
          </div>
        </div>
        {/* Body */}
        <div className="p-7 flex flex-col flex-1 gap-4">
          <div>
            <p className={`font-mono text-[8.5px] tracking-[0.22em] uppercase mb-2 ${accent.cat}`}>
              {project.catLabel}
            </p>
            <h3 className="font-black text-[18px] tracking-tight leading-[1.2] text-foreground uppercase mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-foreground/55 leading-relaxed">
              {project.desc}
            </p>
          </div>
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-[7.5px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border ${accent.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Meta */}
          <div className="flex gap-5 flex-wrap border-t border-foreground/[0.07] pt-4 mt-auto">
            <div>
              <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-foreground/25 mb-0.5">Tipo</p>
              <p className="font-mono text-[9px] text-foreground/55">{project.tipo}</p>
            </div>
            <div>
              <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-foreground/25 mb-0.5">Ano</p>
              <p className="font-mono text-[9px] text-foreground/55">{project.ano}</p>
            </div>
            <div>
              <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-foreground/25 mb-0.5">Stack</p>
              <p className="font-mono text-[9px] text-foreground/55">{project.stack}</p>
            </div>
          </div>
          {/* CTA */}
          <div>
            <span
              className={`font-mono text-[9px] tracking-[0.18em] uppercase text-foreground/30 transition-colors duration-200 ${accent.cta}`}
            >
              Ver projeto →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 24 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProjetosSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const showFeatured = activeFilter === 'all' || activeFilter === 'saas';
  const gridProjects =
    activeFilter === 'all'
      ? PROJECTS.filter((p) => p.id !== 'mezzlink')
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden text-center px-6 pt-36 pb-24">
        {/* Grid background */}
        <div className="absolute inset-0 section-grid opacity-40 pointer-events-none" />
        {/* Red glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-electric-red/[0.07] blur-[120px] pointer-events-none" />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg-primary) 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
        {/* Ghost number */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[clamp(16rem,30vw,28rem)] leading-none text-foreground/[0.025] select-none pointer-events-none tracking-tighter">
          P
        </span>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-[760px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[9px] tracking-[0.35em] uppercase text-electric-red/80"
          >
            [ O QUE JÁ CONSTRUÍMOS ]
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-black text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-tighter text-foreground uppercase"
          >
            Projetos<span className="text-electric-red">.</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-px bg-electric-red/50 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="text-[clamp(1rem,2vw,1.2rem)] text-foreground/60 leading-relaxed max-w-[560px]"
          >
            Sites, sistemas, dashboards e experiências digitais criadas para performance, clareza e impacto real.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-sm text-foreground/35 leading-relaxed max-w-[480px]"
          >
            Cada projeto nasce de um problema específico — e termina como uma interface rápida, funcional e pronta para crescer.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full bg-electric-red text-white hover:bg-electric-red/90 transition-all duration-200 shadow-[0_0_24px_rgba(255,0,51,.25)]"
            >
              Ver projetos
            </button>
            <Link
              href="/#contact"
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full border border-foreground/20 text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-all duration-200"
            >
              Solicitar proposta
            </Link>
          </motion.div>

          {/* Markers row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex gap-6 flex-wrap justify-center mt-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-red" />
              <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-foreground/35">Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-foreground/35">Sistemas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-foreground/35">Produto</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS ───────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-0">
        <div className="container mx-auto max-w-[1120px] px-6">
          <Reveal>
            <div
              className="flex gap-2 flex-wrap overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none' }}
            >
              {FILTERS.map((f) => (
                <FilterPill
                  key={f.key}
                  label={f.label}
                  active={activeFilter === f.key}
                  onClick={() => setActiveFilter(f.key)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED CARD ─────────────────────────────────────────────────── */}
      {showFeatured && (
        <section className="pt-10 pb-0">
          <div className="container mx-auto max-w-[1120px] px-6">
            <Reveal>
              <FeaturedCard />
            </Reveal>
          </div>
        </section>
      )}

      {/* ── PROJECTS GRID ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-14 pb-20">
        <div className="container mx-auto max-w-[1120px] px-6">
          <Reveal className="mb-12">
            <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-3">
              [ TODOS OS PROJETOS ]
            </p>
            <h2 className="font-black text-[clamp(2rem,4vw,3.2rem)] tracking-tighter uppercase text-foreground">
              Construções Digitais
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gridProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
            {gridProjects.length === 0 && (
              <div className="col-span-2 py-20 text-center">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/25">
                  Nenhum projeto nessa categoria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section id="cta-section" className="py-24 pb-0">
        <div className="container mx-auto max-w-[1120px] px-6">
          <Reveal>
            <div className="relative border border-foreground/15 rounded-[20px] bg-card p-12 md:p-20 overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
              {/* Red glow bottom-right */}
              <div className="absolute bottom-0 right-0 w-[480px] h-[320px] bg-electric-red/[0.06] blur-[100px] rounded-full pointer-events-none" />

              {/* Left */}
              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-4">
                    [ PRÓXIMO PASSO ]
                  </p>
                  <h2 className="font-black text-[clamp(1.8rem,4vw,3rem)] tracking-tighter leading-[1.1] text-foreground uppercase mb-4">
                    Não encontrou o que
                    <br />
                    <span className="text-electric-red">procurava?</span>
                  </h2>
                  <p className="text-foreground/55 leading-relaxed max-w-[440px]">
                    Cada projeto que construímos começa com uma conversa. Conte seu desafio — montamos uma proposta personalizada em menos de 48 horas.
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/#contact"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full bg-electric-red text-white hover:bg-electric-red/90 transition-all duration-200 shadow-[0_0_24px_rgba(255,0,51,.20)]"
                  >
                    Solicitar proposta
                  </Link>
                  <Link
                    href="/cases"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full border border-foreground/20 text-foreground/60 hover:border-foreground/35 hover:text-foreground transition-all duration-200"
                  >
                    Ver cases →
                  </Link>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="relative z-10 flex flex-col gap-6 md:min-w-[200px]">
                <div className="text-center md:text-right">
                  <p className="font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-tighter text-foreground">
                    8<span className="text-electric-red">+</span>
                  </p>
                  <p className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-foreground/35 mt-1">
                    Projetos Digitais
                  </p>
                </div>
                <div className="hidden md:block h-px w-full bg-foreground/10" />
                <div className="text-center md:text-right">
                  <p className="font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-tighter text-foreground">
                    100<span className="text-cyan">%</span>
                  </p>
                  <p className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-foreground/35 mt-1">
                    Foco em Performance
                  </p>
                </div>
                <div className="hidden md:block h-px w-full bg-foreground/10" />
                <div className="text-center md:text-right">
                  <p className="font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-tighter text-foreground">
                    <span className="text-emerald">&lt;</span>48h
                  </p>
                  <p className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-foreground/35 mt-1">
                    Primeiro Diagnóstico
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
