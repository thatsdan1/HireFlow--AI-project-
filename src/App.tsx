import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { ThemeColors, User, Message, Application } from './types';
import AuthDemo from './components/auth/AuthDemo';
import UserDashboard from './components/dashboard/UserDashboard';
import ChatInterface from './components/ChatInterface';
import ApplicationTracker from './components/ApplicationTracker';
import ResumeBuilder from './components/ResumeBuilder';
import JobDescriptionInput from './components/JobDescriptionInput';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const { theme, colors, toggleTheme, setSpecificTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'resume'>('dashboard');

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey there!👋 I'm Hiree, your AI career buddy 🥸 I'm here to help you craft the perfect resume, tailor it for any job posting, and keep track of your applications like a pro. So, what are we tackling today? 📄💼✨",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);

  // Update greeting when user logs in
  useEffect(() => {
    if (user && messages.length && messages[0].sender === 'ai') {
      setMessages(prev => [
        {
          ...prev[0],
          content: `Hey ${user.firstName}!👋 I'm Hiree, your AI career buddy 🥸 I'm here to help you craft the perfect resume, tailor it for any job posting, and keep track of your applications like a pro. So, what are we tackling today? 📄💼✨`
        },
        ...prev.slice(1)
      ]);
    }
  }, [user]);

  // Applications state
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      company: 'Google',
      role: 'Software Engineer',
      dateApplied: new Date('2024-01-15'),
      status: 'applied',
    },
    {
      id: '2',
      company: 'Microsoft',
      role: 'Frontend Developer',
      dateApplied: new Date('2024-01-10'),
      status: 'interview',
    },
    {
      id: '3',
      company: 'Apple',
      role: 'iOS Developer',
      dateApplied: new Date('2024-01-05'),
      status: 'rejected',
    }
  ]);

  // Check for existing user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleUpdateProfile = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data, updatedAt: new Date() };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const handleUploadProfilePicture = async (file: File) => {
    if (user) {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&t=${Date.now()}`;
      const updatedUser = {
        ...user,
        profilePicture: { url: mockUrl, publicId: `profile-${Date.now()}` },
        updatedAt: new Date()
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const handleUploadResume = async (file: File) => {
    if (user) {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUrl = `https://example.com/resume-${Date.now()}.pdf`;
      const updatedUser = {
        ...user,
        resume: {
          url: mockUrl,
          publicId: `resume-${Date.now()}`,
          fileName: file.name,
          uploadedAt: new Date()
        },
        updatedAt: new Date()
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Chat handlers
  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, aiMessage]);

    // Simulate API call delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessage.id 
          ? { ...msg, content: "I understand you want to work on that. Let me help you with that!", isLoading: false }
          : msg
      ));
    }, 2000);
  };

  const handleUpdateApplicationStatus = (applicationId: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const handleAddApplication = (application: Omit<Application, 'id'>) => {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
    };
    setApplications(prev => [...prev, newApplication]);
  };

  // Resume builder handlers
  const handleTemplateSelect = (template: any) => {
    console.log('Selected template:', template);
    // In a real app, this would save the template selection
  };

  // Job description handlers
  const handleAnalyzeJobDescription = async (jobDescription: string) => {
    console.log('Analyzing job description:', jobDescription);
    // In a real app, this would send to AI for analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSaveJobDescription = (jobDescription: string) => {
    console.log('Saving job description:', jobDescription);
    // In a real app, this would save to user's saved job descriptions
  };

  // If no user is logged in, show authentication
  if (!user) {
    return <AuthDemo colors={colors} onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen ${colors.background} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${colors.header} border-b ${colors.border} shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl font-bold ${colors.textPrimary}`}>HireFlow</h1>
              <span className={`text-sm ${colors.textMuted}`}>AI Job Assistant</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Navigation */}
              <nav className="hidden md:flex space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentView === 'dashboard'
                      ? `${colors.button} ${colors.buttonText}`
                      : `${colors.textMuted} hover:${colors.textPrimary} hover:${colors.card}`
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('chat')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentView === 'chat'
                      ? `${colors.button} ${colors.buttonText}`
                      : `${colors.textMuted} hover:${colors.textPrimary} hover:${colors.card}`
                  }`}
                >
                  AI Chat
                </button>
                <button
                  onClick={() => setCurrentView('resume')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentView === 'resume'
                      ? `${colors.button} ${colors.buttonText}`
                      : `${colors.textMuted} hover:${colors.textPrimary} hover:${colors.card}`
                  }`}
                >
                  Resume Builder
                </button>
              </nav>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                {user.profilePicture?.url ? (
                  <img
                    src={user.profilePicture.url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-8 h-8 rounded-full ${colors.accent} flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                )}
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${colors.textPrimary}`}>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className={`text-xs ${colors.textMuted}`}>{user.email}</p>
                </div>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle 
                theme={theme}
                onToggle={toggleTheme}
                onSetTheme={setSpecificTheme}
              />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`px-3 py-1 text-sm ${colors.buttonSecondary} ${colors.buttonSecondaryText} rounded-md ${colors.buttonSecondaryHover} transition-colors duration-200`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <UserDashboard
            user={user}
            colors={colors}
            onUpdateProfile={handleUpdateProfile}
            onUploadProfilePicture={handleUploadProfilePicture}
            onUploadResume={handleUploadResume}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <ChatInterface 
                messages={messages}
                onSendMessage={handleSendMessage}
                colors={colors}
              />
            </div>
            <div className="lg:col-span-1">
              <ApplicationTracker 
                applications={applications}
                onUpdateStatus={handleUpdateApplicationStatus}
                onAddApplication={handleAddApplication}
                colors={colors}
              />
            </div>
          </div>
        )}

        {currentView === 'resume' && (
          <div className="space-y-6">
            <ResumeBuilder onTemplateSelect={handleTemplateSelect} />
            <JobDescriptionInput 
              onAnalyze={handleAnalyzeJobDescription}
              onSave={handleSaveJobDescription}
            />
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center p-2 rounded-lg ${
              currentView === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <span className="text-lg">🏠</span>
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentView('chat')}
            className={`flex flex-col items-center p-2 rounded-lg ${
              currentView === 'chat' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <span className="text-lg">💬</span>
            <span className="text-xs">Chat</span>
          </button>
          <button
            onClick={() => setCurrentView('resume')}
            className={`flex flex-col items-center p-2 rounded-lg ${
              currentView === 'resume' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <span className="text-lg">📄</span>
            <span className="text-xs">Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;