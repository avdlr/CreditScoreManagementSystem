import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import { people } from '../data/mockData';

interface PersonSelectorProps {
  selectedPersonId: string;
  onPersonChange: (personId: string) => void;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({ selectedPersonId, onPersonChange }) => {
  const selectedPerson = people.find(p => p.id === selectedPersonId);

  const getCreditScoreCategory = (score: number) => {
    if (score >= 800) return { category: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 740) return { category: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 670) return { category: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 580) return { category: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { category: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Select Person</h2>
      </div>

      <div className="relative">
        <select
          value={selectedPersonId}
          onChange={(e) => onPersonChange(e.target.value)}
          className="w-full p-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-lg font-medium"
        >
          {people.map(person => {
            const { category, color } = getCreditScoreCategory(person.creditScore);
            return (
              <option key={person.id} value={person.id}>
                {person.firstName} {person.lastName} - {person.creditScore} ({category})
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {selectedPerson && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2">{selectedPerson.address.city}, {selectedPerson.address.state}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Age:</span>
              <span className="ml-2">{selectedPerson.demographics.age} years old</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Income:</span>
              <span className="ml-2">${selectedPerson.income.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-3 text-sm">
            <span className="font-medium text-gray-700">Employment:</span>
            <span className="ml-2">{selectedPerson.employment.position} at {selectedPerson.employment.company}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonSelector;