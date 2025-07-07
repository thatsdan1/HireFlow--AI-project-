export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  dateApplied: Date;
  notes?: string;
  resumeVersion?: string;
  coverLetter?: string;
}

export interface Resume {
  id: string;
  name: string;
  content: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePicture?: {
    url: string;
    publicId: string;
  };
  resume?: {
    url: string;
    publicId: string;
    fileName: string;
    uploadedAt: Date;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  resumes?: Resume[];
  applications?: Application[];
}

export type Theme = 'light' | 'dark' | 'night';

export interface ThemeColors {
  background: string;
  sidebar: string;
  card: string;
  header: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  button: string;
  buttonText: string;
  buttonHover: string;
  buttonSecondary: string;
  buttonSecondaryText: string;
  buttonSecondaryHover: string;
  accent: string;
  chatBubble: string;
  chatBubbleOwn: string;
  chatBubbleText: string;
  chatBubbleTextOwn: string;
  userMessage: string;
  userMessageBorder: string;
  aiMessage: string;
  input: string;
  inputBorder: string;
  focusRing: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
} 