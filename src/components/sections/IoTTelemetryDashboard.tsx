'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Metrics {
  cpuTemp:  number;
  wifiDbm:  number;
  ramPct:   number;
  sensorHz: number;
}

interface MqttEntry {
  id:      number;
  ts:      string;
  topic:   string;
  payload: string;
  kind:    'normal' | 'warn' | 'alert';
}

interface UptimeState {
  total: number; // seconds
}

type ConnState = 'connected' | 'dropping' | 'offline' | 'reconnecting';

// ── Helpers ───────────────────────────────────────────────────────────────────

function rnd(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function pad2(n: number): string {
  return String(Math.floor(n)).padStart(2, '0');
}

function formatUptime(u: UptimeState): string {
  const t = u.total;
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return `${d}d ${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

function nowTs(): string {
  const n = new Date();
  return `${pad2(n.getHours())}:${pad2(n.getMinutes())}:${pad2(n.getSeconds())}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

let _uid = 1000;
function uid(): number { return ++_uid; }

// ── Constants ─────────────────────────────────────────────────────────────────

const NODES = [
  { id: 0, x: 18, y: 20, label: 'GATEWAY'  },
  { id: 1, x: 82, y: 20, label: 'ESP32-S3' },
  { id: 2, x: 18, y: 80, label: 'SENSOR-A' },
  { id: 3, x: 82, y: 80, label: 'SENSOR-B' },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [0, 3],
];

interface TopicDef {
  topic:     string;
  mkPayload: (m: Metrics) => string;
  kind:      'normal' | 'warn';
}

const TOPIC_POOL: TopicDef[] = [
  { topic: 'sensor/temp',      mkPayload: m => `{"value":${m.cpuTemp.toFixed(1)},"unit":"C"}`,                            kind: 'normal' },
  { topic: 'sensor/wifi',      mkPayload: m => `{"rssi":${m.wifiDbm.toFixed(0)},"q":"${m.wifiDbm>-60?'GOOD':'WEAK'}"}`,  kind: 'normal' },
  { topic: 'sensor/ram',       mkPayload: m => `{"usage":${m.ramPct.toFixed(1)},"free":${(100-m.ramPct).toFixed(1)}}`,    kind: 'normal' },
  { topic: 'sensor/hz',        mkPayload: m => `{"freq":${Math.round(m.sensorHz)}}`,                                      kind: 'normal' },
  { topic: 'status/heartbeat', mkPayload: _  => 'OK',                                                                      kind: 'normal' },
  { topic: 'status/health',    mkPayload: _  => `{"heap":${Math.floor(rnd(185000,240000))},"ok":true}`,                   kind: 'normal' },
  { topic: 'sys/log',          mkPayload: _  => '{"level":"INFO","msg":"task_scheduler_ok"}',                              kind: 'normal' },
  { topic: 'sys/gpio',         mkPayload: _  => `{"pin":${Math.floor(rnd(1,40))},"state":${Math.random()>0.5?1:0}}`,      kind: 'normal' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function PcbTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(16,185,129,0.028) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16,185,129,0.028) 1px, transparent 1px)
        `,
        backgroundSize: '22px 22px',
      }}
    />
  );
}

function StatusDot({ conn, isAlert }: { conn: ConnState; isAlert: boolean }) {
  const isOnline = conn === 'connected';
  const isRecon  = conn === 'reconnecting';

  return (
    <div className="relative flex items-center justify-center w-3 h-3 shrink-0">
      {isOnline && !isAlert && (
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{ background: 'rgba(16,185,129,0.35)' }}
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {isRecon && (
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{ background: 'rgba(245,158,11,0.35)' }}
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
      <div
        className="w-2 h-2 rounded-full transition-colors duration-400"
        style={{
          background: isAlert      ? '#ef4444' :
                      conn === 'offline' ? 'rgba(255,255,255,0.15)' :
                      isRecon      ? '#f59e0b' :
                      '#10b981',
        }}
      />
    </div>
  );
}

// ─ Metric cards ─

function MetricShell({ label, children, offline }: { label: string; children: React.ReactNode; offline?: boolean }) {
  return (
    <div
      className="rounded-lg p-3 transition-colors duration-500"
      style={{
        border: `1px solid ${offline ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'}`,
        background: offline ? 'rgba(255,255,255,0.008)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <span className="font-mono text-[7px] tracking-[0.32em] uppercase text-white/25 block mb-2">{label}</span>
      {children}
    </div>
  );
}

function TempCard({ value, spike, offline }: { value: number; spike: boolean; offline: boolean }) {
  const color = offline ? 'rgba(255,255,255,0.12)' :
                spike || value > 72 ? '#ef4444' :
                value > 60          ? '#f59e0b' :
                '#10b981';
  return (
    <MetricShell label="CPU TEMP" offline={offline}>
      <div className="font-mono text-xl font-bold leading-none transition-colors duration-300" style={{ color }}>
        {offline ? '---' : value.toFixed(1)}
        <span className="text-[9px] font-normal ml-1 opacity-55">°C</span>
      </div>
      <div className="mt-2 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: offline ? '0%' : `${Math.min(100, ((value - 30) / 60) * 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </MetricShell>
  );
}

function WifiCard({ value, pct, spike, offline }: { value: number; pct: number; spike: boolean; offline: boolean }) {
  const color = offline ? 'rgba(255,255,255,0.12)' :
                spike   ? '#ef4444' :
                pct > 50 ? '#10b981' : '#f59e0b';
  // Signal bars
  const bars = [25, 50, 75, 100];
  return (
    <MetricShell label="RF / WIFI" offline={offline}>
      <div className="font-mono text-xl font-bold leading-none transition-colors duration-300" style={{ color }}>
        {offline ? '---' : value.toFixed(0)}
        <span className="text-[9px] font-normal ml-1 opacity-55">dBm</span>
      </div>
      <div className="mt-2 flex items-end gap-[3px] h-3">
        {bars.map((threshold, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-[1px]"
            style={{
              background: (!offline && pct >= threshold) ? color : 'rgba(255,255,255,0.07)',
              height: `${25 + i * 25}%`,
            }}
            animate={{ opacity: (!offline && pct >= threshold) ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </MetricShell>
  );
}

function RamCard({ value, spike, offline }: { value: number; spike: boolean; offline: boolean }) {
  const color = offline ? 'rgba(255,255,255,0.12)' :
                spike || value > 85 ? '#ef4444' :
                value > 70          ? '#f59e0b' :
                '#10b981';
  return (
    <MetricShell label="RAM USAGE" offline={offline}>
      <div className="font-mono text-xl font-bold leading-none transition-colors duration-300" style={{ color }}>
        {offline ? '--.-' : value.toFixed(1)}
        <span className="text-[9px] font-normal ml-1 opacity-55">%</span>
      </div>
      <div className="mt-2 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: offline ? '0%' : `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </MetricShell>
  );
}

function HzCard({ value, spike, offline }: { value: number; spike: boolean; offline: boolean }) {
  const color = offline ? 'rgba(255,255,255,0.12)' :
                spike   ? '#ef4444' : '#10b981';
  return (
    <MetricShell label="SENSOR HZ" offline={offline}>
      <div className="font-mono text-xl font-bold leading-none transition-colors duration-300" style={{ color }}>
        {offline ? '----' : Math.round(value)}
        <span className="text-[9px] font-normal ml-1 opacity-55">Hz</span>
      </div>
      <div className="mt-2 flex gap-[2px] items-end h-3">
        {Array.from({ length: 8 }).map((_, i) => {
          const active = !offline && (Math.round(value) / 1200) * 8 > i;
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-[1px]"
              style={{ background: active ? color : 'rgba(255,255,255,0.06)' }}
              animate={{ height: `${40 + i * 8}%`, opacity: active ? 1 : 0.35 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            />
          );
        })}
      </div>
    </MetricShell>
  );
}

// ─ Topology Map ─

function TopologyMap({ activeNode, flashEdge, offline }: {
  activeNode: number | null;
  flashEdge:  number | null;
  offline:    boolean;
}) {
  return (
    <div className="relative w-full max-w-[200px] mx-auto aspect-square">
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = NODES[a];
          const nb = NODES[b];
          const isFlash = flashEdge === i && !offline;
          return (
            <g key={i}>
              <line
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={isFlash ? 'rgba(16,185,129,0.7)' : 'rgba(16,185,129,0.13)'}
                strokeWidth={isFlash ? 1.2 : 0.7}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
              {/* Data packet dot traveling along edge */}
              {isFlash && (
                <motion.circle
                  r={1.5}
                  fill="#10b981"
                  initial={{ cx: na.x, cy: na.y, opacity: 1 }}
                  animate={{ cx: nb.x, cy: nb.y, opacity: [1, 1, 0] }}
                  transition={{ duration: 0.65, ease: 'linear' }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const isActive = activeNode === node.id && !offline;
          return (
            <g key={node.id}>
              {/* Pulse ring */}
              <AnimatePresence>
                {isActive && (
                  <motion.circle
                    key={`ring-${node.id}`}
                    cx={node.x} cy={node.y}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={0.8}
                    initial={{ r: 4.5, opacity: 0.9 }}
                    animate={{ r: 10,  opacity: 0   }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
              {/* Node fill */}
              <circle
                cx={node.x} cy={node.y} r={4.5}
                stroke={offline ? 'rgba(255,255,255,0.1)' : isActive ? '#10b981' : 'rgba(16,185,129,0.32)'}
                strokeWidth={1}
                fill={offline ? '#0a0a0a' : isActive ? 'rgba(16,185,129,0.22)' : '#050b08'}
                style={{ transition: 'fill 0.2s, stroke 0.2s' }}
              />
              {/* Center dot */}
              <circle
                cx={node.x} cy={node.y} r={1.2}
                fill={offline ? 'rgba(255,255,255,0.1)' : isActive ? '#10b981' : 'rgba(16,185,129,0.4)'}
                style={{ transition: 'fill 0.2s' }}
              />
              {/* Label */}
              <text
                x={node.x} y={node.y + 10}
                textAnchor="middle"
                fill={offline ? 'rgba(255,255,255,0.15)' : 'rgba(16,185,129,0.4)'}
                fontSize={3.2}
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function IoTTelemetryDashboard() {
  const [mounted,    setMounted]    = useState(false);
  const [conn,       setConn]       = useState<ConnState>('connected');
  const [metrics,    setMetrics]    = useState<Metrics>({ cpuTemp: 52, wifiDbm: -58, ramPct: 55, sensorHz: 1024 });
  const [uptime,     setUptime]     = useState<UptimeState>({ total: 302820 });
  const [logs,       setLogs]       = useState<MqttEntry[]>([]);
  const [spike,      setSpike]      = useState(false);
  const [spikeTick,  setSpikeTick]  = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [flashEdge,  setFlashEdge]  = useState<number | null>(null);

  const connRef    = useRef<ConnState>('connected');
  const spikeRef   = useRef(false);
  const metricsRef = useRef(metrics);
  const logRef     = useRef<HTMLDivElement>(null);
  const connBusy   = useRef(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { connRef.current    = conn;    }, [conn]);
  useEffect(() => { spikeRef.current   = spike;   }, [spike]);
  useEffect(() => { metricsRef.current = metrics; }, [metrics]);

  // Uptime counter
  useEffect(() => {
    const id = setInterval(() => setUptime(u => ({ total: u.total + 1 })), 1000);
    return () => clearInterval(id);
  }, []);

  // Metrics update every 2s
  useEffect(() => {
    const id = setInterval(() => {
      if (connRef.current !== 'connected') return;
      if (spikeRef.current) {
        setMetrics({
          cpuTemp:  clamp(rnd(74, 89),  0, 100),
          wifiDbm:  clamp(rnd(-86, -78), -100, 0),
          ramPct:   clamp(rnd(82, 94),  0, 100),
          sensorHz: rnd(290, 510),
        });
      } else {
        setMetrics(m => ({
          cpuTemp:  clamp(m.cpuTemp  + rnd(-2.5, 3.5),  38,  72),
          wifiDbm:  clamp(m.wifiDbm  + rnd(-2,   2.5),  -78, -45),
          ramPct:   clamp(m.ramPct   + rnd(-2.5, 3),    42,  68),
          sensorHz: clamp(m.sensorHz + rnd(-45,  50),  847, 1203),
        }));
      }
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // MQTT log entries every 1.5s
  useEffect(() => {
    const id = setInterval(() => {
      if (connRef.current !== 'connected') return;
      const t = TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
      const m = metricsRef.current;
      const entry: MqttEntry = {
        id:      uid(),
        ts:      nowTs(),
        topic:   t.topic,
        payload: t.mkPayload(m),
        kind:    spikeRef.current ? 'alert' : t.kind,
      };
      setLogs(prev => [entry, ...prev].slice(0, 20));

      // Animate random node + edge
      const nId = Math.floor(Math.random() * NODES.length);
      const eId = Math.floor(Math.random() * EDGES.length);
      setActiveNode(nId);
      setFlashEdge(eId);
      setTimeout(() => { setActiveNode(null); setFlashEdge(null); }, 700);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Spike lifecycle
  useEffect(() => {
    if (!spike) return;
    setSpikeTick(8);
    setLogs(prev => [{
      id: uid(), ts: nowTs(),
      topic:   'sys/anomaly',
      payload: '⚠ ANOMALY DETECTED: temp threshold exceeded',
      kind:    'alert',
    } as MqttEntry, ...prev].slice(0, 20));
    const id = setInterval(() => {
      setSpikeTick(c => {
        if (c <= 1) { setSpike(false); clearInterval(id); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [spike]);

  // Scroll log to top on new entry
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [logs.length]);

  const handleSpike = () => {
    if (spike || conn !== 'connected') return;
    setSpike(true);
  };

  const handleToggleConn = async () => {
    if (connBusy.current) return;
    connBusy.current = true;

    if (conn === 'connected') {
      setConn('dropping');
      await sleep(1100);
      setConn('offline');
      setLogs(prev => [{
        id: uid(), ts: nowTs(),
        topic:   'sys/conn',
        payload: '✗ CONNECTION LOST: broker unreachable',
        kind:    'warn',
      } as MqttEntry, ...prev].slice(0, 20));
    } else if (conn === 'offline') {
      setConn('reconnecting');
      setLogs(prev => [{
        id: uid(), ts: nowTs(),
        topic:   'sys/conn',
        payload: '↺ RECONNECTING to mqtt.mezzold.io...',
        kind:    'warn',
      } as MqttEntry, ...prev].slice(0, 20));
      await sleep(2200);
      setConn('connected');
      setLogs(prev => [{
        id: uid(), ts: nowTs(),
        topic:   'sys/conn',
        payload: '✓ MQTT CONNECTED: session restored',
        kind:    'normal',
      } as MqttEntry, ...prev].slice(0, 20));
    }

    connBusy.current = false;
  };

  const wifiPct  = Math.max(0, Math.min(100, ((metrics.wifiDbm + 90) / 50) * 100));
  const isAlert   = spike;
  const isOffline = conn === 'offline';

  if (!mounted) return null;

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{ background: '#050707', border: `1px solid ${isAlert ? 'rgba(239,68,68,0.28)' : 'rgba(16,185,129,0.18)'}`, transition: 'border-color 0.5s' }}
    >
      <PcbTexture />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, transparent 50%, rgba(5,7,7,0.7) 100%)' }}
      />

      {/* ── Header ── */}
      <div
        className="relative flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b"
        style={{
          borderColor:  isAlert ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.13)',
          background:   isAlert ? 'rgba(239,68,68,0.04)' : 'rgba(16,185,129,0.025)',
          transition:   'background 0.6s, border-color 0.6s',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <StatusDot conn={conn} isAlert={isAlert} />
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase whitespace-nowrap">
            <span className="text-white/60">DEVICE_01</span>
            <span className="text-white/20 mx-1.5">|</span>
            <span className="text-white/50">ESP32-S3</span>
            <span className="text-white/20 mx-1.5">|</span>
            <span style={{
              color:      isAlert            ? '#ef4444' :
                          isOffline          ? 'rgba(255,255,255,0.2)' :
                          conn === 'reconnecting' ? '#f59e0b' : '#10b981',
              transition: 'color 0.4s',
            }}>
              {isAlert           ? 'ANOMALY DETECTED ⚠' :
               conn === 'dropping'    ? 'DROPPING...' :
               isOffline         ? 'DISCONNECTED ✗' :
               conn === 'reconnecting' ? 'RECONNECTING...' :
               'MQTT CONNECTED ●'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSpike}
            disabled={spike || conn !== 'connected'}
            className="font-mono text-[7px] tracking-[0.22em] uppercase px-3 py-1.5 rounded border transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{ borderColor: 'rgba(239,68,68,0.3)', color: 'rgba(239,68,68,0.75)' }}
            onMouseEnter={e => { if (!spike && conn === 'connected') (e.currentTarget.style.background = 'rgba(239,68,68,0.07)'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); }}
          >
            {spike ? `⚡ SPIKE ${spikeTick}s` : '⚡ SIMULAR SPIKE'}
          </button>

          <button
            onClick={handleToggleConn}
            disabled={conn === 'dropping' || conn === 'reconnecting'}
            className="font-mono text-[7px] tracking-[0.22em] uppercase px-3 py-1.5 rounded border border-white/10 text-white/35 hover:text-white/60 hover:border-white/20 hover:bg-white/[0.04] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
          >
            {conn === 'connected'    ? 'DESCONECTAR' :
             conn === 'dropping'     ? 'AGUARDE...'  :
             conn === 'offline'      ? '↺ RECONECTAR' :
             'CONECTANDO...'}
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="relative p-4 grid grid-cols-1 lg:grid-cols-[1fr_252px] gap-4">

        {/* ─ Left ─ */}
        <div className="flex flex-col gap-3 min-w-0">

          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <TempCard value={metrics.cpuTemp}  spike={isAlert} offline={isOffline} />
            <WifiCard value={metrics.wifiDbm}  pct={wifiPct}  spike={isAlert} offline={isOffline} />
            <RamCard  value={metrics.ramPct}   spike={isAlert} offline={isOffline} />
            <HzCard   value={metrics.sensorHz} spike={isAlert} offline={isOffline} />
          </div>

          {/* Uptime */}
          <div
            className="flex items-center justify-between rounded-lg px-4 py-2.5"
            style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.012)' }}
          >
            <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-white/22">DEVICE UPTIME</span>
            <motion.span
              key={uptime.total}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12 }}
              className="font-mono text-[11px] tabular-nums text-white/50"
            >
              {formatUptime(uptime)}
            </motion.span>
          </div>

          {/* MQTT Log */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(16,185,129,0.1)', background: 'rgba(0,0,0,0.45)' }}
          >
            {/* Log header */}
            <div
              className="flex items-center justify-between px-4 py-2 border-b"
              style={{ borderColor: 'rgba(16,185,129,0.07)' }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-emerald/40">MQTT EVENT LOG</span>
                <motion.span
                  className="inline-block w-[3px] h-[10px] rounded-[1px]"
                  style={{ background: 'rgba(16,185,129,0.55)' }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.65, repeat: Infinity, repeatType: 'reverse' }}
                />
              </div>
              <span className="font-mono text-[7px] text-white/15">{logs.length} / 20</span>
            </div>

            {/* Scanlines + log body */}
            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.018]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16,185,129,1) 2px, rgba(16,185,129,1) 3px)',
                }}
              />
              <div
                ref={logRef}
                className="h-52 overflow-y-auto p-3 space-y-px"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(16,185,129,0.18) transparent' }}
              >
                <AnimatePresence initial={false}>
                  {logs.map(entry => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1,  x: 0   }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="font-mono text-[9px] leading-[1.9] whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{
                        color: entry.kind === 'alert' ? '#ef4444' :
                               entry.kind === 'warn'  ? '#f59e0b' :
                               'rgba(16,185,129,0.72)',
                      }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.17)' }}>[{entry.ts}]</span>
                      {' '}
                      <span style={{
                        color: entry.kind === 'normal' ? 'rgba(16,185,129,0.42)' : 'inherit',
                      }}>
                        {entry.topic}:
                      </span>
                      {' '}
                      {entry.payload}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {logs.length === 0 && (
                  <p className="font-mono text-[9px] text-white/15 text-center py-10">
                    {isOffline ? '— no broker connection —' : 'awaiting events...'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─ Right ─ */}
        <div className="flex flex-col gap-3">

          {/* Topology map */}
          <div
            className="rounded-lg p-4"
            style={{ border: '1px solid rgba(16,185,129,0.1)', background: 'rgba(0,0,0,0.28)' }}
          >
            <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-emerald/35 block mb-3">TOPOLOGY MAP</span>
            <TopologyMap activeNode={activeNode} flashEdge={flashEdge} offline={isOffline} />

            {/* Node status list */}
            <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {NODES.map(n => (
                <div key={n.id} className="flex items-center justify-between">
                  <span className="font-mono text-[7px] text-white/25 tracking-widest">{n.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-[5px] h-[5px] rounded-full transition-colors duration-200"
                      style={{
                        background: isOffline          ? 'rgba(255,255,255,0.1)'  :
                                    activeNode === n.id ? '#10b981'               :
                                    'rgba(16,185,129,0.2)',
                      }}
                    />
                    <span
                      className="font-mono text-[7px] transition-colors duration-200"
                      style={{
                        color: isOffline           ? 'rgba(255,255,255,0.15)' :
                               activeNode === n.id ? '#10b981'                :
                               'rgba(255,255,255,0.18)',
                      }}
                    >
                      {isOffline ? 'OFFLINE' : activeNode === n.id ? 'TX' : 'IDLE'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broker config */}
          <div
            className="rounded-lg p-4 space-y-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
          >
            <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-white/18 block mb-2.5">BROKER CONFIG</span>
            {[
              ['HOST',  'mqtt.mezzold.io'],
              ['PORT',  '8883 / TLS'],
              ['QOS',   'Level 1'],
              ['PROTO', 'MQTT v5.0'],
              ['KEEP',  '60s'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="font-mono text-[7px] text-white/22">{k}</span>
                <span className="font-mono text-[7px] text-white/45">{v}</span>
              </div>
            ))}
          </div>

          {/* IoT badge */}
          <div
            className="rounded-lg px-4 py-3 flex items-center justify-between"
            style={{ border: '1px solid rgba(16,185,129,0.08)', background: 'rgba(16,185,129,0.03)' }}
          >
            <span className="font-mono text-[7px] tracking-[0.25em] uppercase text-emerald/40">IOT INTEGRATION</span>
            <span className="font-mono text-[7px] text-emerald/60">ESP32 · MQTT · TLS</span>
          </div>
        </div>
      </div>

      {/* Anomaly glow overlay */}
      <AnimatePresence>
        {isAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: 'inset 0 0 100px rgba(239,68,68,0.06)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
