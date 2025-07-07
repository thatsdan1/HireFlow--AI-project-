import React, { useState, useEffect } from 'react';
import { ThemeColors } from '../../types';
import ProfileSection from './ProfileSection';
import ResumeSection from './ResumeSection';
import SocialLinksSection from './SocialLinksSection';
import { User } from '../../types';

interface UserDashboardProps {
  user: User;
  colors: ThemeColors;
  onUpdateProfile: (data: Partial<User>) => void;
  onUploadProfilePicture: (file: File) => void;
  onUploadResume: (file: File) => void;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  colors,
  onUpdateProfile,
  onUploadProfilePicture,
  onUploadResume,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'resume' | 'social'>('profile');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'social', label: 'Social Links', icon: '🔗' }
  ] as const;

  return (
    <div className={`min-h-screen ${colors.background}`}>
      {/* Header */}
      <header className={`${colors.header} border-b ${colors.border} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl font-bold ${colors.textPrimary}`}>HireFlow</h1>
              <span className={`text-sm ${colors.textMuted}`}>Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
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
              
              <button
                onClick={onLogout}
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
        {/* Welcome Section */}
        <div className={`mb-8 p-6 ${colors.card} rounded-lg shadow-sm`}>
          <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-2`}>
            Welcome back, {user.firstName}! 👋
          </h2>
          <p className={`${colors.textMuted}`}>
            Manage your profile, upload your resume, and connect your social links to get the most out of HireFlow.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? `${colors.button} ${colors.buttonText}`
                    : `${colors.textMuted} hover:${colors.textPrimary} hover:${colors.card}`
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className={`${colors.card} rounded-lg shadow-sm overflow-hidden`}>
          {activeTab === 'profile' && (
            <ProfileSection />
          )}
          
          {activeTab === 'resume' && (
            <ResumeSection
              user={user}
              colors={colors}
              onUploadResume={onUploadResume}
              isLoading={isLoading}
            />
          )}
          
          {activeTab === 'social' && (
            <SocialLinksSection
              user={user}
              colors={colors}
              onUpdateProfile={onUpdateProfile}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 ${colors.card} rounded-lg shadow-sm`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${colors.accent} bg-opacity-10`}>
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${colors.textMuted}`}>Profile Completion</p>
                <p className={`text-2xl font-bold ${colors.textPrimary}`}>
                  {user.profilePicture && user.resume && user.socialLinks ? '100%' : '75%'}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${colors.card} rounded-lg shadow-sm`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${colors.accent} bg-opacity-10`}>
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${colors.textMuted}`}>Member Since</p>
                <p className={`text-2xl font-bold ${colors.textPrimary}`}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${colors.card} rounded-lg shadow-sm`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${colors.accent} bg-opacity-10`}>
                <span className="text-2xl">🔄</span>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${colors.textMuted}`}>Last Updated</p>
                <p className={`text-2xl font-bold ${colors.textPrimary}`}>
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard; 