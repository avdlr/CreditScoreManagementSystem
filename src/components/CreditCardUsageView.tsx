import React, { useState } from 'react';
import { ArrowLeft, CreditCard, ShoppingBag, Calendar, Filter, Search, TrendingUp, DollarSign } from 'lucide-react';
import { creditCardTransactions } from '../data/mockData';
import { CreditCardTransaction } from '../types';

interface CreditCardUsageViewProps {
  onBack: () => void;
}

const CreditCardUsageView: React.FC<CreditCardUsageViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'dining' | 'groceries' | 'gas' | 'shopping' | 'healthcare' | 'utilities' | 'entertainment' | 'travel' | 'other'>('all');
  const [filterTransactionType, setFilterTransactionType] = useState<'all' | 'purchase' | 'payment' | 'fee' | 'interest'>('all');
  const [filterCard, setFilterCard] = useState<'all' | '4521' | '7892' | '9876' | '1234'>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dining': return '🍽️';
      case 'groceries': return '🛒';
      case 'gas': return '⛽';
      case 'shopping': return '🛍️';
      case 'healthcare': return '🏥';
      case 'utilities': return '💡';
      case 'entertainment': return '🎬';
      case 'travel': return '✈️';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dining': return 'text-orange-600 bg-orange-100';
      case 'groceries': return 'text-green-600 bg-green-100';
      case 'gas': return 'text-blue-600 bg-blue-100';
      case 'shopping': return 'text-purple-600 bg-purple-100';
      case 'healthcare': return 'text-red-600 bg-red-100';
      case 'utilities': return 'text-yellow-600 bg-yellow-100';
      case 'entertainment': return 'text-pink-600 bg-pink-100';
      case 'travel': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'payment': return 'text-green-600 bg-green-100 border-green-200';
      case 'fee': return 'text-red-600 bg-red-100 border-red-200';
      case 'interest': return 'text-orange-600 bg-orange-100 border-orange-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCardName = (lastFour: string) => {
    switch (lastFour) {
      case '4521': return 'Chase Sapphire Preferred';
      case '7892': return 'Capital One Venture';
      case '9876': return 'Discover It';
      case '1234': return 'American Express Gold';
      default: return 'Unknown Card';
    }
  };

  const filteredTransactions = creditCardTransactions.filter(transaction => {
    const matchesSearch = transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.cardLastFour.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    const matchesType = filterTransactionType === 'all' || transaction.transactionType === filterTransactionType;
    const matchesCard = filterCard === 'all' || transaction.cardLastFour === filterCard;
    
    return matchesSearch && matchesCategory && matchesType && matchesCard;
  }).sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

  const totalSpent = filteredTransactions
    .filter(t => t.transactionType === 'purchase')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalPayments = filteredTransactions
    .filter(t => t.transactionType === 'payment')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const categorySpending = filteredTransactions
    .filter(t => t.transactionType === 'purchase')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const topCategory = Object.entries(categorySpending).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Credit Card Usage</h1>
                <p className="text-gray-600">Monitor your spending patterns and transaction history</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{filteredTransactions.length}</div>
                <div className="text-sm text-blue-700">Total Transactions</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">${totalSpent.toLocaleString()}</div>
                <div className="text-sm text-red-700">Total Spent</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">${totalPayments.toLocaleString()}</div>
                <div className="text-sm text-green-700">Total Payments</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {topCategory ? getCategoryIcon(topCategory[0]) : '📊'}
                </div>
                <div className="text-sm text-purple-700">
                  {topCategory ? `Top: ${topCategory[0]}` : 'No Data'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search merchant or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="dining">Dining</option>
                <option value="groceries">Groceries</option>
                <option value="gas">Gas</option>
                <option value="shopping">Shopping</option>
                <option value="healthcare">Healthcare</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>
            </div>

            <select
              value={filterTransactionType}
              onChange={(e) => setFilterTransactionType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="purchase">Purchases</option>
              <option value="payment">Payments</option>
              <option value="fee">Fees</option>
              <option value="interest">Interest</option>
            </select>

            <select
              value={filterCard}
              onChange={(e) => setFilterCard(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Cards</option>
              <option value="4521">Chase Sapphire (4521)</option>
              <option value="7892">Capital One (7892)</option>
              <option value="9876">Discover It (9876)</option>
              <option value="1234">Amex Gold (1234)</option>
            </select>
          </div>
        </div>

        {/* Category Spending Overview */}
        {Object.keys(categorySpending).length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Spending by Category</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.entries(categorySpending)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([category, amount]) => (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
                  <div className="text-lg font-bold text-gray-900">${amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 capitalize">{category}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getCategoryIcon(transaction.category)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{transaction.merchantName}</h3>
                      <p className="text-sm text-gray-500">{transaction.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTransactionTypeColor(transaction.transactionType)}`}>
                        {transaction.transactionType.charAt(0).toUpperCase() + transaction.transactionType.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      transaction.transactionType === 'payment' ? 'text-green-600' : 
                      transaction.transactionType === 'fee' || transaction.transactionType === 'interest' ? 'text-red-600' : 
                      'text-gray-900'
                    }`}>
                      {transaction.transactionType === 'payment' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.transactionDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {getCardName(transaction.cardLastFour)} ending in {transaction.cardLastFour}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(transaction.transactionDate).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardUsageView;