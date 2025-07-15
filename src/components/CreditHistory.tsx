import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { people } from '../data/mockData';

interface CreditHistoryProps {
  selectedPersonId: string;
}

const CreditHistory: React.FC<CreditHistoryProps> = ({ selectedPersonId }) => {
  const selectedPerson = people.find(p => p.id === selectedPersonId);
  
  if (!selectedPerson) return null;

  const creditScore = {
    score: selectedPerson.creditScore,
    lastUpdated: selectedPerson.lastUpdated,
    history: selectedPerson.creditHistory
  };
  
  const maxScore = Math.max(...creditScore.history.map(entry => entry.score));
  const minScore = Math.min(...creditScore.history.map(entry => entry.score));
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Credit Score History</h2>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{maxScore}</div>
            <div className="text-sm text-green-700">Highest Score</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">+{maxScore - minScore}</div>
            <div className="text-sm text-blue-700">Total Improvement</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {creditScore.history.slice().reverse().map((entry, index) => {
          const isLatest = index === 0;
          const barWidth = ((entry.score - 300) / (850 - 300)) * 100;
          
          return (
            <div key={entry.date} className={`p-3 rounded-lg ${isLatest ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{entry.score}</span>
                  {isLatest && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Current</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${isLatest ? 'bg-blue-500' : 'bg-gray-400'}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Trend Analysis</h3>
        <p className="text-gray-600 text-sm">
          Your credit score has improved by {maxScore - minScore} points over the past 6 months. 
          Keep up the good work to maintain this positive trend and unlock better financing options.
        </p>
      </div>
    </div>
  );
};

export default CreditHistory;