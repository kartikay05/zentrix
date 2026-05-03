import { forwardRef } from 'react';

const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]',
  secondary: 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08]',
  danger: 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/20',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
  outline: 'border border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10',
  white: 'bg-white text-[#030712] hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
