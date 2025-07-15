import { LoanOption, ImprovementTip, DentalProcedure } from '../types';
import { Person } from '../types';

export const loanOptions: LoanOption[] = [
  {
    id: '1',
    lender: 'CareCredit',
    minCreditScore: 580,
    maxLoanAmount: 25000,
    interestRateRange: '0% - 29.99%',
    terms: ['6 months', '12 months', '18 months', '24 months'],
    specialFeatures: ['No interest if paid in full within promotional period', 'Instant approval', 'Wide network of dental providers'],
    processingTime: 'Instant'
  },
  {
    id: '2',
    lender: 'Lending Club',
    minCreditScore: 600,
    maxLoanAmount: 40000,
    interestRateRange: '6.95% - 35.89%',
    terms: ['36 months', '60 months'],
    specialFeatures: ['Fixed monthly payments', 'No prepayment penalties', 'Direct payment to provider'],
    processingTime: '2-7 business days'
  },
  {
    id: '3',
    lender: 'Prosper Healthcare',
    minCreditScore: 640,
    maxLoanAmount: 35000,
    interestRateRange: '5.99% - 31.99%',
    terms: ['24 months', '36 months', '48 months', '60 months'],
    specialFeatures: ['Healthcare-focused lending', 'Competitive rates', 'Flexible payment options'],
    processingTime: '1-3 business days'
  },
  {
    id: '4',
    lender: 'Dentist Direct',
    minCreditScore: 550,
    maxLoanAmount: 15000,
    interestRateRange: '9.99% - 35.99%',
    terms: ['12 months', '24 months', '36 months'],
    specialFeatures: ['Dental-specific financing', 'Quick approval', 'No hidden fees'],
    processingTime: 'Same day'
  }
];

export const improvementTips: ImprovementTip[] = [
  {
    id: '1',
    title: 'Pay Bills on Time',
    description: 'Payment history is the most important factor affecting your credit score. Set up automatic payments or reminders.',
    impact: 'high',
    timeframe: '1-2 months',
    category: 'payment'
  },
  {
    id: '2',
    title: 'Reduce Credit Card Balances',
    description: 'Keep credit utilization below 30%, ideally under 10%. Pay down existing balances before making new purchases.',
    impact: 'high',
    timeframe: '1-3 months',
    category: 'utilization'
  },
  {
    id: '3',
    title: 'Avoid New Credit Inquiries',
    description: 'Each hard inquiry can temporarily lower your score. Avoid applying for new credit unless necessary.',
    impact: 'medium',
    timeframe: '3-6 months',
    category: 'inquiries'
  },
  {
    id: '4',
    title: 'Keep Old Credit Accounts Open',
    description: 'Length of credit history matters. Keep older accounts open even if you don\'t use them regularly.',
    impact: 'medium',
    timeframe: '6-12 months',
    category: 'history'
  },
  {
    id: '5',
    title: 'Consider a Secured Credit Card',
    description: 'If you have limited credit history, a secured card can help build your credit responsibly.',
    impact: 'medium',
    timeframe: '3-6 months',
    category: 'accounts'
  }
];

export const dentalProcedures: DentalProcedure[] = [
  { id: '1', name: 'Emergency Root Canal', avgCost: 1200, urgency: 'emergency' },
  { id: '2', name: 'Dental Crown', avgCost: 1100, urgency: 'urgent' },
  { id: '3', name: 'Tooth Extraction', avgCost: 300, urgency: 'urgent' },
  { id: '4', name: 'Dental Implant', avgCost: 3500, urgency: 'elective' },
  { id: '5', name: 'Teeth Whitening', avgCost: 500, urgency: 'elective' },
  { id: '6', name: 'Orthodontic Treatment', avgCost: 5000, urgency: 'elective' },
  { id: '7', name: 'Periodontal Treatment', avgCost: 800, urgency: 'urgent' },
  { id: '8', name: 'Dental Bridge', avgCost: 2500, urgency: 'urgent' }
];

