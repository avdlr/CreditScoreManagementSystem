export interface CreditScore {
  score: number;
  lastUpdated: string;
  history: CreditScoreEntry[];
}

export interface CreditScoreEntry {
  date: string;
  score: number;
}

export interface LoanOption {
  id: string;
  lender: string;
  minCreditScore: number;
  maxLoanAmount: number;
  interestRateRange: string;
  terms: string[];
  specialFeatures: string[];
  processingTime: string;
  logo?: string;
}

export interface ImprovementTip {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  category: 'payment' | 'utilization' | 'history' | 'accounts' | 'inquiries';
}

export interface DentalProcedure {
  id: string;
  name: string;
  avgCost: number;
  urgency: 'emergency' | 'urgent' | 'elective';
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  creditScore: number;
  creditHistory: CreditScoreEntry[];
  income: number;
  employment: {
    status: 'employed' | 'self-employed' | 'unemployed' | 'retired';
    company?: string;
    position?: string;
    yearsAtJob?: number;
  };
  demographics: {
    age: number;
    gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    dependents: number;
  };
  lastUpdated: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface PaymentHistoryEntry {
  id: string;
  paymentDate: string;
  creditorName: string;
  accountType: 'credit_card' | 'mortgage' | 'auto_loan' | 'student_loan' | 'personal_loan';
  paymentAmount: number;
  minimumDue: number;
  accountBalance: number;
  paymentStatus: 'on_time' | 'late' | 'missed';
  daysLate?: number;
  accountNumber: string;
}

export interface CreditCardTransaction {
  id: string;
  transactionDate: string;
  merchantName: string;
  category: 'dining' | 'groceries' | 'gas' | 'shopping' | 'healthcare' | 'utilities' | 'entertainment' | 'travel' | 'other';
  amount: number;
  cardName: string;
  cardLastFour: string;
  transactionType: 'purchase' | 'payment' | 'fee' | 'interest';
  description?: string;
}