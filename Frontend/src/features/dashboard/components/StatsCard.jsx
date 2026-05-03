const colorConfig = {
  red: {
    glow: 'shadow-[0_0_30px_rgba(239,68,68,0.12)]',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    trendUp: 'text-red-400',
    trendDown: 'text-emerald-400',
    badge: 'bg-red-500/10 text-red-400',
  },
  green: {
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.12)]',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  blue: {
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.12)]',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
    badge: 'bg-blue-500/10 text-blue-400',
  },
  purple: {
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.12)]',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
    badge: 'bg-purple-500/10 text-purple-400',
  },
};

export default function StatsCard({ label, value, subValue, trend, trendDir = 'up', color = 'blue', icon }) {
  const c = colorConfig[color];
  const trendColor = trendDir === 'up' ? c.trendUp : c.trendDown;
  const TrendArrow = trendDir === 'up'
    ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
    : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;

  return (
    <div className={`relative bg-[#0d1117]/80 backdrop-blur-sm border ${c.border} rounded-2xl p-5 ${c.glow} hover:scale-[1.02] transition-transform duration-200`}>
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconColor}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
            {TrendArrow}
            {trend}
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-white tracking-tight mb-0.5">{value}</p>
      <p className="text-sm text-slate-400 font-medium">{label}</p>

      {/* Sub value */}
      {subValue && (
        <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-white/[0.05]">{subValue}</p>
      )}

      {/* Decorative corner glow */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-2xl opacity-10 pointer-events-none`}
        style={{ background: `radial-gradient(circle at top right, ${color === 'red' ? '#ef4444' : color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : '#8b5cf6'}, transparent 70%)` }}
      />
    </div>
  );
}
