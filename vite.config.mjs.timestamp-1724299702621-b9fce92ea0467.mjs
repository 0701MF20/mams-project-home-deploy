// vite.config.mjs
import { defineConfig } from "file:///E:/mams_portal_revamp/MMG_PROJECT_HM_MAMS-150820241101/MMG_PROJECT_HM_MAMS-150820241101/node_modules/vite/dist/node/index.js";
import react from "file:///E:/mams_portal_revamp/MMG_PROJECT_HM_MAMS-150820241101/MMG_PROJECT_HM_MAMS-150820241101/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import autoprefixer from "file:///E:/mams_portal_revamp/MMG_PROJECT_HM_MAMS-150820241101/MMG_PROJECT_HM_MAMS-150820241101/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "E:\\mams_portal_revamp\\MMG_PROJECT_HM_MAMS-150820241101\\MMG_PROJECT_HM_MAMS-150820241101";
var vite_config_default = defineConfig(() => {
  return {
    base: "./",
    build: {
      outDir: "build"
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({})
          // add options if needed
        ]
      }
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: []
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          ".js": "jsx"
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "src/",
          replacement: `${path.resolve(__vite_injected_original_dirname, "src")}/`
        }
      ],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"]
    },
    server: {
      port: 3e3,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      }
      // Configure the Vite server to handle client-side routing
      // Ensure client-side routing is handled properly
      // historyApiFallback: true,
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbWFtc19wb3J0YWxfcmV2YW1wXFxcXE1NR19QUk9KRUNUX0hNX01BTVMtMTUwODIwMjQxMTAxXFxcXE1NR19QUk9KRUNUX0hNX01BTVMtMTUwODIwMjQxMTAxXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxtYW1zX3BvcnRhbF9yZXZhbXBcXFxcTU1HX1BST0pFQ1RfSE1fTUFNUy0xNTA4MjAyNDExMDFcXFxcTU1HX1BST0pFQ1RfSE1fTUFNUy0xNTA4MjAyNDExMDFcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9tYW1zX3BvcnRhbF9yZXZhbXAvTU1HX1BST0pFQ1RfSE1fTUFNUy0xNTA4MjAyNDExMDEvTU1HX1BST0pFQ1RfSE1fTUFNUy0xNTA4MjAyNDExMDEvdml0ZS5jb25maWcubWpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGJhc2U6ICcuLycsXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgYXV0b3ByZWZpeGVyKHt9KSwgLy8gYWRkIG9wdGlvbnMgaWYgbmVlZGVkXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgbG9hZGVyOiAnanN4JyxcbiAgICAgIGluY2x1ZGU6IC9zcmNcXC8uKlxcLmpzeD8kLyxcbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBmb3JjZTogdHJ1ZSxcbiAgICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICAgIGxvYWRlcjoge1xuICAgICAgICAgICcuanMnOiAnanN4JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdzcmMvJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcuc2NzcyddLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9zZXJ2ZXItb3B0aW9ucy5odG1sXG4gICAgICB9LFxuICAgICAgLy8gQ29uZmlndXJlIHRoZSBWaXRlIHNlcnZlciB0byBoYW5kbGUgY2xpZW50LXNpZGUgcm91dGluZ1xuICAgIC8vIEVuc3VyZSBjbGllbnQtc2lkZSByb3V0aW5nIGlzIGhhbmRsZWQgcHJvcGVybHlcbiAgICAvLyBoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG5cblxuXG4gICAgfSxcbiAgfVxufSlcblxuXG5cblxuXG5cblxuXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaWMsU0FBUyxvQkFBb0I7QUFDOWQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGtCQUFrQjtBQUh6QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUNoQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLFVBQ1AsYUFBYSxDQUFDLENBQUM7QUFBQTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLFFBQ2QsUUFBUTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEdBQUcsS0FBSyxRQUFRLGtDQUFXLEtBQUssQ0FBQztBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFTLE9BQU87QUFBQSxJQUNyRTtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBO0FBQUEsTUFFUDtBQUFBO0FBQUE7QUFBQTtBQUFBLElBT0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
