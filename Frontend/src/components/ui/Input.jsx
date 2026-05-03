import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  hint,
  icon,
  rightElement,
  className = '',
  containerClass = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white/[0.04] border text-slate-200 placeholder-slate-600
            rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200
            focus:ring-2 focus:ring-inset
            ${error
              ? 'border-red-500/50 focus:ring-red-500/30'
              : 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20'
            }
            ${icon ? 'pl-10' : ''}
            ${rightElement ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
