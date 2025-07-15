import { useState, useEffect } from 'react';
import { CreditScore, CreditScoreEntry } from '../types';
import { people } from '../data/mockData';

export const useCreditScore = (selectedPersonId?: string) => {
  const [creditScore, setCreditScore] = useState<CreditScore>(() => {
    const defaultPerson = people.find(p => p.id === selectedPersonId) || people[0];
    return {
      score: defaultPerson.creditScore,
      lastUpdated: defaultPerson.lastUpdated,
      history: defaultPerson.creditHistory
    };
  });

  const [currentPersonId, setCurrentPersonId] = useState(selectedPersonId || people[0].id);

  useEffect(() => {
    if (selectedPersonId && selectedPersonId !== currentPersonId) {
      const person = people.find(p => p.id === selectedPersonId);
      if (person) {
        setCreditScore({
          score: person.creditScore,
          lastUpdated: person.lastUpdated,
          history: person.creditHistory
        });
        setCurrentPersonId(selectedPersonId);
      }
    }
  }, [selectedPersonId, currentPersonId]);

  const updateCreditScore = (newScore: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: CreditScoreEntry = {
      date: today,
      score: newScore
    };

    setCreditScore(prev => ({
      score: newScore,
      lastUpdated: today,
      history: [...prev.history, newEntry]
    }));

    // Update the person's data in the people array
    const personIndex = people.findIndex(p => p.id === currentPersonId);
    if (personIndex !== -1) {
      people[personIndex].creditScore = newScore;
      people[personIndex].lastUpdated = today;
      people[personIndex].creditHistory = [...people[personIndex].creditHistory, newEntry];
    }
  };

  const getCreditScoreCategory = (score: number) => {
    if (score >= 800) return { category: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 740) return { category: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 670) return { category: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 580) return { category: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { category: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  return {
    creditScore,
    currentPersonId,
    updateCreditScore,
    getCreditScoreCategory
  };
};