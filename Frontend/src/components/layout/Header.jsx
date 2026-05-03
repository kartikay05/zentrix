import { useState } from 'react';
import { useAuth } from '../../features/auth/hook/useAuth';

export default function Header({ title = 'Dashboard', onMenuClick }) {
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#080c17]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-4 md:px-6 gap-3">
      {/* Hamburger — visible only on mobile/tablet (< lg) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all border border-white/[0.06] shrink-0"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-base md:text-lg tracking-tight truncate">{title}</h1>
        <p className="text-slate-500 text-xs hidden sm:block">{dateStr} · {timeStr}</p>
      </div>

      {/* Search — hidden on small phones, visible from md */}
      <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 w-48 lg:w-64 focus-within:border-indigo-500/50 transition-colors">
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search incidents..."
          className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full min-w-0"
        />
        <kbd className="text-[10px] text-slate-600 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.06] shrink-0 hidden lg:block">⌘K</kbd>
      </div>

      {/* System status — hidden on small screens */}
      <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 text-xs font-medium whitespace-nowrap">All Systems Normal</span>
      </div>

      {/* Notifications */}
      <div className="relative shrink-0">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all border border-white/[0.06]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#080c17]" />
        </button>

        {/* Notification dropdown */}
        {notifOpen && (
          <>
            {/* Click-outside backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
            <div className="absolute right-0 top-11 w-72 sm:w-80 bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <span className="text-white text-sm font-semibold">Notifications</span>
                <span className="text-[10px] text-indigo-400 font-medium bg-indigo-500/10 px-2 py-0.5 rounded-full">3 new</span>
              </div>
              {[
                { title: 'Critical incident detected', desc: 'Database cluster unreachable', time: '2m ago', color: 'bg-red-500' },
                { title: 'AI analysis complete', desc: 'Root cause found for INC-4291', time: '15m ago', color: 'bg-indigo-500' },
                { title: 'Incident resolved', desc: 'INC-4288 closed by Sarah K.', time: '1h ago', color: 'bg-emerald-500' },
              ].map((n, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors border-b border-white/[0.04] last:border-0">
                  <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{n.title}</p>
                    <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                  </div>
                  <span className="text-[11px] text-slate-600 ml-auto shrink-0 mt-0.5">{n.time}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer shrink-0">
        {initials}
      </div>
    </header>
  );
}
