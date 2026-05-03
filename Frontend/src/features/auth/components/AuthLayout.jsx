import React from 'react';

const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: 'Auto-Detection',
    description: 'Real-time monitoring of logs and metrics to spot anomalies instantly.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 8v4l3 3" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: 'AI Root Cause Analysis',
    description: 'Identify and resolve root causes using specialized large language models.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Self-Healing Playbooks',
    description: 'Automated runbooks that resolve common issues without human intervention.',
  },
];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-zentrix-bg flex items-center justify-center p-4 relative overflow-hidden auth-grid-bg">
      {/* Background glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)' }}
      />

      {/* Main card */}
      <div
        className="relative w-full max-w-5xl flex rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--color-zentrix-border)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)',
        }}
      >
        {/* ── Left branding panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between w-[45%] p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.22) 0%, #131629 50%, #0b0d1f 100%)',
            borderRight: '1px solid var(--color-zentrix-border)',
          }}
        >
          {/* Top purple stripe accent */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }}
          />

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 2L3.5 13.5H10.5L8.5 22L20.5 10.5H13.5L15.5 2H13Z" fill="white" />
              </svg>
            </div>
            <div>
              <p className="text-zentrix-text font-bold text-lg leading-tight tracking-tight">Zentrix</p>
              <p className="text-zentrix-muted text-xs tracking-widest uppercase">AI Response</p>
            </div>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-3xl font-bold text-zentrix-text mb-3 leading-snug">
              AI-Powered<br />
              <span style={{ color: 'var(--color-zentrix-primary-light)' }}>Incident Response</span>
            </h1>
            <p className="text-zentrix-muted text-sm mb-8 leading-relaxed">
              Automate detection, analysis, and resolution of system incidents in real time.
            </p>

            {/* Feature list */}
            <div className="space-y-5">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: 'rgba(124,58,237,0.15)',
                      border: '1px solid rgba(124,58,237,0.3)',
                      color: 'var(--color-zentrix-primary-light)',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-zentrix-text text-sm font-medium">{feature.title}</p>
                    <p className="text-zentrix-muted text-xs mt-0.5 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '18m', label: 'Avg MTTR' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3"
                style={{ background: 'rgba(27,31,59,0.6)', border: '1px solid var(--color-zentrix-border)' }}
              >
                <p className="text-zentrix-primary-light text-xl font-bold">{stat.value}</p>
                <p className="text-zentrix-muted text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div
          className="flex-1 flex flex-col justify-center p-8 lg:p-12"
          style={{ background: 'var(--color-zentrix-surface)' }}
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 2L3.5 13.5H10.5L8.5 22L20.5 10.5H13.5L15.5 2H13Z" fill="white" />
              </svg>
            </div>
            <p className="text-zentrix-text font-bold text-lg tracking-tight">Zentrix</p>
          </div>

          <div className="max-w-sm mx-auto w-full" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
