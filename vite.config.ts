import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),  tsconfigPaths()],

  server: {
    port: 3000,
    strictPort: true,
  },
  css: {
    modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCaseOnly',
    },
},
})