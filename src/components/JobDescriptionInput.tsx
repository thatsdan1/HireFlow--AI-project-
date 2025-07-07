import React, { useState } from 'react';

interface JobDescriptionInputProps {
  onAnalyze: (jobDescription: string) => void;
  onSave: (jobDescription: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onAnalyze, onSave }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      await onAnalyze(jobDescription);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (!jobDescription.trim()) return;
    onSave(jobDescription);
    setJobDescription('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description Analysis</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Paste the job description here
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Copy and paste the job description from the company's website or job board..."
            className="w-full h-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              'Analyze Job Description'
            )}
          </button>
          
          <button
            onClick={handleSave}
            disabled={!jobDescription.trim()}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save for Later
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>💡 <strong>Tip:</strong> The more detailed the job description, the better I can help tailor your resume and cover letter.</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput; 