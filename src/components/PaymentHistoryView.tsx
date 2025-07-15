import React, { useState } from 'react';
import { ArrowLeft, Calendar, CreditCard, DollarSign, AlertTriangle, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { paymentHistory } from '../data/mockData';
import { PaymentHistoryEntry } from '../types';

interface PaymentHistoryViewProps {
  onBack: () => void;
}

const PaymentHistoryView: React.FC<PaymentHistoryViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'on_time' | 'late' | 'missed'>('all');
  const [filterAccountType, setFilterAccountType] = useState<'all' | 'credit_card' | 'mortgage' | 'auto_loan' | 'student_loan' | 'personal_loan'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time': return 'text-green-600 bg-green-100 border-green-200';
      case 'late': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'missed': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_time': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertTriangle className="w-4 h-4" />;
      case 'missed': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'credit_card': return 'Credit Card';
      case 'mortgage': return 'Mortgage';
      case 'auto_loan': return 'Auto Loan';
      case 'student_loan': return 'Student Loan';
      case 'personal_loan': return 'Personal Loan';
      default: return type;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'credit_card': return 'text-blue-600 bg-blue-100';
      case 'mortgage': return 'text-purple-600 bg-purple-100';
      case 'auto_loan': return 'text-green-600 bg-green-100';
      case 'student_loan': return 'text-orange-600 bg-orange-100';
      case 'personal_loan': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesSearch = payment.creditorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.accountNumber.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || payment.paymentStatus === filterStatus;
    const matchesAccountType = filterAccountType === 'all' || payment.accountType === filterAccountType;
    
    return matchesSearch && matchesStatus && matchesAccountType;
  }).sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.paymentAmount, 0);
  const onTimePayments = filteredPayments.filter(p => p.paymentStatus === 'on_time').length;
  const onTimePercentage = filteredPayments.length > 0 ? Math.round((onTimePayments / filteredPayments.length) * 100) : 0;

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
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
                <p className="text-gray-600">Track your payment performance across all accounts</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{filteredPayments.length}</div>
                <div className="text-sm text-blue-700">Total Payments</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{onTimePercentage}%</div>
                <div className="text-sm text-green-700">On-Time Rate</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">${totalPayments.toLocaleString()}</div>
                <div className="text-sm text-purple-700">Total Amount</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {filteredPayments.filter(p => p.paymentStatus === 'late' || p.paymentStatus === 'missed').length}
                </div>
                <div className="text-sm text-orange-700">Late/Missed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search creditor or account..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="on_time">On Time</option>
                <option value="late">Late</option>
                <option value="missed">Missed</option>
              </select>
            </div>

            <select
              value={filterAccountType}
              onChange={(e) => setFilterAccountType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Account Types</option>
              <option value="credit_card">Credit Cards</option>
              <option value="mortgage">Mortgage</option>
              <option value="auto_loan">Auto Loans</option>
              <option value="student_loan">Student Loans</option>
              <option value="personal_loan">Personal Loans</option>
            </select>
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-4">
          {filteredPayments.map(payment => (
            <div key={payment.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{payment.creditorName}</h3>
                        <p className="text-sm text-gray-500">Account: {payment.accountNumber}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccountTypeColor(payment.accountType)}`}>
                      {getAccountTypeLabel(payment.accountType)}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${payment.paymentAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(payment.paymentDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Minimum Due:</span>
                    <div className="text-lg font-semibold text-gray-900">${payment.minimumDue.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Account Balance:</span>
                    <div className="text-lg font-semibold text-gray-900">${payment.accountBalance.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Payment Status:</span>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.paymentStatus)}`}>
                      {getStatusIcon(payment.paymentStatus)}
                      <span className="capitalize">{payment.paymentStatus.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div>
                    {payment.daysLate && (
                      <>
                        <span className="text-sm font-medium text-gray-700">Days Late:</span>
                        <div className="text-lg font-semibold text-red-600">{payment.daysLate}</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Payment Analysis */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {payment.paymentAmount >= payment.minimumDue 
                          ? payment.paymentAmount > payment.minimumDue 
                            ? `Paid $${(payment.paymentAmount - payment.minimumDue).toLocaleString()} above minimum`
                            : 'Minimum payment made'
                          : `$${(payment.minimumDue - payment.paymentAmount).toLocaleString()} below minimum payment`
                        }
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Utilization: {payment.accountType === 'credit_card' ? 
                        `${Math.round((payment.accountBalance / 5000) * 100)}%` : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryView;