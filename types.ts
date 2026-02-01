
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isButton?: boolean;
}

export interface NegotiationRules {
  maxDiscount: number;
  maxInstallments: number;
  paymentMethods: string[];
}

export interface Debtor {
  id: string;
  name: string;
  amount: number;
  days: number;
  status: 'pending' | 'negotiating' | 'paid' | 'refused';
  phone: string;
  historyType: 'unemployed' | 'forgot' | 'aggressive' | 'cooperative';
}
