
import React from 'react';
import { GlassCard } from './GlassCard';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'profit';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const formattedAmount = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    signDisplay: 'never',
  }).format(Math.abs(amount));

  const colors = {
    income: 'text-green-400',
    expense: 'text-red-400',
    profit: amount >= 0 ? 'text-green-400' : 'text-red-400',
  };

  const icons = {
    income: <ArrowUpRight className="w-6 h-6" />,
    expense: <ArrowDownRight className="w-6 h-6" />,
    profit: amount >= 0 ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />,
  };

  return (
    <GlassCard>
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium text-slate-400">{title}</h3>
        <div className={colors[type]}>{icons[type]}</div>
      </div>
      <p className={`text-3xl font-bold tracking-tight mt-2 ${colors[type]}`}>{formattedAmount}</p>
    </GlassCard>
  );
};
