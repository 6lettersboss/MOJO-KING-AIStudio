import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { GoogleIcon } from './icons/GoogleIcon';
import { AppleIcon } from './icons/AppleIcon';
import { KakaoIcon } from './icons/KakaoIcon';
import { AppState } from '../types';

interface LoginProps {
    onNavigate: (state: AppState.PrivacyPolicy | AppState.TermsOfService) => void;
}


const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { loginWithEmail, signupWithEmail, mockGoogleLogin, mockAppleLogin, mockKakaoLogin } = useAuth();
    
    const handleSocialLogin = async (providerName: 'google' | 'apple' | 'kakao') => {
        setError(null);
        setLoading(true);
        try {
            if (providerName === 'google') {
                await mockGoogleLogin();
            } else if (providerName === 'apple') {
                await mockAppleLogin();
            } else if (providerName === 'kakao') {
                await mockKakaoLogin();
            }
        } catch(e) {
            setError('Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (isLoginView) {
                await loginWithEmail(email, password);
            } else {
                await signupWithEmail(email, password);
            }
        } catch (e: any) {
            if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
              setError('Invalid email or password.');
            } else if (e.code === 'auth/email-already-in-use') {
              setError('An account with this email already exists.');
            } else {
              setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

  return (
    <Card>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isLoginView ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-gray-500 mt-1">Sign in to continue to MOJO KING</p>
      </div>

      {error && <p className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
      
      <form onSubmit={handleEmailAuth} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5"
            required
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength={6}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2.5"
            required
          />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
          </Button>
      </form>

      <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
      </div>
      
      <div className="space-y-3">
        <Button variant="secondary" fullWidth onClick={() => handleSocialLogin('google')} disabled={loading} className="flex items-center justify-center gap-2">
          <GoogleIcon className="w-5 h-5" /> Continue with Google
        </Button>
        <Button variant="secondary" fullWidth onClick={() => handleSocialLogin('apple')} disabled={loading} className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800">
          <AppleIcon className="w-5 h-5" /> Continue with Apple
        </Button>
        <Button variant="secondary" fullWidth onClick={() => handleSocialLogin('kakao')} disabled={loading} className="flex items-center justify-center gap-2 bg-[#FEE500] text-black hover:bg-yellow-400">
          <KakaoIcon className="w-5 h-5" /> Continue with KakaoTalk
        </Button>
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-500">
        {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
        <button onClick={() => { setIsLoginView(!isLoginView); setError(null);}} className="font-medium text-orange-600 hover:text-orange-500">
          {isLoginView ? 'Sign up' : 'Login'}
        </button>
      </p>

      <div className="mt-6 text-center text-xs text-gray-400">
          By continuing, you agree to our<br/>
          <button onClick={() => onNavigate(AppState.TermsOfService)} className="underline hover:text-gray-600">Terms of Service</button>
          {' '}and{' '} 
          <button onClick={() => onNavigate(AppState.PrivacyPolicy)} className="underline hover:text-gray-600">Privacy Policy</button>.
      </div>

    </Card>
  );
};

export default Login;