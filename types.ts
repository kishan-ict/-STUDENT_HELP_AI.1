export type ViewState = 
  | 'LANDING'
  | 'AUTH_LOGIN'
  | 'AUTH_ONBOARDING_1' // Education
  | 'AUTH_ONBOARDING_2' // Interests
  | 'AUTH_ONBOARDING_3' // Goals
  | 'DASHBOARD'
  | 'MODULE_STUDY'
  | 'MODULE_WELLNESS'
  | 'MODULE_RESUME'
  | 'MODULE_PROJECT'
  | 'MODULE_CYBER'
  | 'MODULE_PROFILE';

export interface UserProfile {
  name: string;
  education: 'Diploma' | 'Engineering' | null;
  interests: string[];
  goalYear: number;
}

export enum NexusStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  STREAMING = 'STREAMING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
