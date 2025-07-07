import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicationTracker from '../ApplicationTracker';
import { Application } from '../../types';

const mockOnUpdateStatus = jest.fn();
const mockOnAddApplication = jest.fn();

const mockApplications: Application[] = [
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
];

describe('ApplicationTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders application tracker with applications', () => {
    render(
      <ApplicationTracker
        applications={mockApplications}
        onUpdateStatus={mockOnUpdateStatus}
        onAddApplication={mockOnAddApplication}
      />
    );
    
    expect(screen.getByText('Applications')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('shows add application form when button is clicked', () => {
    render(
      <ApplicationTracker
        applications={mockApplications}
        onUpdateStatus={mockOnUpdateStatus}
        onAddApplication={mockOnAddApplication}
      />
    );
    
    const addButton = screen.getByText('+ Add Application');
    fireEvent.click(addButton);
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Role')).toBeInTheDocument();
  });

  it('allows adding a new application', () => {
    render(
      <ApplicationTracker
        applications={mockApplications}
        onUpdateStatus={mockOnUpdateStatus}
        onAddApplication={mockOnAddApplication}
      />
    );
    
    const addButton = screen.getByText('+ Add Application');
    fireEvent.click(addButton);
    
    const companyInput = screen.getByPlaceholderText('Company');
    const roleInput = screen.getByPlaceholderText('Role');
    const submitButton = screen.getByText('Add Application');
    
    fireEvent.change(companyInput, { target: { value: 'Apple' } });
    fireEvent.change(roleInput, { target: { value: 'iOS Developer' } });
    fireEvent.click(submitButton);
    
    expect(mockOnAddApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        company: 'Apple',
        role: 'iOS Developer',
        status: 'applied',
      })
    );
  });

  it('allows updating application status', () => {
    render(
      <ApplicationTracker
        applications={mockApplications}
        onUpdateStatus={mockOnUpdateStatus}
        onAddApplication={mockOnAddApplication}
      />
    );
    
    const statusSelects = screen.getAllByRole('combobox');
    fireEvent.change(statusSelects[0], { target: { value: 'interview' } });
    
    expect(mockOnUpdateStatus).toHaveBeenCalledWith('1', 'interview');
  });

  it('shows empty state when no applications', () => {
    render(
      <ApplicationTracker
        applications={[]}
        onUpdateStatus={mockOnUpdateStatus}
        onAddApplication={mockOnAddApplication}
      />
    );
    
    expect(screen.getByText('No applications yet')).toBeInTheDocument();
    expect(screen.getByText('Add your first application to get started')).toBeInTheDocument();
  });

  it('displays summary statistics', () => {
    render(
      <ApplicationTracker
        applications={mockApplications}
        onUpdateStatus={mockOnUpdateStatus}
        onAddApplication={mockOnAddApplication}
      />
    );
    
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Interviews: 1')).toBeInTheDocument();
    expect(screen.getByText('Offers: 0')).toBeInTheDocument();
  });
}); 