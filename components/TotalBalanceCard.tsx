
import React from 'react';
import { GlassCard } from './GlassCard';

interface TotalBalanceCardProps {
  balance: number;
}

export const TotalBalanceCard: React.FC<TotalBalanceCardProps> = ({ balance }) => {
  const formattedBalance = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(balance);

  return (
    <GlassCard className="text-center group">
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-lg font-medium text-slate-400 mb-2 transition-all group-hover:text-slate-300">SALDO TOTAL</h2>
        <p className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
          {formattedBalance.slice(0, -3)}
          <span className="text-3xl md:text-4xl text-slate-400">{formattedBalance.slice(-3)}</span>
        </p>
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
              background: `radial-gradient(circle at center, rgba(0, 255, 136, 0.1) 0%, transparent 60%)`
          }}
        />
      </div>
    </GlassCard>
  );
};
