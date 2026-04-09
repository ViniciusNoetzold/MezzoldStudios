'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface CodeLine { text: string; hl?: 'bad' | 'good'; }
interface Metric   { label: string; before: string; after: string; }

interface Scenario {
  id: string; tab: string; lang: string; file: string;
  before: CodeLine[]; after: CodeLine[];
  metrics: Metric[];
  badge: string;
  explanation: string;
}

// ── Scenario data ─────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 'n1', tab: 'N+1 Query', lang: 'PYTHON', file: 'dashboard.py',
    before: [
      { text: '# [BUG] N+1: executa 1 + N queries no banco' },
      { text: 'def get_dashboard(db):' },
      { text: '    users = db.query(User).all()        # query 1' },
      { text: '    result = []', hl: 'bad' },
      { text: '    for user in users:                  # N iterações', hl: 'bad' },
      { text: '        orders = db.query(Order)\\', hl: 'bad' },
      { text: '            .filter_by(user_id=user.id)\\', hl: 'bad' },
      { text: '            .all()  # 1 query EXTRA por usuário!', hl: 'bad' },
      { text: '        result.append({' },
      { text: '            "name": user.name,' },
      { text: '            "total": len(orders),' },
      { text: '        })' },
      { text: '    return result' },
    ],
    after: [
      { text: '# [FIX] JOIN único — zero queries extras' },
      { text: 'def get_dashboard(db):' },
      { text: '    users = db.query(User)\\', hl: 'good' },
      { text: '        .options(joinedload(User.orders))\\', hl: 'good' },
      { text: '        .all()  # única query com eager load', hl: 'good' },
      { text: '    return [{' },
      { text: '        "name":  u.name,' },
      { text: '        "total": len(u.orders), # sem queries extras', hl: 'good' },
      { text: '    } for u in users]' },
    ],
    metrics: [
      { label: 'Queries',    before: '1 + N (47)',       after: '1 (JOIN)' },
      { label: 'Tempo',      before: '~2.400ms',         after: '~12ms'   },
      { label: 'Memória',    before: '340 MB',           after: '28 MB'   },
    ],
    badge: '−99.5% latência',
    explanation: 'O problema N+1 ocorre quando um ORM executa uma query adicional para cada item de uma lista. Com `joinedload()`, o SQLAlchemy gera um único `SELECT ... JOIN` buscando tudo de uma vez. Resultado: de 47 queries para 1, reduzindo latência em 99.5% e eliminando gargalo no pool de conexões.',
  },
  {
    id: 'cb', tab: 'Callback Hell', lang: 'JAVASCRIPT', file: 'auth.js',
    before: [
      { text: '// [BUG] Callback pyramid — impossível de manter' },
      { text: 'function loadProfile(userId, cb) {', hl: 'bad' },
      { text: '  getUser(userId, (err, user) => {', hl: 'bad' },
      { text: '    if (err) return cb(err);', hl: 'bad' },
      { text: '    getRole(user.roleId, (err, role) => {', hl: 'bad' },
      { text: '      if (err) return cb(err);', hl: 'bad' },
      { text: '        getPerms(role.id, (err, perms) => {', hl: 'bad' },
      { text: '          if (err) return cb(err);', hl: 'bad' },
      { text: '          cb(null, { user, role, perms });' },
      { text: '        });' },
      { text: '      });' },
      { text: '    });' },
      { text: '}' },
    ],
    after: [
      { text: '// [FIX] Async/await — linear e legível' },
      { text: 'async function loadProfile(userId) {', hl: 'good' },
      { text: '  const user  = await getUser(userId);', hl: 'good' },
      { text: '  const role  = await getRole(user.roleId);', hl: 'good' },
      { text: '  const perms = await getPerms(role.id);', hl: 'good' },
      { text: '  return { user, role, perms };', hl: 'good' },
      { text: '}' },
    ],
    metrics: [
      { label: 'Aninhamento', before: '4 níveis',     after: '0 (linear)' },
      { label: 'Error handling', before: 'Manual ×3', after: 'try/catch'  },
      { label: 'Linhas',      before: '13 linhas',    after: '7 linhas'   },
    ],
    badge: '−46% código, DX +500%',
    explanation: 'Callbacks aninhados criam o "Pyramid of Doom": cada nível de indentação adiciona complexidade cognitiva e superfície de falha. Com async/await, o fluxo se torna linear como código síncrono. Um único `try/catch` substitui todos os `if (err)` manuais. Manutenção e debugging ficam drásticamente mais simples.',
  },
  {
    id: 'cache', tab: 'Cache Strategy', lang: 'NODE.JS', file: 'products.ts',
    before: [
      { text: '// [BUG] Zero cache — DB hit em toda request' },
      { text: 'app.get("/api/products", async (req, res) => {', hl: 'bad' },
      { text: '  // bate no banco sempre, sem exceção', hl: 'bad' },
      { text: '  const rows = await db', hl: 'bad' },
      { text: '    .query("SELECT * FROM products")', hl: 'bad' },
      { text: '    .execute();  // 500ms avg', hl: 'bad' },
      { text: '  res.json(rows);' },
      { text: '});' },
      { text: '// 1.200 req/min = 1.200 queries/min no DB' },
    ],
    after: [
      { text: '// [FIX] Redis cache com TTL de 5 minutos' },
      { text: 'app.get("/api/products", async (req, res) => {', hl: 'good' },
      { text: '  const cached = await redis.get("products");', hl: 'good' },
      { text: '  if (cached) return res.json(JSON.parse(cached));', hl: 'good' },
      { text: '  const rows = await db' },
      { text: '    .query("SELECT * FROM products").execute();' },
      { text: '  await redis.set("products",', hl: 'good' },
      { text: '    JSON.stringify(rows), "EX", 300);', hl: 'good' },
      { text: '  res.json(rows);' },
      { text: '});' },
    ],
    metrics: [
      { label: 'Resposta',     before: '~480ms',         after: '~8ms'     },
      { label: 'Queries/min',  before: '1.200',          after: '~24'      },
      { label: 'Custo DB',     before: 'R$ 180/mês',     after: 'R$ 12/mês' },
    ],
    badge: '−98% tempo, −98% custo',
    explanation: 'Sem cache, cada requisição bate direto no banco — custoso e lento. A estratégia redis.get → cache hit → redis.set elimina 98% das queries com um TTL de 5 minutos. Para dados que mudam raramente (produtos, configs), o cache-aside pattern é a solução padrão de sistemas de alta performance.',
  },
  {
    id: 'on2', tab: 'O(n²) → O(n)', lang: 'JAVASCRIPT', file: 'utils.js',
    before: [
      { text: '// [BUG] O(n²) — loop duplo aninhado' },
      { text: 'function findDuplicates(arr) {' },
      { text: '  const dupes = [];', hl: 'bad' },
      { text: '  for (let i = 0; i < arr.length; i++) {', hl: 'bad' },
      { text: '    for (let j = i+1; j < arr.length; j++) {', hl: 'bad' },
      { text: '      if (arr[i] === arr[j]) {', hl: 'bad' },
      { text: '        dupes.push(arr[i]); // duplicado!', hl: 'bad' },
      { text: '      }' },
      { text: '    }' },
      { text: '  }' },
      { text: '  return dupes;' },
      { text: '}' },
      { text: '// 10k itens = 50.000.000 comparações 💀' },
    ],
    after: [
      { text: '// [FIX] O(n) — Set com lookup O(1)' },
      { text: 'function findDuplicates(arr) {' },
      { text: '  const seen  = new Set();', hl: 'good' },
      { text: '  const dupes = new Set();', hl: 'good' },
      { text: '  for (const item of arr) {', hl: 'good' },
      { text: '    seen.has(item)', hl: 'good' },
      { text: '      ? dupes.add(item)', hl: 'good' },
      { text: '      : seen.add(item);', hl: 'good' },
      { text: '  }' },
      { text: '  return [...dupes];' },
      { text: '}' },
      { text: '// 10k itens = 10.000 operações ✓' },
    ],
    metrics: [
      { label: 'Complexidade', before: 'O(n²)',    after: 'O(n)'    },
      { label: '10k itens',    before: '~3.200ms', after: '~4ms'    },
      { label: 'Memória',      before: '450 MB',   after: '28 MB'   },
    ],
    badge: '−99.9% tempo execução',
    explanation: 'O loop duplo compara cada elemento com todos os outros: n×(n-1)/2 comparações. Com 10k itens, são 50 milhões de operações. Usando um Set (hash table), cada inserção e lookup é O(1) amortizado. O algoritmo passa a processar cada elemento apenas uma vez: n operações totais. Uma reescrita de 3 linhas, ganho exponencial.',
  },
];

