
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        bg-slate-800/30
        backdrop-blur-xl
        border border-slate-700/50
        rounded-3xl
        p-6
        transition-all duration-300
        hover:border-slate-600
        shadow-2xl shadow-black/20
        ${className}
      `}
    >
      {children}
    </div>
  );
};
