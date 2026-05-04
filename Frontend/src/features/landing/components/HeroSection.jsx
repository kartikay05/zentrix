import { Link } from 'react-router';

export default function HeroSection() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 to-transparent blur-[100px] rounded-full" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMnYtNGg0VjRoLTR6bS0yMCAxMnYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMCAzMHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHoiIGZpbGw9IiM0ZjQ2ZTMiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Zentrix AI Response 2.0 is live
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Resolve Incidents at the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Speed of Thought.
          </span>
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Zentrix autonomously detects, analyzes, and resolves system failures before your customers even notice. The premium AI-powered reliability platform for modern engineering teams.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)]">
            Get a Free Trial
          </Link>
          <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-bold text-lg transition-all">
            Create a Workspace
          </Link>
        </div>

        {/* Dashboard Mockup Preview */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10 bottom-0 h-full" />
          <div className="rounded-xl border border-white/[0.08] bg-[#0d1117]/80 backdrop-blur-sm p-2 shadow-2xl overflow-hidden relative">
             <div className="bg-[#111827] rounded-lg border border-white/[0.04] aspect-[16/9] flex items-center justify-center">
                <div className="text-center">
                   <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                   </div>
                   <h3 className="text-xl font-semibold text-white">AI Incident Analysis UI</h3>
                   <p className="text-slate-500 mt-2">Interactive Dashboard Preview</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
