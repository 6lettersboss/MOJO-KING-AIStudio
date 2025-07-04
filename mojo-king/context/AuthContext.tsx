import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase/config';
import { AuthenticatedUser } from '../types';

interface AuthContextType {
  user: AuthenticatedUser | null;
  loading: boolean;
  loginWithProvider: (provider: firebase.auth.AuthProvider) => Promise<firebase.User | void>;
  loginWithEmail: (email: string, pass: string) => Promise<firebase.User | void>;
  signupWithEmail: (email: string, pass: string) => Promise<firebase.User | void>;
  mockKakaoLogin: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithProvider = async (provider: firebase.auth.AuthProvider) => {
    try {
      const result = await auth.signInWithPopup(provider);
      return result.user ?? undefined;
    } catch (error) {
      console.error(`Error with provider login:`, error);
    }
  };
  
  const loginWithEmail = async (email: string, pass: string) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, pass);
        return userCredential.user ?? undefined;
    } catch(error) {
        console.error("Error logging in with email:", error);
        throw error;
    }
  }
  
  const signupWithEmail = async (email: string, pass: string) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
        return userCredential.user ?? undefined;
    } catch(error) {
        console.error("Error signing up with email:", error);
        throw error;
    }
  }
  
  const mockKakaoLogin = () => {
    setLoading(true);
    setTimeout(() => {
        // This is a mock user object. In a real scenario, you would
        // use a custom token from your backend server that has verified a Kakao login.
        const mockUser = {
            uid: 'kakao-mock-uid-12345',
            email: 'kakao-user@mock.com',
            displayName: 'Kakao User'
        }
        setUser(mockUser);
        setLoading(false);
    }, 1000);
  }

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    loading,
    loginWithProvider,
    loginWithEmail,
    signupWithEmail,
    mockKakaoLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};