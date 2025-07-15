import { CreditScore } from '../types';

export async function fetchCreditData(personId: string): Promise<CreditScore> {
  const response = await fetch(`/api/credit-score/${personId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch credit score');
  }
  return response.json();
}
