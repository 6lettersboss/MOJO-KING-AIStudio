import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <Card>
        <div className="prose prose-sm max-w-none text-gray-700">
          <h2 className="text-xl font-bold text-center text-gray-800">Terms of Service</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Last Updated: [Date]</p>
          
          <h3 className="font-bold mt-4">1. Agreement to Terms</h3>
          <p>By using our mobile application, MOJO KING, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the Application.</p>

          <h3 className="font-bold mt-4">2. Medical Disclaimer</h3>
          <p>MOJO KING is not a medical device. The information, including but not limited to, text, graphics, images and other material contained on this application are for informational and entertainment purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment.</p>

          <h3 className="font-bold mt-4">3. User Accounts</h3>
          <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

          <h3 className="font-bold mt-4">4. Subscriptions</h3>
          <p>Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Subscriptions automatically renew unless canceled.</p>

          <h3 className="font-bold mt-4">5. Termination</h3>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          
          <h3 className="font-bold mt-4">6. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us at: [Contact Email]</p>

        </div>
        <div className="mt-8 text-center">
            <Button onClick={onBack} variant="secondary">Go Back</Button>
        </div>
    </Card>
  );
};

export default TermsOfService;
