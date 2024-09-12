import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'vendor-react'; // Creates a separate chunk for React
              }
              if (id.includes('lodash')) {
                return 'vendor-lodash'; // Creates a separate chunk for lodash (if used)
              }
              // You can add more chunking logic here based on your dependencies
              return 'vendor'; // General vendor chunk
            }
          },
        },
      },
      chunkSizeWarningLimit: 12000, // Increase chunk size limit if needed
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // Proxy settings if needed
      },
      // Uncomment this line if you want the server to fallback for client-side routing
      // historyApiFallback: true,
    },
  }
})
