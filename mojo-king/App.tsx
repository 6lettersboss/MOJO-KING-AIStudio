
import React, { useState, useCallback } from 'react';
import { AppState, UserProfile, MojoResult, FullUserProfile, HrvData } from './types';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import ConnectDevice from './components/ConnectDevice';
import AnalysisLoader from './components/AnalysisLoader';
import ResultsDisplay from './components/ResultsDisplay';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { generateMojoReport } from './services/geminiService';
import { useAuth } from './context/AuthContext';
import { saveUserProfile } from './services/firestoreService';

function App() {
  const { user, loading } = useAuth();
  const [appState, setAppState] = useState<AppState>(AppState.Form);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hrvData, setHrvData] = useState<HrvData | null>(null);
  const [mojoResult, setMojoResult] = useState<MojoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = async (profile: UserProfile) => {
    if (!user) {
      setError("You must be logged in to save a profile.");
      return;
    }
    try {
      await saveUserProfile(user.uid, profile);
      setUserProfile(profile);
      setAppState(AppState.ConnectingDevice);
    } catch (e) {
      console.error("Failed to save profile:", e);
      setError("Could not save your profile. Please try again.");
    }
  };
  
  const handleSyncComplete = (data: HrvData) => {
    setHrvData(data);
    setError(null); // Clear previous errors on successful sync
  };

  const handleRequestAnalysis = useCallback(async () => {
    if (!userProfile || !hrvData) {
      setError("User profile or HRV data is missing.");
      setAppState(AppState.Form);
      return;
    }

    setAppState(AppState.Analyzing);
    setError(null);

    const fullProfile: FullUserProfile = {
      ...userProfile,
      hrvData: hrvData,
    };

    try {
      const result = await generateMojoReport(fullProfile);
      setMojoResult(result);
      setAppState(AppState.Results);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate your report. ${errorMessage}`);
      setAppState(AppState.ConnectingDevice); // Go back to device screen on error
    }
  }, [userProfile, hrvData]);
  
  const handleRestart = () => {
    setAppState(AppState.Form);
    setUserProfile(null);
    setHrvData(null);
    setMojoResult(null);
    setError(null);
  };
  
  const renderMainContent = () => {
    switch (appState) {
      case AppState.Form:
        return <ProfileForm onSubmit={handleProfileSubmit} />;
      case AppState.ConnectingDevice:
        return <ConnectDevice onSyncComplete={handleSyncComplete} onAnalyze={handleRequestAnalysis} syncedData={hrvData} error={error} />;
      case AppState.Analyzing:
        return <AnalysisLoader />;
      case AppState.Results:
        return mojoResult ? <ResultsDisplay result={mojoResult} onRestart={handleRestart} /> : <AnalysisLoader />;
      case AppState.PrivacyPolicy:
        return <PrivacyPolicy onBack={() => setAppState(AppState.Form)} />;
      case AppState.TermsOfService:
        return <TermsOfService onBack={() => setAppState(AppState.Form)} />;
      default:
        return <ProfileForm onSubmit={handleProfileSubmit} />;
    }
  };

  const renderContent = () => {
    if (!user) {
      if (appState === AppState.PrivacyPolicy) {
        return <PrivacyPolicy onBack={() => setAppState(AppState.Form)} />;
      }
      if (appState === AppState.TermsOfService) {
        return <TermsOfService onBack={() => setAppState(AppState.Form)} />;
      }
      return <Login onNavigate={(to) => setAppState(to)} />;
    }
    return renderMainContent();
  };
  
  const AppSkeleton = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-50 min-h-screen text-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-black text-orange-500 tracking-tight">MOJO KING</h1>
          <p className="text-gray-500 mt-1">Unlock Your Primal Potential</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );

  if (loading) {
    return (
        <AppSkeleton>
            <div className="flex justify-center items-center p-10">
                <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </AppSkeleton>
    );
  }

  return (
    <AppSkeleton>
      {renderContent()}
    </AppSkeleton>
  );
}

export default App;
