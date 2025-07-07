import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInterface from '../ChatInterface';
import { Message } from '../../types';

const mockOnSendMessage = jest.fn();

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    sender: 'ai',
    timestamp: new Date('2024-01-01T10:00:00'),
  },
  {
    id: '2',
    content: 'I need help with my resume',
    sender: 'user',
    timestamp: new Date('2024-01-01T10:01:00'),
  },
];

describe('ChatInterface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders chat interface with messages', () => {
    render(<ChatInterface messages={mockMessages} onSendMessage={mockOnSendMessage} />);
    
    expect(screen.getByText('HireFlow AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Your personal career assistant')).toBeInTheDocument();
    expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
    expect(screen.getByText('I need help with my resume')).toBeInTheDocument();
  });

  it('allows user to send a message', () => {
    render(<ChatInterface messages={mockMessages} onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('Type your message here...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
  });

  it('disables input when AI is loading', () => {
    const messagesWithLoading: Message[] = [
      ...mockMessages,
      {
        id: '3',
        content: '',
        sender: 'ai',
        timestamp: new Date(),
        isLoading: true,
      },
    ];
    
    render(<ChatInterface messages={messagesWithLoading} onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('Type your message here...');
    const sendButton = screen.getByText('Send');
    
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it('shows loading indicator when AI is thinking', () => {
    const messagesWithLoading: Message[] = [
      ...mockMessages,
      {
        id: '3',
        content: '',
        sender: 'ai',
        timestamp: new Date(),
        isLoading: true,
      },
    ];
    
    render(<ChatInterface messages={messagesWithLoading} onSendMessage={mockOnSendMessage} />);
    
    expect(screen.getByText('AI is thinking...')).toBeInTheDocument();
  });

  it('submits form on Enter key', () => {
    render(<ChatInterface messages={mockMessages} onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('Type your message here...');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
  });

  it('does not submit empty messages', () => {
    render(<ChatInterface messages={mockMessages} onSendMessage={mockOnSendMessage} />);
    
    const sendButton = screen.getByText('Send');
    
    fireEvent.click(sendButton);
    
    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });
}); 