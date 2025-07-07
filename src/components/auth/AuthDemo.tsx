import React, { useState } from 'react';
import { ThemeColors } from '../../types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthDemoProps {
  colors: ThemeColors;
  onLogin: (user: any) => void;
}

const AuthDemo: React.FC<AuthDemoProps> = ({ colors, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - accept any email/password combination
      const mockUser = {
        id: '1',
        email,
        firstName: 'Demo',
        lastName: 'User',
        profilePicture: {
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          publicId: 'demo-profile'
        },
        socialLinks: {},
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      onLogin(mockUser);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo registration - create mock user
      const mockUser = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        socialLinks: {},
        isEmailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      onLogin(mockUser);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${colors.background} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Demo Info */}
        <div className={`mb-8 p-4 ${colors.card} rounded-lg border ${colors.border}`}>
          <h2 className={`text-lg font-semibold ${colors.textPrimary} mb-2`}>
            🎯 Demo Mode
          </h2>
          <p className={`text-sm ${colors.textMuted} mb-3`}>
            This is a frontend-only demonstration with mock data.
          </p>
          <div className={`text-xs ${colors.textMuted} space-y-1`}>
            <p>• <strong>Login:</strong> Use any email and password</p>
            <p>• <strong>Register:</strong> Creates a new mock user</p>
            <p>• <strong>Data:</strong> Stored in browser memory only</p>
            <p>• <strong>Files:</strong> Uploads are simulated</p>
          </div>
        </div>

        {/* Auth Forms */}
        {isLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setIsLogin(false)}
            colors={colors}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setIsLogin(true)}
            colors={colors}
            isLoading={isLoading}
            error={error}
          />
        )}

        {/* Quick Demo Login */}
        <div className={`mt-6 p-4 ${colors.card} rounded-lg border ${colors.border}`}>
          <h3 className={`text-sm font-medium ${colors.textPrimary} mb-2`}>
            Quick Demo Login
          </h3>
          <button
            onClick={() => handleLogin('demo@hireflow.com', 'demo123')}
            disabled={isLoading}
            className={`w-full py-2 px-4 ${colors.buttonSecondary} ${colors.buttonSecondaryText} rounded-md ${colors.buttonSecondaryHover} focus:outline-none ${colors.focusRing} disabled:opacity-50 transition-colors duration-200`}
          >
            Login as Demo User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo; 