import { createContext} from 'react';
import type { ThemeType } from './types.tsx';

export const ThemeContext = createContext<ThemeType | null>(null);