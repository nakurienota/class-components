import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.tsx';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('ThemeContext is null');
  return context;
}