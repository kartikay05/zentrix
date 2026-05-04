import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

// ── helpers ────────────────────────────────────────────────────────────────────
function toSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── sub-components ──────────────────────────────────────────────────────────────
function ProgressBar() {
  return (
    <div className="flex items-center gap-2 mb-10">
      {/* step 1 – done */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs font-medium text-indigo-300 hidden sm:block">Account</span>
      </div>

      <div className="flex-1 h-px bg-indigo-500/60 rounded" />

      {/* step 2 – done */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs font-medium text-indigo-300 hidden sm:block">Verified</span>
      </div>

      <div className="flex-1 h-px bg-indigo-500/60 rounded" />

      {/* step 3 – active */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center relative">
          <span className="text-xs font-bold text-indigo-300">3</span>
          <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-40" />
        </div>
        <span className="text-xs font-semibold text-white hidden sm:block">Workspace</span>
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────
export default function CreateWorkspace() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    industry: '',
    teamSize: '',
  });
  const [slugStatus, setSlugStatus] = useState('idle'); // 'idle' | 'checking' | 'available' | 'taken' | 'invalid'
  const [slugEdited, setSlugEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceRef = useRef(null);

  // Auto-generate slug from name (if user hasn't manually edited it)
  useEffect(() => {
    if (!slugEdited) {
      setForm((f) => ({ ...f, slug: toSlug(f.name) }));
      setSlugStatus('idle');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  // Debounced slug check
  const checkSlug = useCallback(async (slug) => {
    if (!slug || slug.length < 2) {
      setSlugStatus('idle');
      return;
    }
    const slugRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;
    if (!slugRegex.test(slug)) {
      setSlugStatus('invalid');
      return;
    }
    setSlugStatus('checking');
    try {
      const { data } = await axios.get(`/api/workspace/check-slug?slug=${slug}`, { withCredentials: true });
      setSlugStatus(data.available ? 'available' : 'taken');
    } catch {
      setSlugStatus('idle');
    }
  }, []);

  const handleSlugChange = (e) => {
    const raw = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlugEdited(true);
    setForm((f) => ({ ...f, slug: raw }));
    setSlugStatus('idle');

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => checkSlug(raw), 500);
  };

  const handleSlugBlur = () => {
    clearTimeout(debounceRef.current);
    checkSlug(form.slug);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const isSlugValid = slugStatus === 'available';
  const canSubmit =
    form.name.trim().length >= 2 &&
    form.slug.length >= 2 &&
    isSlugValid &&
    form.industry !== '' &&
    !isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      const payload = {
        orgName: form.name.trim(),
        projectName: form.name.trim(), // same for now; can expose separately later
        slug: form.slug,
        email: user?.email || '',
        description: `Industry: ${form.industry}${form.teamSize ? ` · Team: ${form.teamSize}` : ''}`,
      };

      const response = await axios.post('/api/workspace', payload, { withCredentials: true });
      const createdWorkspace = response.data.workspace;
      toast.success('Workspace created! Welcome to Zentrix 🚀');
      navigate(`/workspace/${createdWorkspace.slug}/projects/new`);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to create workspace';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── slug indicator ─────────────────────────────────────────────────────────
  const SlugBadge = () => {
    if (!form.slug) return null;
    const states = {
      idle:      null,
      checking:  <span className="text-slate-400 text-xs animate-pulse">Checking…</span>,
      available: <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Available</span>,
      taken:     <span className="flex items-center gap-1 text-red-400 text-xs font-semibold"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>Taken</span>,
      invalid:   <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01"/></svg>Invalid format</span>,
    };
    return states[slugStatus];
  };

  // ── select style ──────────────────────────────────────────────────────────
  const selectCls =
    'w-full bg-[#1f2937]/50 border border-slate-700/50 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 transition-all appearance-none cursor-pointer';
  const inputCls =
    'w-full bg-[#1f2937]/50 border border-slate-700/50 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 transition-all';

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">ZENTRIX</span>
        </div>

        {/* Glass card */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-3xl shadow-2xl px-8 py-10 sm:px-10">
          <ProgressBar />

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Set up your workspace</h1>
            <p className="text-slate-400 text-sm mt-2">Configure your team's Zentrix environment. This only takes 30 seconds.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Workspace Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Workspace name <span className="text-red-400">*</span>
              </label>
              <input
                id="workspace-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Acme Corp"
                minLength={2}
                maxLength={50}
                required
                autoFocus
                className={inputCls}
              />
              <p className="text-xs text-slate-500">Your organization or project name. Max 50 characters.</p>
            </div>

            {/* Workspace URL Slug */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-300">
                  Workspace URL <span className="text-red-400">*</span>
                </label>
                <SlugBadge />
              </div>
              <div className="flex items-center bg-[#1f2937]/50 border border-slate-700/50 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                <span className="pl-4 pr-2 text-slate-500 text-sm whitespace-nowrap select-none">zentrix.app/</span>
                <input
                  id="workspace-slug"
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleSlugChange}
                  onBlur={handleSlugBlur}
                  placeholder="acme-corp"
                  required
                  className="flex-1 bg-transparent text-white placeholder-slate-500 pr-4 py-3.5 focus:outline-none text-sm"
                />
              </div>
              <p className="text-xs text-slate-500">Lowercase letters, numbers and hyphens only. Auto-generated from your name.</p>
            </div>

            {/* Industry */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Industry <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="workspace-industry"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  required
                  className={`${selectCls} ${form.industry === '' ? 'text-slate-500' : 'text-white'}`}
                >
                  <option value="" disabled hidden>Select your industry…</option>
                  <option value="saas">SaaS / Software</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="fintech">Fintech</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
                {/* custom chevron */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Team Size */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Team size <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <select
                  id="workspace-team-size"
                  name="teamSize"
                  value={form.teamSize}
                  onChange={handleChange}
                  className={`${selectCls} ${form.teamSize === '' ? 'text-slate-500' : 'text-white'}`}
                >
                  <option value="">Select team size…</option>
                  <option value="just-me">Just me</option>
                  <option value="2-10">2–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="200+">200+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating workspace…
                </>
              ) : (
                <>
                  Create Workspace
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            {/* Skip link */}
            <p className="text-center text-slate-500 text-xs pt-1">
              Already have a workspace?{' '}
              <button type="button" onClick={() => navigate('/dashboard')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Go to dashboard
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
