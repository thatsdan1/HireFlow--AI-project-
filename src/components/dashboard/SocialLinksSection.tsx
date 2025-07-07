import React, { useState } from 'react';
import { ThemeColors, User } from '../../types';

interface SocialLinksSectionProps {
  user: User;
  colors: ThemeColors;
  onUpdateProfile: (data: Partial<User>) => void;
  isLoading?: boolean;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  user,
  colors,
  onUpdateProfile,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    github: user.socialLinks?.github || '',
    linkedin: user.socialLinks?.linkedin || '',
    portfolio: user.socialLinks?.portfolio || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (formData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+$/.test(formData.github)) {
      errors.github = 'Please enter a valid GitHub URL';
    }

    if (formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+$/.test(formData.linkedin)) {
      errors.linkedin = 'Please enter a valid LinkedIn URL';
    }

    if (formData.portfolio && !/^https?:\/\/.+/.test(formData.portfolio)) {
      errors.portfolio = 'Please enter a valid portfolio URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateProfile({
        socialLinks: {
          github: formData.github.trim() || undefined,
          linkedin: formData.linkedin.trim() || undefined,
          portfolio: formData.portfolio.trim() || undefined
        }
      });
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    setFormData({
      github: user.socialLinks?.github || '',
      linkedin: user.socialLinks?.linkedin || '',
      portfolio: user.socialLinks?.portfolio || ''
    });
    setValidationErrors({});
    setIsEditing(false);
  };

  const socialPlatforms = [
    {
      name: 'github',
      label: 'GitHub',
      icon: '🐙',
      placeholder: 'https://github.com/username',
      description: 'Showcase your code and projects'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      icon: '💼',
      placeholder: 'https://linkedin.com/in/username',
      description: 'Connect with professionals and recruiters'
    },
    {
      name: 'portfolio',
      label: 'Portfolio',
      icon: '🎨',
      placeholder: 'https://your-portfolio.com',
      description: 'Display your work and achievements'
    }
  ] as const;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-semibold ${colors.textPrimary}`}>Social Links</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className={`px-3 py-1 text-sm ${colors.button} ${colors.buttonText} rounded-md ${colors.buttonHover} transition-colors duration-200`}
          >
            Edit Links
          </button>
        )}
      </div>

      <div className="space-y-6">
        {socialPlatforms.map((platform) => (
          <div key={platform.name} className={`p-6 ${colors.card} rounded-lg border ${colors.border}`}>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">{platform.icon}</div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-medium ${colors.textPrimary}`}>
                    {platform.label}
                  </h4>
                  {user.socialLinks?.[platform.name] && !isEditing && (
                    <a
                      href={user.socialLinks[platform.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs ${colors.textMuted} hover:${colors.textPrimary} transition-colors duration-200`}
                    >
                      View Profile →
                    </a>
                  )}
                </div>
                
                <p className={`text-xs ${colors.textMuted} mb-3`}>
                  {platform.description}
                </p>

                {isEditing ? (
                  <div>
                    <input
                      type="url"
                      name={platform.name}
                      value={formData[platform.name]}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200 ${
                        validationErrors[platform.name] ? 'border-red-500' : ''
                      }`}
                      placeholder={platform.placeholder}
                    />
                    {validationErrors[platform.name] && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors[platform.name]}</p>
                    )}
                  </div>
                ) : (
                  <div className={`px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg ${colors.textMuted}`}>
                    {user.socialLinks?.[platform.name] || 'Not added yet'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isEditing && (
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-4 py-2 ${colors.button} ${colors.buttonText} rounded-md ${colors.buttonHover} focus:outline-none ${colors.focusRing} disabled:opacity-50 transition-colors duration-200`}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className={`px-4 py-2 ${colors.buttonSecondary} ${colors.buttonSecondaryText} rounded-md ${colors.buttonSecondaryHover} focus:outline-none ${colors.focusRing} disabled:opacity-50 transition-colors duration-200`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8">
        <div className={`p-4 ${colors.card} border ${colors.border} rounded-lg`}>
          <h4 className={`text-sm font-medium ${colors.textPrimary} mb-3`}>Why add social links?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className={`text-xs font-medium ${colors.textPrimary} mb-2`}>GitHub</h5>
              <ul className={`text-xs ${colors.textMuted} space-y-1`}>
                <li>• Showcase your coding skills</li>
                <li>• Demonstrate project experience</li>
                <li>• Highlight open source contributions</li>
              </ul>
            </div>
            <div>
              <h5 className={`text-xs font-medium ${colors.textPrimary} mb-2`}>LinkedIn</h5>
              <ul className={`text-xs ${colors.textMuted} space-y-1`}>
                <li>• Professional networking</li>
                <li>• Endorsements and recommendations</li>
                <li>• Industry connections</li>
              </ul>
            </div>
            <div>
              <h5 className={`text-xs font-medium ${colors.textPrimary} mb-2`}>Portfolio</h5>
              <ul className={`text-xs ${colors.textMuted} space-y-1`}>
                <li>• Showcase your best work</li>
                <li>• Demonstrate design skills</li>
                <li>• Tell your professional story</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection; 