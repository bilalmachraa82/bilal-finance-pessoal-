
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MOCK_CASHFLOW_DATA } from '../constants';
import { GlassCard } from './GlassCard';

export const CashflowChart: React.FC = () => {
    
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg shadow-lg">
                    <p className="label font-bold text-white">{`${label}`}</p>
                    <p className="text-green-400">{`Receitas: €${payload[0].value}`}</p>
                    <p className="text-red-400">{`Despesas: €${payload[1].value}`}</p>
                </div>
            );
        }
        return null;
    };
    
  return (
    <GlassCard>
      <h3 className="text-xl font-bold text-white mb-4">Cashflow Anual</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <AreaChart data={MOCK_CASHFLOW_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value/1000}k`} />
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" stroke="#34d399" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" stroke="#f87171" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
