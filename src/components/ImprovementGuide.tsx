import React from 'react';
import { Target, Clock, TrendingUp } from 'lucide-react';
import { improvementTips } from '../data/mockData';

const ImprovementGuide: React.FC = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment': return '💳';
      case 'utilization': return '📊';
      case 'history': return '📅';
      case 'accounts': return '🏦';
      case 'inquiries': return '🔍';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Credit Improvement Guide</h2>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Your Improvement Potential</h3>
        </div>
        <p className="text-blue-800 text-sm">
          Following these recommendations could improve your credit score by 50-100 points over the next 6-12 months.
        </p>
      </div>

      <div className="space-y-4">
        {improvementTips.map((tip, index) => (
          <div key={tip.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">{getCategoryIcon(tip.category)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(tip.impact)}`}>
                      {tip.impact.toUpperCase()} IMPACT
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{tip.timeframe}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{tip.description}</p>
                
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">
                    Category: {tip.category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">Pro Tip</h3>
        <p className="text-green-800 text-sm">
          Focus on high-impact actions first (payment history and credit utilization) for the fastest results. 
          Even small improvements can help you qualify for better dental financing options.
        </p>
      </div>
    </div>
  );
};

export default ImprovementGuide;