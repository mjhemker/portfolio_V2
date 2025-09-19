import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp4', '**/*.mp3'],
  build: {
    // Disable asset inlining for large files - keep them as separate assets
    assetsInlineLimit: 0,
    // Increase chunk size warning limit to accommodate large assets
    chunkSizeWarningLimit: 2000,
    // Ensure large assets are properly hashed but not processed
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep video files with descriptive names
          if (assetInfo.name && /\.(mp4|webm|avi|mov)$/i.test(assetInfo.name)) {
            return 'assets/videos/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