export const people: Person[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-03-15',
    address: {
      street: '123 Oak Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701'
    },
    creditScore: 750,
    creditHistory: [
      { date: '2024-11-15', score: 745 },
      { date: '2024-12-15', score: 750 }
    ],
    income: 75000,
    employment: {
      status: 'employed',
      company: 'Tech Solutions Inc.',
      position: 'Software Engineer',
      yearsAtJob: 3
    },
    demographics: {
      age: 39,
      gender: 'female',
      maritalStatus: 'married',
      dependents: 2
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'low'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1992-07-22',
    address: {
      street: '456 Pine Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    creditScore: 680,
    creditHistory: [
      { date: '2024-10-15', score: 670 },
      { date: '2024-11-15', score: 675 },
      { date: '2024-12-15', score: 680 }
    ],
    income: 95000,
    employment: {
      status: 'employed',
      company: 'Design Studio',
      position: 'UX Designer',
      yearsAtJob: 2
    },
    demographics: {
      age: 32,
      gender: 'male',
      maritalStatus: 'single',
      dependents: 0
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'medium'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1978-11-08',
    address: {
      street: '789 Maple Drive',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202'
    },
    creditScore: 820,
    creditHistory: [
      { date: '2024-09-15', score: 810 },
      { date: '2024-10-15', score: 815 },
      { date: '2024-11-15', score: 818 },
      { date: '2024-12-15', score: 820 }
    ],
    income: 120000,
    employment: {
      status: 'employed',
      company: 'Healthcare Partners',
      position: 'Nurse Practitioner',
      yearsAtJob: 8
    },
    demographics: {
      age: 46,
      gender: 'female',
      maritalStatus: 'divorced',
      dependents: 1
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'low'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1995-01-30',
    address: {
      street: '321 Cedar Lane',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101'
    },
    creditScore: 580,
    creditHistory: [
      { date: '2024-09-15', score: 560 },
      { date: '2024-10-15', score: 565 },
      { date: '2024-11-15', score: 575 },
      { date: '2024-12-15', score: 580 }
    ],
    income: 45000,
    employment: {
      status: 'employed',
      company: 'Local Restaurant',
      position: 'Manager',
      yearsAtJob: 1
    },
    demographics: {
      age: 29,
      gender: 'male',
      maritalStatus: 'single',
      dependents: 0
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'high'
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Williams',
    email: 'lisa.williams@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1988-09-12',
    address: {
      street: '654 Birch Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    creditScore: 720,
    creditHistory: [
      { date: '2024-08-15', score: 700 },
      { date: '2024-09-15', score: 705 },
      { date: '2024-10-15', score: 710 },
      { date: '2024-11-15', score: 715 },
      { date: '2024-12-15', score: 720 }
    ],
    income: 85000,
    employment: {
      status: 'self-employed',
      company: 'Freelance Consulting',
      position: 'Business Consultant',
      yearsAtJob: 4
    },
    demographics: {
      age: 36,
      gender: 'female',
      maritalStatus: 'married',
      dependents: 3
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'low'
  },
  {
    id: '6',
    firstName: 'Robert',
    lastName: 'Davis',
    email: 'robert.davis@email.com',
    phone: '(555) 678-9012',
    dateOfBirth: '1965-05-18',
    address: {
      street: '987 Elm Court',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001'
    },
    creditScore: 780,
    creditHistory: [
      { date: '2024-10-15', score: 775 },
      { date: '2024-11-15', score: 778 },
      { date: '2024-12-15', score: 780 }
    ],
    income: 110000,
    employment: {
      status: 'employed',
      company: 'Financial Services Corp',
      position: 'Senior Analyst',
      yearsAtJob: 12
    },
    demographics: {
      age: 59,
      gender: 'male',
      maritalStatus: 'married',
      dependents: 0
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'low'
  },
  {
    id: '7',
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.garcia@email.com',
    phone: '(555) 789-0123',
    dateOfBirth: '1990-12-03',
    address: {
      street: '147 Willow Way',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30301'
    },
    creditScore: 650,
    creditHistory: [
      { date: '2024-09-15', score: 630 },
      { date: '2024-10-15', score: 640 },
      { date: '2024-11-15', score: 645 },
      { date: '2024-12-15', score: 650 }
    ],
    income: 62000,
    employment: {
      status: 'employed',
      company: 'Marketing Agency',
      position: 'Marketing Coordinator',
      yearsAtJob: 2
    },
    demographics: {
      age: 34,
      gender: 'female',
      maritalStatus: 'single',
      dependents: 1
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'medium'
  },
  {
    id: '8',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@email.com',
    phone: '(555) 890-1234',
    dateOfBirth: '1982-04-25',
    address: {
      street: '258 Spruce Avenue',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101'
    },
    creditScore: 710,
    creditHistory: [
      { date: '2024-08-15', score: 690 },
      { date: '2024-09-15', score: 695 },
      { date: '2024-10-15', score: 700 },
      { date: '2024-11-15', score: 705 },
      { date: '2024-12-15', score: 710 }
    ],
    income: 78000,
    employment: {
      status: 'employed',
      company: 'Education Department',
      position: 'High School Teacher',
      yearsAtJob: 6
    },
    demographics: {
      age: 42,
      gender: 'male',
      maritalStatus: 'married',
      dependents: 2
    },
    lastUpdated: '2024-12-15',
    riskLevel: 'low'
  }
];

export const paymentHistory: PaymentHistoryEntry[] = [
  {
    id: '1',
    paymentDate: '2024-12-01',
    creditorName: 'Chase Sapphire Card',
    accountType: 'credit_card',
    paymentAmount: 450.00,
    minimumDue: 125.00,
    accountBalance: 2850.00,
    paymentStatus: 'on_time',
    accountNumber: '****4521'
  },
  {
    id: '2',
    paymentDate: '2024-11-28',
    creditorName: 'Wells Fargo Mortgage',
    accountType: 'mortgage',
    paymentAmount: 2100.00,
    minimumDue: 2100.00,
    accountBalance: 285000.00,
    paymentStatus: 'on_time',
    accountNumber: '****8934'
  },
  {
    id: '3',
    paymentDate: '2024-11-25',
    creditorName: 'Capital One Venture',
    accountType: 'credit_card',
    paymentAmount: 75.00,
    minimumDue: 85.00,
    accountBalance: 1250.00,
    paymentStatus: 'late',
    daysLate: 3,
    accountNumber: '****7892'
  },
  {
    id: '4',
    paymentDate: '2024-11-20',
    creditorName: 'Toyota Financial',
    accountType: 'auto_loan',
    paymentAmount: 385.00,
    minimumDue: 385.00,
    accountBalance: 18500.00,
    paymentStatus: 'on_time',
    accountNumber: '****3456'
  },
  {
    id: '5',
    paymentDate: '2024-11-15',
    creditorName: 'Discover Card',
    accountType: 'credit_card',
    paymentAmount: 200.00,
    minimumDue: 65.00,
    accountBalance: 980.00,
    paymentStatus: 'on_time',
    accountNumber: '****9876'
  },
  {
    id: '6',
    paymentDate: '2024-11-10',
    creditorName: 'Federal Student Aid',
    accountType: 'student_loan',
    paymentAmount: 275.00,
    minimumDue: 275.00,
    accountBalance: 24500.00,
    paymentStatus: 'on_time',
    accountNumber: '****5432'
  },
  {
    id: '7',
    paymentDate: '2024-11-05',
    creditorName: 'American Express Gold',
    accountType: 'credit_card',
    paymentAmount: 0.00,
    minimumDue: 95.00,
    accountBalance: 1850.00,
    paymentStatus: 'missed',
    daysLate: 10,
    accountNumber: '****1234'
  },
  {
    id: '8',
    paymentDate: '2024-10-28',
    creditorName: 'LendingClub Personal',
    accountType: 'personal_loan',
    paymentAmount: 320.00,
    minimumDue: 320.00,
    accountBalance: 8500.00,
    paymentStatus: 'on_time',
    accountNumber: '****6789'
  }
];

export const creditCardTransactions: CreditCardTransaction[] = [
  {
    id: '1',
    transactionDate: '2024-12-14',
    merchantName: 'Whole Foods Market',
    category: 'groceries',
    amount: 127.45,
    cardName: 'Chase Sapphire Preferred',
    cardLastFour: '4521',
    transactionType: 'purchase',
    description: 'Weekly grocery shopping'
  },
  {
    id: '2',
    transactionDate: '2024-12-13',
    merchantName: 'Shell Gas Station',
    category: 'gas',
    amount: 52.30,
    cardName: 'Capital One Venture',
    cardLastFour: '7892',
    transactionType: 'purchase',
    description: 'Fuel purchase'
  },
  {
    id: '3',
    transactionDate: '2024-12-12',
    merchantName: 'Amazon.com',
    category: 'shopping',
    amount: 89.99,
    cardName: 'Discover It',
    cardLastFour: '9876',
    transactionType: 'purchase',
    description: 'Electronics accessories'
  },
  {
    id: '4',
    transactionDate: '2024-12-11',
    merchantName: 'Dr. Smith Dental Office',
    category: 'healthcare',
    amount: 350.00,
    cardName: 'Chase Sapphire Preferred',
    cardLastFour: '4521',
    transactionType: 'purchase',
    description: 'Dental cleaning and checkup'
  },
  {
    id: '5',
    transactionDate: '2024-12-10',
    merchantName: 'Starbucks',
    category: 'dining',
    amount: 15.75,
    cardName: 'American Express Gold',
    cardLastFour: '1234',
    transactionType: 'purchase',
    description: 'Coffee and pastry'
  },
  {
    id: '6',
    transactionDate: '2024-12-09',
    merchantName: 'Netflix',
    category: 'entertainment',
    amount: 15.49,
    cardName: 'Capital One Venture',
    cardLastFour: '7892',
    transactionType: 'purchase',
    description: 'Monthly subscription'
  },
  {
    id: '7',
    transactionDate: '2024-12-08',
    merchantName: 'Uber',
    category: 'travel',
    amount: 28.50,
    cardName: 'Chase Sapphire Preferred',
    cardLastFour: '4521',
    transactionType: 'purchase',
    description: 'Ride to airport'
  },
  {
    id: '8',
    transactionDate: '2024-12-07',
    merchantName: 'Target',
    category: 'shopping',
    amount: 156.78,
    cardName: 'Discover It',
    cardLastFour: '9876',
    transactionType: 'purchase',
    description: 'Household items and clothing'
  },
  {
    id: '9',
    transactionDate: '2024-12-06',
    merchantName: 'Electric Company',
    category: 'utilities',
    amount: 145.20,
    cardName: 'American Express Gold',
    cardLastFour: '1234',
    transactionType: 'purchase',
    description: 'Monthly electricity bill'
  },
  {
    id: '10',
    transactionDate: '2024-12-05',
    merchantName: 'Olive Garden',
    category: 'dining',
    amount: 67.85,
    cardName: 'Capital One Venture',
    cardLastFour: '7892',
    transactionType: 'purchase',
    description: 'Dinner with family'
  },
  {
    id: '11',
    transactionDate: '2024-12-04',
    merchantName: 'Chase Bank',
    category: 'other',
    amount: 450.00,
    cardName: 'Chase Sapphire Preferred',
    cardLastFour: '4521',
    transactionType: 'payment',
    description: 'Credit card payment'
  },
  {
    id: '12',
    transactionDate: '2024-12-03',
    merchantName: 'Late Fee',
    category: 'other',
    amount: 25.00,
    cardName: 'American Express Gold',
    cardLastFour: '1234',
    transactionType: 'fee',
    description: 'Late payment fee'
  },
  {
    id: '13',
    transactionDate: '2024-12-02',
    merchantName: 'CVS Pharmacy',
    category: 'healthcare',
    amount: 42.30,
    cardName: 'Discover It',
    cardLastFour: '9876',
    transactionType: 'purchase',
    description: 'Prescription medication'
  },
  {
    id: '14',
    transactionDate: '2024-12-01',
    merchantName: 'Interest Charge',
    category: 'other',
    amount: 18.75,
    cardName: 'Capital One Venture',
    cardLastFour: '7892',
    transactionType: 'interest',
    description: 'Monthly interest charge'
  },
  {
    id: '15',
    transactionDate: '2024-11-30',
    merchantName: 'Home Depot',
    category: 'shopping',
    amount: 234.56,
    cardName: 'Chase Sapphire Preferred',
    cardLastFour: '4521',
    transactionType: 'purchase',
    description: 'Home improvement supplies'
  }
];