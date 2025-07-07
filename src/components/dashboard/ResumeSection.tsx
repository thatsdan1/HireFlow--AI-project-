import React, { useRef } from 'react';
import { ThemeColors, User } from '../../types';

interface ResumeSectionProps {
  user: User;
  colors: ThemeColors;
  onUploadResume: (file: File) => void;
  isLoading?: boolean;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  user,
  colors,
  onUploadResume,
  isLoading = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }
      
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      
      onUploadResume(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-semibold ${colors.textPrimary}`}>Resume Management</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className={`p-6 ${colors.card} rounded-lg border ${colors.border}`}>
          <h4 className={`text-sm font-medium ${colors.textPrimary} mb-4`}>Upload Resume</h4>
          
          <div className="space-y-4">
            <div className={`p-4 border-2 border-dashed ${colors.border} rounded-lg text-center`}>
              <div className="text-4xl mb-2">📄</div>
              <p className={`text-sm ${colors.textMuted} mb-2`}>
                Upload your resume in PDF format
              </p>
              <p className={`text-xs ${colors.textMuted} mb-4`}>
                Maximum file size: 10MB
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className={`px-4 py-2 ${colors.button} ${colors.buttonText} rounded-md ${colors.buttonHover} focus:outline-none ${colors.focusRing} disabled:opacity-50 transition-colors duration-200`}
              >
                {isLoading ? 'Uploading...' : 'Choose File'}
              </button>
            </div>

            <div className={`p-3 bg-blue-50 border border-blue-200 rounded-lg`}>
              <h5 className={`text-sm font-medium text-blue-800 mb-2`}>Tips for a great resume:</h5>
              <ul className={`text-xs text-blue-700 space-y-1`}>
                <li>• Use a clear, professional format</li>
                <li>• Include relevant keywords for your target roles</li>
                <li>• Keep it concise (1-2 pages)</li>
                <li>• Update it regularly with new experiences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Resume Section */}
        <div className={`p-6 ${colors.card} rounded-lg border ${colors.border}`}>
          <h4 className={`text-sm font-medium ${colors.textPrimary} mb-4`}>Current Resume</h4>
          
          {user.resume ? (
            <div className="space-y-4">
              <div className={`p-4 ${colors.card} border ${colors.border} rounded-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <p className={`text-sm font-medium ${colors.textPrimary}`}>
                        {user.resume.fileName}
                      </p>
                      <p className={`text-xs ${colors.textMuted}`}>
                        Uploaded: {formatDate(user.resume.uploadedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <a
                  href={user.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-2 text-sm ${colors.button} ${colors.buttonText} rounded-md ${colors.buttonHover} focus:outline-none ${colors.focusRing} transition-colors duration-200`}
                >
                  View Resume
                </a>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className={`px-3 py-2 text-sm ${colors.buttonSecondary} ${colors.buttonSecondaryText} rounded-md ${colors.buttonSecondaryHover} focus:outline-none ${colors.focusRing} disabled:opacity-50 transition-colors duration-200`}
                >
                  Replace
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-8 text-center ${colors.card} border ${colors.border} rounded-lg`}>
              <div className="text-4xl mb-4">📄</div>
              <p className={`text-sm ${colors.textMuted} mb-4`}>
                No resume uploaded yet
              </p>
              <p className={`text-xs ${colors.textMuted}`}>
                Upload your first resume to get started with HireFlow
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resume Tips */}
      <div className="mt-6">
        <div className={`p-4 ${colors.card} border ${colors.border} rounded-lg`}>
          <h4 className={`text-sm font-medium ${colors.textPrimary} mb-3`}>Resume Best Practices</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className={`text-xs font-medium ${colors.textPrimary} mb-2`}>Content Tips:</h5>
              <ul className={`text-xs ${colors.textMuted} space-y-1`}>
                <li>• Use action verbs to describe achievements</li>
                <li>• Quantify results when possible</li>
                <li>• Tailor content to specific job requirements</li>
                <li>• Include relevant skills and certifications</li>
              </ul>
            </div>
            <div>
              <h5 className={`text-xs font-medium ${colors.textPrimary} mb-2`}>Format Tips:</h5>
              <ul className={`text-xs ${colors.textMuted} space-y-1`}>
                <li>• Use consistent formatting throughout</li>
                <li>• Choose readable fonts (Arial, Calibri, Times New Roman)</li>
                <li>• Use bullet points for easy scanning</li>
                <li>• Keep margins and spacing consistent</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection; 