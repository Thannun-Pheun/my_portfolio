import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Preview / dev server on the sandbox reserved port (and fine locally too)
  server: { port: 3000, host: true },
  preview: { port: 3000, host: true },
})
