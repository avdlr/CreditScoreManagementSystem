import React, { useState } from 'react';
import { DollarSign, Calculator } from 'lucide-react';
import { loanOptions, dentalProcedures } from '../data/mockData';
import { people } from '../data/mockData';

interface LoanQualificationProps {
  selectedPersonId: string;
}

const LoanQualification: React.FC<LoanQualificationProps> = ({ selectedPersonId }) => {
  const selectedPerson = people.find(p => p.id === selectedPersonId);
  
  if (!selectedPerson) return null;

  const [selectedProcedure, setSelectedProcedure] = useState(dentalProcedures[0].id);
  
  const procedure = dentalProcedures.find(p => p.id === selectedProcedure);
  const qualifiedLenders = loanOptions.filter(lender => 
    selectedPerson.creditScore >= lender.minCreditScore && 
    (procedure?.avgCost || 0) <= lender.maxLoanAmount
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'urgent': return 'text-orange-600 bg-orange-100';
      case 'elective': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Loan Qualification Calculator</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Dental Procedure
        </label>
        <select
          value={selectedProcedure}
          onChange={(e) => setSelectedProcedure(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {dentalProcedures.map(procedure => (
            <option key={procedure.id} value={procedure.id}>
              {procedure.name} - ${procedure.avgCost.toLocaleString()}
            </option>
          ))}
        </select>
        
        {procedure && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(procedure.urgency)}`}>
                {procedure.urgency.charAt(0).toUpperCase() + procedure.urgency.slice(1)}
              </span>
              <span className="text-gray-600">Average Cost: ${procedure.avgCost.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Qualified Lenders ({qualifiedLenders.length} available)
        </h3>
        
        {qualifiedLenders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">No qualifying lenders found</p>
            <p className="text-sm">Consider improving your credit score or selecting a lower-cost procedure</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {qualifiedLenders.map(lender => (
              <div key={lender.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{lender.lender}</h4>
                    <p className="text-sm text-gray-600">Processing: {lender.processingTime}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{lender.interestRateRange}</div>
                    <div className="text-sm text-gray-500">Interest Rate</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Max Loan:</span>
                    <span className="ml-2">${lender.maxLoanAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Terms:</span>
                    <span className="ml-2">{lender.terms.join(', ')}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="font-medium text-gray-700 text-sm">Special Features:</span>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                    {lender.specialFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanQualification;