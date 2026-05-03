import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../auth/hook/useAuth';

const NAV_LINKS = [
  { name: 'Products', hasDropdown: true },
  { name: 'Solutions', hasDropdown: true },
  { name: 'Resources', hasDropdown: true },
  { name: 'Customers', hasDropdown: false },
  { name: 'Pricing', hasDropdown: false },
  { name: 'Careers', hasDropdown: false },
];

export default function LandingNavbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-wide">ZENTRIX</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors py-8">
                  {link.name}
                  {link.hasDropdown && (
                    <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                
                {/* Mega Menu Dropdown */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl p-3">
                      <div className="space-y-1">
                        <Link to="#" className="block px-4 py-3 hover:bg-white/[0.04] rounded-xl transition-colors">
                          <p className="text-sm font-medium text-white">Overview</p>
                          <p className="text-xs text-slate-400 mt-0.5">Explore the core features.</p>
                        </Link>
                        <Link to="#" className="block px-4 py-3 hover:bg-white/[0.04] rounded-xl transition-colors">
                          <p className="text-sm font-medium text-indigo-400">AI Root Cause</p>
                          <p className="text-xs text-slate-400 mt-0.5">Instant bug detection.</p>
                        </Link>
                        <Link to="#" className="block px-4 py-3 hover:bg-white/[0.04] rounded-xl transition-colors">
                          <p className="text-sm font-medium text-white">Integrations</p>
                          <p className="text-xs text-slate-400 mt-0.5">Connect your stack.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="px-5 py-2.5 rounded-full bg-white text-[#030712] text-sm font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get a Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b0f1a] border-b border-white/[0.05] px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.name} to="#" className="text-base font-medium text-slate-300 hover:text-white px-2">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/[0.05] flex flex-col gap-3">
            <Link to="/login" className="w-full text-center py-3 rounded-xl bg-white/[0.05] text-white font-medium">
              Sign in
            </Link>
            <Link to="/register" className="w-full text-center py-3 rounded-xl bg-indigo-600 text-white font-medium">
              Get a Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
