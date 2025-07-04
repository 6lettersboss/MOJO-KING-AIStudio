export enum AppState {
  Form,
  ConnectingDevice,
  Analyzing,
  Results,
  PrivacyPolicy,
  TermsOfService,
}

export interface AuthenticatedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface HrvData {
  sdnn: number;
  avgRmssd: number;
  timestamp: string;
}

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  lifestyle: {
    exercise: string;
    sleepHours: number;
    stressLevel: 'low' | 'medium' | 'high';
  };
  health: {
    conditions: string;
    medications: string;
  };
}

export interface FullUserProfile extends UserProfile {
    hrvData: {
        avgRmssd: number;
        sdnn: number;
    }
}

export interface MojoResult {
  archetype: 'The Magnetic Leader' | 'The Charismatic Connector' | 'The Adventurous Explorer' | 'The Steadfast Guardian';
  mojoScore: number;
  title: string;
  summary: string;
  detailedAnalysis: Array<{
    area: string;
    feedback: string;
  }>;
}
