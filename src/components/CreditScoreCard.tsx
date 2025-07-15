import React, { useState } from 'react';
import { TrendingUp, Edit3, Save, X } from 'lucide-react';
import { people } from '../data/mockData';

interface CreditScoreCardProps {
  selectedPersonId: string;
  onScoreUpdate: (newScore: number) => void;
}

const CreditScoreCard: React.FC<CreditScoreCardProps> = ({ selectedPersonId, onScoreUpdate }) => {
  const selectedPerson = people.find(p => p.id === selectedPersonId);
  
  if (!selectedPerson) return null;

  const creditScore = {
    score: selectedPerson.creditScore,
    lastUpdated: selectedPerson.lastUpdated,
    history: selectedPerson.creditHistory
  };

  const [isEditing, setIsEditing] = useState(false);
  const [newScore, setNewScore] = useState(creditScore.score.toString());

  const getCreditScoreCategory = (score: number) => {
    if (score >= 800) return { category: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 740) return { category: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 670) return { category: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 580) return { category: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { category: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const handleSave = () => {
    const score = parseInt(newScore);
    if (score >= 300 && score <= 850) {
      onScoreUpdate(score);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewScore(creditScore.score.toString());
    setIsEditing(false);
  };

  const { category, color, bgColor } = getCreditScoreCategory(creditScore.score);
  const scorePercentage = ((creditScore.score - 300) / (850 - 300)) * 100;

  // Calculate trend from last two entries
  const getTrend = () => {
    if (creditScore.history.length < 2) return '+0';
    const latest = creditScore.history[creditScore.history.length - 1].score;
    const previous = creditScore.history[creditScore.history.length - 2].score;
    const diff = latest - previous;
    return diff > 0 ? `+${diff}` : diff.toString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedPerson.firstName}'s Credit Score
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span className="text-sm">Update</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="text-center mb-6">
        {isEditing ? (
          <div className="inline-block">
            <input
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              min="300"
              max="850"
              className="text-5xl font-bold text-center w-32 border-2 border-blue-300 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">Enter score (300-850)</p>
          </div>
        ) : (
          <>
            <div className="text-5xl font-bold text-gray-900 mb-2">{creditScore.score}</div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${color}`}>
              {category}
            </div>
          </>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full relative"
            style={{ width: '100%' }}
          >
            <div 
              className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-700 rounded-full transform -translate-y-0.5 -translate-x-2"
              style={{ left: `${scorePercentage}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>300</span>
          <span>850</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>Last updated: {new Date(creditScore.lastUpdated).toLocaleDateString()}</span>
        </div>
        <span className="text-green-600 font-medium">{getTrend()} from last update</span>
      </div>
    </div>
  );
};

export default CreditScoreCard;