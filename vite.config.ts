import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        // React component name will be PascalCased
        exportType: 'named',
        ref: true,
      },
      // A minimatch pattern, or array of patterns, which specifies the files to include
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
