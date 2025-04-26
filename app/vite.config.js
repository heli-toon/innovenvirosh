import { defineConfig } from 'vite';

export default defineConfig({
  // Project root directory
  root: './',
  
  // Base public path
  base: '/',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Build output configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: true,
  },
  
  // CSS configurations
  css: {
    devSourcemap: true,
  },
  
  // Alias configurations
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});