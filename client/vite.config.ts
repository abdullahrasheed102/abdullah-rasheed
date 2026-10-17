import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // @n8n/chat ships the esm-bundler build of Vue, which expects these compile-time flags.
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  build: {
    // The chat widget is a ~1.4 MB lazy-loaded chunk fetched after first paint; don't warn about it.
    chunkSizeWarningLimit: 1600,
  },
})
