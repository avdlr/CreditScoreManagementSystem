import React from 'react';
import { Calendar, CreditCard, Bell, MessageSquare } from 'lucide-react';

interface QuickActionsProps {
  onPaymentHistoryClick: () => void;
  onCreditCardUsageClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onPaymentHistoryClick, onCreditCardUsageClick }) => {
  const actions = [
    {
      icon: Calendar,
      title: 'Payment History',
      description: 'View all payment records',
      color: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
      onClick: onPaymentHistoryClick
    },
    {
      icon: CreditCard,
      title: 'Credit Card Usage',
      description: 'Track spending patterns',
      color: 'text-green-600 bg-green-100 hover:bg-green-200',
      onClick: onCreditCardUsageClick
    },
    {
      icon: Bell,
      title: 'Set Alerts',
      description: 'Monitor score changes',
      color: 'text-orange-600 bg-orange-100 hover:bg-orange-200',
      onClick: () => {}
    },
    {
      icon: MessageSquare,
      title: 'Expert Advice',
      description: 'Speak with counselor',
      color: 'text-purple-600 bg-purple-100 hover:bg-purple-200',
      onClick: () => {}
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md ${action.color}`}
          >
            <action.icon className="w-6 h-6 mb-2" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-sm">{action.title}</div>
              <div className="text-xs text-gray-600">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;