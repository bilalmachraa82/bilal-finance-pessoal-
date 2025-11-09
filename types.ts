// Fix: Import ElementType to resolve 'Cannot find namespace React' error.
import type { ElementType } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: 'EUR';
  category: string;
  type: 'income' | 'expense';
  // Fix: Use the imported ElementType.
  icon: ElementType;
}

// Fix: Updated Account interface to align with the data structure in constants.ts.
// This resolves errors where properties like 'tipo' were not found. The interface
// now uses Portuguese property names and removes the 'name' field, as the account's
// name is derived from the record key in UserProfile.
export interface Account {
  tipo: string;
  operações: string[];
}

export interface UserProfile {
  identification: {
    nome: string;
    localização_principal: string;
    propriedades: Record<string, string>;
  };
  ecosystem_financeiro: {
    bancos: Record<string, Account>;
    fluxos_complexos: Record<string, any>;
  };
}

export interface CashflowDataPoint {
  date: string;
  income: number;
  expenses: number;
}

export interface ReceiptData {
    vendor?: string;
    totalAmount?: number;
    date?: string;
    items?: { name: string; price: number; quantity: number }[];
}
