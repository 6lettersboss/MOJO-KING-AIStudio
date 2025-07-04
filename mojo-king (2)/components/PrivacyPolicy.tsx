import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <Card>
        <div className="prose prose-sm max-w-none text-gray-700">
          <h2 className="text-xl font-bold text-center text-gray-800">Privacy Policy</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Last Updated: [Date]</p>

          <p>Welcome to MOJO KING. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.</p>

          <h3 className="font-bold mt-4">1. Information We Collect</h3>
          <p>We may collect information about you in a variety of ways. The information we may collect via the Application includes:</p>
          <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, that you voluntarily give to us when you register with the Application.</li>
              <li><strong>User Profile Data:</strong> Self-reported data such as age, weight, height, lifestyle habits (exercise, sleep), and health information (conditions, medications).</li>
              <li><strong>Health Data:</strong> With your explicit permission, we access Heart Rate Variability (HRV) data from your device's health service (e.g., Apple HealthKit). We only read the latest HRV data and do not store historical health records on our servers.</li>
          </ul>

          <h3 className="font-bold mt-4">2. Use of Your Information</h3>
          <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:</p>
          <ul>
              <li>Create and manage your account.</li>
              <li>Generate your personalized MOJO KING analysis and report.</li>
              <li>Anonymously improve our AI models and services.</li>
              <li>Email you regarding your account or order.</li>
          </ul>

          <h3 className="font-bold mt-4">3. Disclosure of Your Information</h3>
          <p>We do not share, sell, rent or trade your personal information with any third parties for their commercial purposes.</p>

           <h3 className="font-bold mt-4">4. Security of Your Information</h3>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
          
           <h3 className="font-bold mt-4">5. Contact Us</h3>
          <p>If you have questions or comments about this Privacy Policy, please contact us at: [Contact Email]</p>
        </div>
        <div className="mt-8 text-center">
            <Button onClick={onBack} variant="secondary">Go Back</Button>
        </div>
    </Card>
  );
};

export default PrivacyPolicy;
