const SERVICES = [
  { name: 'API Gateway', status: 'Operational', uptime: '99.98%', latency: '42ms', region: 'US-East' },
  { name: 'Database Cluster', status: 'Degraded', uptime: '97.12%', latency: '312ms', region: 'US-East' },
  { name: 'Auth Service', status: 'Operational', uptime: '100%', latency: '18ms', region: 'Global' },
  { name: 'Storage (S3)', status: 'Operational', uptime: '99.99%', latency: '67ms', region: 'Multi-region' },
  { name: 'AI Engine', status: 'Operational', uptime: '99.91%', latency: '230ms', region: 'US-West' },
  { name: 'CDN', status: 'Investigating', uptime: '99.45%', latency: '11ms', region: 'Global' },
  { name: 'Email Service', status: 'Operational', uptime: '99.87%', latency: '55ms', region: 'EU-West' },
  { name: 'CI/CD Pipeline', status: 'Operational', uptime: '99.50%', latency: '—', region: 'US-East' },
];

const STATUS_CONFIG = {
  Operational: { dot: 'bg-emerald-400', text: 'text-emerald-400', badge: 'bg-emerald-500/10 border-emerald-500/20', pulse: false },
  Degraded: { dot: 'bg-red-400', text: 'text-red-400', badge: 'bg-red-500/10 border-red-500/20', pulse: true },
  Investigating: { dot: 'bg-amber-400', text: 'text-amber-400', badge: 'bg-amber-500/10 border-amber-500/20', pulse: true },
  Down: { dot: 'bg-red-500', text: 'text-red-500', badge: 'bg-red-500/15 border-red-500/30', pulse: true },
};

export default function SystemStatus() {
  const operational = SERVICES.filter((s) => s.status === 'Operational').length;
  const total = SERVICES.length;
  const pct = Math.round((operational / total) * 100);

  return (
    <div className="bg-[#0d1117]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-white font-semibold text-base">System Status</h2>
          <p className="text-slate-500 text-xs mt-0.5">{operational}/{total} services operational</p>
        </div>
        {/* Health ring */}
        <div className="relative w-10 h-10 shrink-0">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#1f2937" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke={pct === 100 ? '#10b981' : pct >= 80 ? '#f59e0b' : '#ef4444'}
              strokeWidth="3"
              strokeDasharray={`${pct * 0.879} 87.9`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{pct}%</span>
        </div>
      </div>

      {/* Services — responsive 1-col on mobile, 2-col on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-white/[0.04] md:divide-y-0">
        {SERVICES.map((svc, i) => {
          const cfg = STATUS_CONFIG[svc.status];
          return (
            <div
              key={svc.name}
              className={`flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-white/[0.02] transition-colors
                ${i % 2 === 0 ? 'md:border-r md:border-white/[0.04]' : ''}
                border-b border-white/[0.04] last:border-b-0
                ${i >= SERVICES.length - 2 ? 'md:border-b-0' : 'md:border-b md:border-white/[0.04]'}
              `}
            >
              {/* Status dot */}
              <span className={`block w-2 h-2 rounded-full shrink-0 ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />

              {/* Name + region */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{svc.name}</p>
                <p className="text-[11px] text-slate-600">{svc.region}</p>
              </div>

              {/* Latency — hidden on very small, shown from sm */}
              <span className="text-xs text-slate-500 font-mono hidden sm:block shrink-0">{svc.latency}</span>

              {/* Status badge */}
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${cfg.badge} ${cfg.text} whitespace-nowrap shrink-0`}>
                {svc.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 md:px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
        <p className="text-xs text-slate-600">Auto-refreshes every 30s</p>
        <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          View status page →
        </button>
      </div>
    </div>
  );
}
