const FEED = [
  { type: 'critical', title: 'Critical incident opened', desc: 'INC-4301: Database cluster unreachable', time: '2m ago', color: 'bg-red-500', ring: 'ring-red-500/30' },
  { type: 'ai', title: 'AI root cause identified', desc: 'Memory leak in worker-03 service (95% confidence)', time: '12m ago', color: 'bg-indigo-500', ring: 'ring-indigo-500/30' },
  { type: 'alert', title: 'Alert threshold breached', desc: 'API latency exceeded 2000ms SLA', time: '20m ago', color: 'bg-orange-500', ring: 'ring-orange-500/30' },
  { type: 'assign', title: 'Incident assigned', desc: 'INC-4300 → Sarah Kim (On-call)', time: '22m ago', color: 'bg-blue-500', ring: 'ring-blue-500/30' },
  { type: 'resolve', title: 'Incident resolved', desc: 'INC-4296: Payment webhook timeout fixed', time: '3h ago', color: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
  { type: 'deploy', title: 'Rollback executed', desc: 'INC-4295: CI/CD pipeline reverted to v2.4.1', time: '5h ago', color: 'bg-purple-500', ring: 'ring-purple-500/30' },
  { type: 'resolve', title: 'Incident resolved', desc: 'INC-4294: Auth service intermittent failures fixed', time: '7h ago', color: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
];

const TYPE_ICONS = {
  critical: (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3L2 21h20L12 3z" />
    </svg>
  ),
  ai: (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  alert: (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  assign: (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  resolve: (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  deploy: (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
};

export default function ActivityFeed() {
  return (
    <div className="bg-[#0d1117]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div>
          <h2 className="text-white font-semibold text-base">Activity Feed</h2>
          <p className="text-slate-500 text-xs mt-0.5">Real-time event stream</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-4">
        {FEED.map((item, i) => (
          <div key={i} className="flex gap-3 group">
            {/* Icon + line */}
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-7 h-7 rounded-full ${item.color} ring-4 ${item.ring} flex items-center justify-center`}>
                {TYPE_ICONS[item.type]}
              </div>
              {i < FEED.length - 1 && (
                <div className="w-px flex-1 bg-white/[0.06] mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1">
              <p className="text-sm font-medium text-white leading-snug group-hover:text-slate-100">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
              <p className="text-[11px] text-slate-600 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