// ── Syntax Highlighter ────────────────────────────────────────────────────────

const KW = /^(const|let|var|function|async|await|return|if|else|for|while|class|import|from|export|default|def|self|None|True|False|try|catch|new|of|in|await)\b/;

function highlight(line: string): React.ReactNode {
  const trimmed = line.trimStart();
  const isComment = trimmed.startsWith('//') || trimmed.startsWith('#');
  if (isComment) return <span style={{ color: 'rgba(255,255,255,0.28)' }}>{line}</span>;

  const tokens: Array<{ t: string; c: string }> = [];
  let i = 0;
  while (i < line.length) {
    const rest = line.slice(i);
    // markers
    const mark = rest.match(/^\[(BUG|FIX)\]/);
    if (mark) { tokens.push({ t: mark[0], c: mark[1] === 'BUG' ? '#f87171' : '#4ade80' }); i += mark[0].length; continue; }
    // strings
    if (rest[0] === '"' || rest[0] === "'") {
      const q = rest[0], end = rest.indexOf(q, 1);
      const str = end > 0 ? rest.slice(0, end + 1) : rest[0];
      tokens.push({ t: str, c: '#4ade80' }); i += str.length; continue;
    }
    // inline comment
    if (rest.startsWith('//') || rest.startsWith('#')) {
      tokens.push({ t: rest, c: 'rgba(255,255,255,0.28)' }); break;
    }
    // keywords
    const kw = rest.match(KW);
    if (kw) { tokens.push({ t: kw[0], c: '#60a5fa' }); i += kw[0].length; continue; }
    // numbers
    const num = rest.match(/^\d+/);
    if (num) { tokens.push({ t: num[0], c: '#fb923c' }); i += num[0].length; continue; }
    // default char
    tokens.push({ t: rest[0], c: 'rgba(255,255,255,0.72)' }); i++;
  }
  return <>{tokens.map((tk, j) => <span key={j} style={{ color: tk.c }}>{tk.t}</span>)}</>;
}

