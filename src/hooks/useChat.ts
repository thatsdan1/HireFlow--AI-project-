import { useState, useCallback } from 'react';
import { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI career assistant. I can help you create resumes, tailor them for specific jobs, and track your applications. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate AI response based on user input
      let aiResponse = "I understand you want to work on that. Let me help you with that!";
      
      if (content.toLowerCase().includes('resume')) {
        aiResponse = "Great! I can help you create or improve your resume. Would you like to start with a new resume or work on an existing one?";
      } else if (content.toLowerCase().includes('cover letter')) {
        aiResponse = "I can help you generate a cover letter. Do you have a specific job in mind, or would you like me to help you write a general one?";
      } else if (content.toLowerCase().includes('job') || content.toLowerCase().includes('application')) {
        aiResponse = "I can help you track your job applications and tailor your materials for specific positions. What company or role are you interested in?";
      }

      // Update loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: aiResponse, isLoading: false }
          : msg
      ));
    } catch (error) {
      // Handle error
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: "Sorry, I encountered an error. Please try again.", isLoading: false }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: '1',
      content: "Hello! I'm your AI career assistant. I can help you create resumes, tailor them for specific jobs, and track your applications. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date(),
    }]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}; 