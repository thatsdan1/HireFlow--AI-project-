import { useState, useEffect } from 'react';
import { Theme, ThemeColors } from '../types';

const themeColors: Record<Theme, ThemeColors> = {
  light: {
    background: 'bg-white',
    sidebar: 'bg-gray-100',
    card: 'bg-white',
    header: 'bg-white',
    border: 'border-gray-200',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    button: 'bg-gray-800',
    buttonHover: 'hover:bg-gray-700',
    buttonText: 'text-white',
    buttonSecondary: 'bg-gray-200',
    buttonSecondaryText: 'text-gray-800',
    buttonSecondaryHover: 'hover:bg-gray-300',
    accent: 'bg-blue-600',
    chatBubble: 'bg-gray-100',
    chatBubbleOwn: 'bg-blue-100',
    chatBubbleText: 'text-gray-900',
    chatBubbleTextOwn: 'text-blue-900',
    userMessage: 'bg-white',
    userMessageBorder: 'border-gray-200',
    aiMessage: 'bg-gray-100',
    input: 'bg-white',
    inputBorder: 'border-gray-200',
    focusRing: 'focus:ring-gray-800',
  },
  dark: {
    background: 'bg-gray-900',
    sidebar: 'bg-gray-800',
    card: 'bg-gray-800',
    header: 'bg-gray-900',
    border: 'border-gray-700',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    button: 'bg-gray-600',
    buttonHover: 'hover:bg-gray-500',
    buttonText: 'text-white',
    buttonSecondary: 'bg-gray-700',
    buttonSecondaryText: 'text-white',
    buttonSecondaryHover: 'hover:bg-gray-600',
    accent: 'bg-blue-500',
    chatBubble: 'bg-gray-700',
    chatBubbleOwn: 'bg-blue-900',
    chatBubbleText: 'text-white',
    chatBubbleTextOwn: 'text-blue-200',
    userMessage: 'bg-gray-800',
    userMessageBorder: 'border-gray-600',
    aiMessage: 'bg-gray-700',
    input: 'bg-gray-800',
    inputBorder: 'border-gray-600',
    focusRing: 'focus:ring-gray-400',
  },
  night: {
    background: 'bg-black',
    sidebar: 'bg-gray-900',
    card: 'bg-gray-900',
    header: 'bg-black',
    border: 'border-gray-800',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-500',
    button: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-700',
    buttonText: 'text-white',
    buttonSecondary: 'bg-gray-800',
    buttonSecondaryText: 'text-white',
    buttonSecondaryHover: 'hover:bg-gray-700',
    accent: 'bg-blue-700',
    chatBubble: 'bg-gray-800',
    chatBubbleOwn: 'bg-blue-900',
    chatBubbleText: 'text-white',
    chatBubbleTextOwn: 'text-blue-200',
    userMessage: 'bg-gray-900',
    userMessageBorder: 'border-gray-700',
    aiMessage: 'bg-gray-800',
    input: 'bg-gray-900',
    inputBorder: 'border-gray-700',
    focusRing: 'focus:ring-blue-500',
  },
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('hireflow-theme') as Theme;
    return savedTheme || 'light';
  });

  const [colors, setColors] = useState<ThemeColors>(themeColors[theme]);

  useEffect(() => {
    localStorage.setItem('hireflow-theme', theme);
    setColors(themeColors[theme]);
    
    // Update document body class for global styling
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'night'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const setSpecificTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    colors,
    toggleTheme,
    setSpecificTheme,
  };
}; 