// ── CodePanel ─────────────────────────────────────────────────────────────────

function CodePanel({ lines, side, revealKey }: {
  lines: CodeLine[]; side: 'before' | 'after'; revealKey: string;
}) {
  const isBefore = side === 'before';
  const accentColor = isBefore ? '#f87171' : '#4ade80';
  const labelText   = isBefore ? '[ ANTES ]' : '[ DEPOIS ]';

  return (
    <div
      className="flex-1 flex flex-col rounded-xl overflow-hidden border min-w-0"
      style={{
        borderColor: accentColor + '30',
        background: isBefore ? 'rgba(239,68,68,0.025)' : 'rgba(74,222,128,0.025)',
      }}
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: accentColor + '20', background: accentColor + '08' }}>
        <span className="font-mono font-bold text-[8px] tracking-[0.38em]" style={{ color: accentColor }}>{labelText}</span>
        <div className="w-px h-3 bg-white/10" />
        <span className="font-mono text-[7px] tracking-[0.15em] text-white/25">user.py</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor + '80' }} />
        </div>
      </div>

      {/* Code lines */}
      <div className="flex-1 overflow-x-auto p-2">
        <div className="min-w-max">
          {lines.map((line, i) => {
            const isHl = line.hl === (isBefore ? 'bad' : 'good');
            return (
              <motion.div
                key={`${revealKey}-${i}`}
                initial={{ opacity: 0, y: isBefore ? 0 : 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isBefore ? i * 0.018 : 0.4 + i * 0.055,
                  duration: 0.2,
                }}
                className="flex items-start group"
                style={{
                  background: isHl
                    ? (isBefore ? 'rgba(239,68,68,0.1)' : 'rgba(74,222,128,0.09)')
                    : 'transparent',
                  borderLeft: isHl ? `2px solid ${accentColor}55` : '2px solid transparent',
                }}
              >
                {/* Line number */}
                <span className="select-none font-mono text-[9px] text-white/15 w-7 shrink-0 text-right pr-2 pt-[1px]">
                  {i + 1}
                </span>
                {/* Code */}
                <pre className="font-mono text-[10px] md:text-[11px] leading-[1.75] whitespace-pre">
                  {highlight(line.text)}
                </pre>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Metrics bar ───────────────────────────────────────────────────────────────

function MetricRow({ metric, revealKey }: { metric: Metric; revealKey: string }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1 border-b border-white/[0.04] last:border-0">
      <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/25 w-28 shrink-0">{metric.label}</span>
      <div className="flex items-center gap-2 flex-1 justify-between">
        <motion.span key={`before-${revealKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] text-red-400/75 font-bold">
          {metric.before}
        </motion.span>
        <ArrowRight size={9} className="text-white/15 shrink-0" />
        <motion.span key={`after-${revealKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-mono text-[10px] text-emerald/75 font-bold">
          {metric.after}
        </motion.span>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function CodeQualityDiffViewer() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [mobileTab, setMobileTab]   = useState<'before' | 'after'>('before');
  const [expanded, setExpanded]     = useState(false);
  const [revealKey, setRevealKey]   = useState('0');

  const sc = SCENARIOS[activeIdx];

  function selectScenario(i: number) {
    if (i === activeIdx) return;
    setActiveIdx(i);
    setRevealKey(String(i));
    setExpanded(false);
    setMobileTab('before');
  }

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-white/[0.07]" style={{ background: '#040608', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>

      {/* ── Tab bar ── */}
      <div className="flex items-center gap-0 border-b border-white/[0.07] overflow-x-auto" style={{ background: 'rgba(0,0,0,0.4)' }}>
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => selectScenario(i)}
            className={[
              'flex items-center gap-1.5 px-4 py-2.5 font-mono text-[8px] tracking-[0.18em] uppercase whitespace-nowrap border-b-2 transition-all duration-150',
              i === activeIdx
                ? 'border-blue-400 text-blue-400 bg-blue-400/[0.06]'
                : 'border-transparent text-white/28 hover:text-white/52 hover:bg-white/[0.025]',
            ].join(' ')}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === activeIdx ? 'bg-blue-400' : 'bg-white/15'}`} />
            {s.tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 px-3 shrink-0">
          <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-white/18">{sc.lang}</span>
          <span className="font-mono text-[7px] text-white/15">{sc.file}</span>
        </div>
      </div>

      {/* ── Mobile tabs ── */}
      <div className="md:hidden flex border-b border-white/[0.06]">
        {(['before', 'after'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={[
              'flex-1 py-2 font-mono text-[8px] tracking-[0.3em] uppercase transition-all duration-150',
              mobileTab === tab
                ? tab === 'before' ? 'bg-red-500/[0.08] text-red-400' : 'bg-emerald/[0.08] text-emerald'
                : 'text-white/25',
            ].join(' ')}
          >
            {tab === 'before' ? '[ ANTES ]' : '[ DEPOIS ]'}
          </button>
        ))}
      </div>

      {/* ── Split panels ── */}
      <div className="p-3 md:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={revealKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col md:flex-row gap-3"
          >
            {/* Before */}
            <div className={`${mobileTab === 'before' ? 'flex' : 'hidden'} md:flex flex-1 min-w-0`}>
              <div className="w-full">
                <CodePanel lines={sc.before} side="before" revealKey={revealKey} />
              </div>
            </div>

            {/* Center badge */}
            <div className="hidden md:flex flex-col items-center justify-center gap-2 shrink-0 px-1">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  key={revealKey}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 20 }}
                  className="font-mono font-bold text-[7px] tracking-[0.2em] uppercase px-2.5 py-1.5 rounded-lg border text-center"
                  style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.3)', boxShadow: '0 0 16px rgba(74,222,128,0.15)', minWidth: 72 }}
                >
                  {sc.badge}
                </motion.div>
                <ArrowRight size={12} className="text-blue-400/40" />
              </div>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
            </div>

            {/* After */}
            <div className={`${mobileTab === 'after' ? 'flex' : 'hidden'} md:flex flex-1 min-w-0`}>
              <div className="w-full">
                <CodePanel lines={sc.after} side="after" revealKey={revealKey} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile badge */}
        <motion.div
          key={`badge-mobile-${revealKey}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="md:hidden mt-3 flex justify-center"
        >
          <span
            className="font-mono font-bold text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-lg border"
            style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.3)' }}
          >
            {sc.badge}
          </span>
        </motion.div>

        {/* ── Metrics ── */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/[0.02] border border-white/[0.05] rounded-lg p-3">
          {sc.metrics.map(m => (
            <MetricRow key={m.label} metric={m} revealKey={revealKey} />
          ))}
        </div>

        {/* ── Explanation accordion ── */}
        <div className="mt-3 border border-white/[0.06] rounded-lg overflow-hidden">
          <button
            onClick={() => setExpanded(e => !e)}
            className="w-full flex items-center justify-between px-4 py-3 font-mono text-[8px] tracking-[0.3em] uppercase text-white/35 hover:text-white/60 hover:bg-white/[0.02] transition-all duration-150"
          >
            <span>[ VER EXPLICAÇÃO TÉCNICA ]</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={11} />
            </motion.div>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-white/[0.05]">
                  <p className="font-mono text-[10px] leading-[1.85] text-white/45 mt-3 border-l-2 border-blue-400/30 pl-3">
                    {sc.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
