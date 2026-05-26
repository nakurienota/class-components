export type Theme = 'light' | 'dark';

export type ThemeType = {
  theme: Theme;
  toggleTheme: () => void;
};