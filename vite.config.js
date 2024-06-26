import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['uuid']
  }
  // define:{
  //   'process.env.VITE_REACT_APP_API':JSON.stringify(process.env.VITE_REACT_APP_API)
  // }
})
