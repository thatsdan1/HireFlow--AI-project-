import React, { useState, useRef, useEffect } from 'react';
import { Message, ThemeColors } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  colors: ThemeColors;
  themeToggle?: React.ReactNode;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, colors, themeToggle }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`${colors.card} border-b ${colors.border} px-6 py-4 transition-colors duration-200`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-lg font-semibold ${colors.textPrimary}`}>HireFlow AI Assistant</h1>
            <p className={`text-sm ${colors.textMuted}`}>Your personal career assistant</p>
          </div>
          {themeToggle && (
            <div className="flex items-center">
              {themeToggle}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? `${colors.userMessage} border ${colors.userMessageBorder} ${colors.textPrimary}`
                  : `${colors.aiMessage} ${colors.textPrimary}`
              } transition-colors duration-200`}
            >
              {message.isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  <span className={`text-sm ${colors.textMuted}`}>AI is thinking...</span>
                </div>
              ) : (
                <>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs ${colors.textMuted} mt-1`}>
                    {formatTime(message.timestamp)}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`${colors.card} border-t ${colors.border} p-4 transition-colors duration-200`}>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className={`flex-1 px-4 py-2 ${colors.input} border ${colors.inputBorder} rounded-lg focus:outline-none ${colors.focusRing} focus:border-transparent transition-colors duration-200`}
            disabled={messages.some(msg => msg.isLoading)}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || messages.some(msg => msg.isLoading)}
            className={`px-6 py-2 ${colors.button} ${colors.buttonText} rounded-lg ${colors.buttonHover} focus:outline-none ${colors.focusRing} focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface; 