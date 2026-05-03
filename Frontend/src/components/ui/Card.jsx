import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#111827] border border-white/5 rounded-2xl shadow-2xl p-5 ${className}`}>{children}</div>
  );
}
