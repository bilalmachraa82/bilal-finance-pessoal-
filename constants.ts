
import type { UserProfile, Transaction, CashflowDataPoint } from './types';
import { Home, Fuel, UtensilsCrossed, Landmark, Handshake, ShoppingCart, TrendingUp } from 'lucide-react';

export const USER_PROFILE_DATA: UserProfile = {
  identification: {
    nome: "Bilal Machraa",
    localização_principal: "Sintra, Lisboa, Portugal",
    propriedades: {
      residência: "Sintra",
      investimento: "Monte da Caparica",
      aluguer: "Fontanelas",
    },
  },
  ecosystem_financeiro: {
    bancos: {
      millennium_bcp: {
        tipo: "Conta principal",
        operações: ["Créditos", "Despesas diárias", "Receitas clientes"],
      },
      revolut: {
        tipo: "Conta digital",
        operações: ["Rendas inquilinos", "MLM", "Internacional"],
      },
      wizink: {
        tipo: "Cartão crédito",
        operações: ["Compras online", "Emergências"],
      },
    },
    fluxos_complexos: {
      monte_caparica: {
        prestação: 260.29,
        pagadora: "Helene (mãe)",
        receita_mensal: 550.00,
      },
      fontanelas: {
        renda_senhorio: 600.00,
        receitas_inquilinos: 749.00,
        lucro_mensal: 149.00,
        gestão_eletricidade: "Partilhada 4 pessoas",
      },
    },
  },
};

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', date: '2024-07-28', description: 'Renda Inquilinos Fontanelas', amount: 749.00, currency: 'EUR', category: 'Rendimento', type: 'income', icon: Handshake },
    { id: '2', date: '2024-07-27', description: 'Supermercado Lidl', amount: -89.20, currency: 'EUR', category: 'Casa', type: 'expense', icon: ShoppingCart },
    { id: '3', date: '2024-07-26', description: 'Pagamento Senhorio Fontanelas', amount: -600.00, currency: 'EUR', category: 'Habitação', type: 'expense', icon: Home },
    { id: '4', date: '2024-07-25', description: 'Receita Cliente Aiparati', amount: 1200.00, currency: 'EUR', category: 'Negócio', type: 'income', icon: TrendingUp },
    { id: '5', date: '2024-07-24', description: 'Combustível BP', amount: -65.50, currency: 'EUR', category: 'Transporte', type: 'expense', icon: Fuel },
    { id: '6', date: '2024-07-23', description: 'Jantar com Daniela', amount: -75.00, currency: 'EUR', category: 'Lazer', type: 'expense', icon: UtensilsCrossed },
    { id: '7', date: '2024-07-22', description: 'Prestação Monte da Caparica', amount: -260.29, currency: 'EUR', category: 'Crédito', type: 'expense', icon: Landmark },
    { id: '8', date: '2024-07-21', description: 'Comissão Lifewave', amount: 250.00, currency: 'EUR', category: 'MLM', type: 'income', icon: TrendingUp },
];

export const MOCK_CASHFLOW_DATA: CashflowDataPoint[] = [
  { date: 'Jan', income: 3200, expenses: 2500 },
  { date: 'Feb', income: 3500, expenses: 2800 },
  { date: 'Mar', income: 3800, expenses: 2600 },
  { date: 'Apr', income: 3600, expenses: 3100 },
  { date: 'May', income: 4200, expenses: 2900 },
  { date: 'Jun', income: 4500, expenses: 3200 },
  { date: 'Jul', income: 4849, expenses: 2189 },
];
