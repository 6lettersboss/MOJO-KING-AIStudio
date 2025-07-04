
import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <Card>
      <div className="text-center">
        <div className="mb-6">
            <span className="text-6xl">👑</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome to MOJO KING</h2>
        <p className="mt-2 text-gray-600">
          Estimate your vitality and social mojo based on your lifestyle and biometric signals.
        </p>
        <div className="mt-8">
          <Button onClick={onGetStarted} fullWidth>
            Get Started
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
