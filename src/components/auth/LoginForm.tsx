import React, { useState } from 'react';
import { ThemeColors } from '../../types';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  colors: ThemeColors;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSwitchToRegister,
  colors,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData.email, formData.password);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={`p-8 ${colors.card} rounded-lg shadow-lg max-w-md w-full mx-auto`}>
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>Welcome Back</h2>
        <p className={`text-sm ${colors.textMuted}`}>Sign in to your HireFlow account</p>
      </div>

      {error && (
        <div className={`mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${colors.textPrimary} mb-2`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200 ${
              validationErrors.email ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium ${colors.textPrimary} mb-2`}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200 ${
              validationErrors.password ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 ${colors.button} ${colors.buttonText} rounded-lg ${colors.buttonHover} focus:outline-none ${colors.focusRing} focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className={`text-sm ${colors.textMuted}`}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className={`text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200`}
            disabled={isLoading}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 