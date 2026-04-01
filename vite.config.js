import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const env = globalThis.process?.env

// https://vitejs.dev/config/
export default defineConfig({
  base: env?.GITHUB_ACTIONS === 'true' && env?.GITHUB_REPOSITORY
    ? `/${env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
  plugins: [react()],
})
