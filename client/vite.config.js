import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Resolve '@' to 'src' directory
    },
  },
  esbuild: {
    loader: 'jsx',  // Correct usage of loader for JSX
  },
});
