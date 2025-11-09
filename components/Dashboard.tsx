
import React from 'react';
import { TotalBalanceCard } from './TotalBalanceCard';
import { SummaryCard } from './SummaryCard';
import { CashflowChart } from './CashflowChart';
import { TransactionList } from './TransactionList';
import { MOCK_TRANSACTIONS } from '../constants';

export const Dashboard: React.FC = () => {
    const totalIncome = MOCK_TRANSACTIONS.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = MOCK_TRANSACTIONS.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-3">
                <TotalBalanceCard balance={12345.67} />
            </div>
            <div className="lg:col-span-1">
                <SummaryCard title="Receitas (Últimos 30d)" amount={totalIncome} type="income" />
            </div>
            <div className="lg:col-span-1">
                <SummaryCard title="Despesas (Últimos 30d)" amount={totalExpenses} type="expense" />
            </div>
            <div className="lg:col-span-1">
                 <SummaryCard title="Lucro (Últimos 30d)" amount={totalIncome + totalExpenses} type="profit" />
            </div>
            <div className="lg:col-span-3">
                <CashflowChart />
            </div>
            <div className="lg:col-span-3">
                <TransactionList />
            </div>
        </div>
    );
};
