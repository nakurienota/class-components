import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://rolling-scopes-school.github.io/nakurienota-REACT2026Q2/',
});
