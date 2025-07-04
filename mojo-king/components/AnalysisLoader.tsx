
import React from 'react';
import { Card } from './ui/Card';

const AnalysisLoader: React.FC = () => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🧬</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Analyzing Your Mojo...</h2>
          <p className="mt-2 text-gray-600">Our AI is computing your personalized report. This won't take long.</p>
        </div>
      </div>
    </Card>
  );
};

export default AnalysisLoader;
