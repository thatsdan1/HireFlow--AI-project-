import React, { useState } from 'react';
import { Application, ThemeColors } from '../types';

interface ApplicationTrackerProps {
  applications: Application[];
  onUpdateStatus: (applicationId: string, status: Application['status']) => void;
  onAddApplication: (application: Omit<Application, 'id'>) => void;
  colors: ThemeColors;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onUpdateStatus,
  onAddApplication,
  colors,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    company: '',
    role: '',
    dateApplied: new Date(),
    status: 'applied' as Application['status'],
  });

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (newApplication.company && newApplication.role) {
      onAddApplication(newApplication);
      setNewApplication({
        company: '',
        role: '',
        dateApplied: new Date(),
        status: 'applied',
      });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'interview':
        return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
      case 'rejected':
        return 'bg-gray-300 text-gray-800 dark:bg-gray-500 dark:text-gray-200';
      case 'offer':
        return 'bg-gray-400 text-gray-800 dark:bg-gray-400 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`p-4 border-b ${colors.border} transition-colors duration-200`}>
        <h2 className={`text-lg font-semibold ${colors.textPrimary}`}>Applications</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`mt-2 w-full px-3 py-2 ${colors.button} ${colors.buttonText} text-sm rounded-lg ${colors.buttonHover} focus:outline-none ${colors.focusRing} transition-colors duration-200`}
        >
          {showAddForm ? 'Cancel' : '+ Add Application'}
        </button>
      </div>

      {/* Add Application Form */}
      {showAddForm && (
        <div className={`p-4 border-b ${colors.border} transition-colors duration-200`}>
          <form onSubmit={handleAddApplication} className="space-y-3">
            <input
              type="text"
              placeholder="Company"
              value={newApplication.company}
              onChange={(e) => setNewApplication(prev => ({ ...prev, company: e.target.value }))}
              className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200`}
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={newApplication.role}
              onChange={(e) => setNewApplication(prev => ({ ...prev, role: e.target.value }))}
              className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200`}
              required
            />
            <input
              type="date"
              value={newApplication.dateApplied.toISOString().split('T')[0]}
              onChange={(e) => setNewApplication(prev => ({ ...prev, dateApplied: new Date(e.target.value) }))}
              className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200`}
            />
            <select
              value={newApplication.status}
              onChange={(e) => setNewApplication(prev => ({ ...prev, status: e.target.value as Application['status'] }))}
              className={`w-full px-3 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} transition-colors duration-200`}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="offer">Offer</option>
            </select>
            <button
              type="submit"
              className={`w-full px-3 py-2 ${colors.button} ${colors.buttonText} rounded-lg ${colors.buttonHover} focus:outline-none ${colors.focusRing} transition-colors duration-200`}
            >
              Add Application
            </button>
          </form>
        </div>
      )}

      {/* Applications List */}
      <div className="flex-1 overflow-y-auto">
        {applications.length === 0 ? (
          <div className={`p-4 text-center ${colors.textMuted}`}>
            <p>No applications yet</p>
            <p className="text-sm">Add your first application to get started</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className={`p-3 ${colors.card} border ${colors.border} rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className={`font-medium ${colors.textPrimary} text-sm`}>{application.company}</h3>
                    <p className={`text-sm ${colors.textSecondary}`}>{application.role}</p>
                  </div>
                  <select
                    value={application.status}
                    onChange={(e) => onUpdateStatus(application.id, e.target.value as Application['status'])}
                    className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(application.status)}`}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
                <p className={`text-xs ${colors.textMuted}`}>
                  Applied: {formatDate(application.dateApplied)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className={`p-4 border-t ${colors.border} bg-gray-50 dark:bg-gray-800 transition-colors duration-200`}>
        <div className={`text-sm ${colors.textSecondary}`}>
          <p>Total: {applications.length}</p>
          <p>Interviews: {applications.filter(app => app.status === 'interview').length}</p>
          <p>Offers: {applications.filter(app => app.status === 'offer').length}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker; 