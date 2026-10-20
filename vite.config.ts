import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the build loads from capacitor://localhost as well as from a web host
export default defineConfig({
  base: './',
  plugins: [react()],
})
