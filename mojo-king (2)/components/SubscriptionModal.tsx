
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribe: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSubscribe }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribeClick = () => {
    setIsLoading(true);
    // Simulate API call to Stripe
    setTimeout(() => {
      setIsLoading(false);
      onSubscribe();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md">
        <Card>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-orange-500">Go Premium</h2>
            <p className="mt-2 text-gray-600">Unlock your full potential with MOJO KING Premium.</p>
          </div>
          
          <div className="mt-6 bg-orange-50 border border-orange-200 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-800">Premium Plan</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Full Detailed Analysis
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Export & Share Results
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Historical Trend Tracking (Coming Soon)
              </li>
               <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Personalized Recommendations
              </li>
            </ul>
            <div className="mt-6 text-center">
                <p className="text-4xl font-black text-gray-900">$9.99<span className="text-base font-medium text-gray-500">/month</span></p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button onClick={handleSubscribeClick} fullWidth disabled={isLoading}>
              {isLoading ? (
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Subscribe with Stripe'}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">This is a simulated payment. No real transaction will occur.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionModal;
