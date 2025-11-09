
import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { GlassCard } from './GlassCard';
import { Icon } from './Icon';

export const TransactionList: React.FC = () => {
  return (
    <GlassCard>
      <h3 className="text-xl font-bold text-white mb-4">Últimas Transações</h3>
      <div className="space-y-4">
        {MOCK_TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors duration-200">
            <div className={`p-3 rounded-full ${tx.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              <Icon as={tx.icon} className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">{tx.description}</p>
              <p className="text-sm text-slate-400">{tx.date}</p>
            </div>
            <p className={`font-bold text-lg ${tx.type === 'income' ? 'text-green-400' : 'text-white'}`}>
              {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(tx.amount)}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
