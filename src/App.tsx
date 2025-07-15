import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import PersonSelector from './components/PersonSelector';
import CreditScoreCard from './components/CreditScoreCard';
import LoanQualification from './components/LoanQualification';
import ImprovementGuide from './components/ImprovementGuide';
import CreditHistory from './components/CreditHistory';
import QuickActions from './components/QuickActions';
import PeopleView from './components/PeopleView';
import PaymentHistoryView from './components/PaymentHistoryView';
import CreditCardUsageView from './components/CreditCardUsageView';
import { people } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'people' | 'payment-history' | 'credit-card-usage'>('dashboard');
  const [selectedPersonId, setSelectedPersonId] = useState(people[0].id);

  const handleScoreUpdate = (newScore: number) => {
    const today = new Date().toISOString().split('T')[0];
    const personIndex = people.findIndex(p => p.id === selectedPersonId);
    
    if (personIndex !== -1) {
      people[personIndex].creditScore = newScore;
      people[personIndex].lastUpdated = today;
      people[personIndex].creditHistory = [
        ...people[personIndex].creditHistory,
        { date: today, score: newScore }
      ];
    }
  };

  const handlePaymentHistoryClick = () => {
    setCurrentView('payment-history');
  };

  const handleCreditCardUsageClick = () => {
    setCurrentView('credit-card-usage');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'payment-history' ? (
          <PaymentHistoryView onBack={handleBackToDashboard} />
        ) : currentView === 'credit-card-usage' ? (
          <CreditCardUsageView onBack={handleBackToDashboard} />
        ) : (
          <>
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentView === 'dashboard' ? 'Dental Credit Dashboard' : 
               currentView === 'people' ? 'People Management' : 'Dashboard'}
            </h1>
            <p className="text-gray-600">
              {currentView === 'dashboard' 
                ? 'Manage your credit score and explore dental financing options'
                : currentView === 'people'
                ? 'View and manage multiple credit profiles and demographic information'
                : 'Dashboard'
              }
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('people')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'people'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              People
            </button>
          </div>
        </div>

        {currentView === 'dashboard' ? (
          <>
            <PersonSelector 
              selectedPersonId={selectedPersonId}
              onPersonChange={setSelectedPersonId}
            />
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <CreditScoreCard 
                  selectedPersonId={selectedPersonId}
                  onScoreUpdate={handleScoreUpdate}
                />
                <LoanQualification selectedPersonId={selectedPersonId} />
                <ImprovementGuide />
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                <QuickActions 
                  onPaymentHistoryClick={handlePaymentHistoryClick}
                  onCreditCardUsageClick={handleCreditCardUsageClick}
                />
                <CreditHistory selectedPersonId={selectedPersonId} />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h2>
                <p className="text-gray-600">Take the first step towards better dental health with affordable financing</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Check Your Score</h3>
                  <p className="text-sm text-gray-600">Update and monitor your current credit score</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">2</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Improve Your Credit</h3>
                  <p className="text-sm text-gray-600">Follow our personalized improvement plan</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Financing</h3>
                  <p className="text-sm text-gray-600">Apply with qualified lenders for your procedure</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PeopleView />
        )}
          </>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2024 DentalCredit. Secure dental financing made simple.</p>
            <p className="mt-2">This is a demonstration application. Consult with real financial advisors for actual credit decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;