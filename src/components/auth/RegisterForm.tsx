import React, { useState } from 'react';
import { ThemeColors } from '../../types';

interface RegisterFormProps {
  onRegister: (userData: RegisterData) => void;
  onSwitchToLogin: () => void;
  colors: ThemeColors;
  isLoading?: boolean;
  error?: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  onSwitchToLogin,
  colors,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // First name validation
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters long';
    } else if (formData.firstName.length > 50) {
      errors.firstName = 'First name cannot exceed 50 characters';
    }

    // Last name validation
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters long';
    } else if (formData.lastName.length > 50) {
      errors.lastName = 'Last name cannot exceed 50 characters';
    }

    // Phone number validation (optional)
    if (formData.phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
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
        <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>Create Account</h2>
        <p className={`text-sm ${colors.textMuted}`}>Join HireFlow to start your career journey</p>
      </div>

      {error && (
        <div className={`mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={`block text-sm font-medium ${colors.textPrimary} mb-2`}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200 ${
                validationErrors.firstName ? 'border-red-500' : ''
              }`}
              placeholder="First name"
              disabled={isLoading}
            />
            {validationErrors.firstName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className={`block text-sm font-medium ${colors.textPrimary} mb-2`}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200 ${
                validationErrors.lastName ? 'border-red-500' : ''
              }`}
              placeholder="Last name"
              disabled={isLoading}
            />
            {validationErrors.lastName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
            )}
          </div>
        </div>

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
          <label htmlFor="phoneNumber" className={`block text-sm font-medium ${colors.textPrimary} mb-2`}>
            Phone Number <span className={`text-xs ${colors.textMuted}`}>(Optional)</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200 ${
              validationErrors.phoneNumber ? 'border-red-500' : ''
            }`}
            placeholder="Enter your phone number"
            disabled={isLoading}
          />
          {validationErrors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>
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
            placeholder="Create a strong password"
            disabled={isLoading}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
          )}
          <p className={`text-xs ${colors.textMuted} mt-1`}>
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 ${colors.button} ${colors.buttonText} rounded-lg ${colors.buttonHover} focus:outline-none ${colors.focusRing} focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className={`text-sm ${colors.textMuted}`}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className={`text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200`}
            disabled={isLoading}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 