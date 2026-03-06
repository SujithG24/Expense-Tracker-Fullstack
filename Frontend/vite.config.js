import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // You're using SWC for that M4 speed!
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})