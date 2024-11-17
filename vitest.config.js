import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates a browser environment
    globals: true, // Allows global test functions like `describe` and `it`
    setupFiles: './src/setupTests.js', // Optional setup file for additional configurations
    coverage: {
        provider: 'v8', // Use the built-in v8 coverage provider
        reporter: ['text', 'json', 'html'], // Define the output formats
      },
  },
});