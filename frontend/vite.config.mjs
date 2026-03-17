import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Google Identity Services opens a popup and uses window.postMessage to
    // deliver the credential back to the opener.  The default browser COOP
    // policy blocks cross-origin postMessage calls, which silently swallows
    // the credential even after the user picks an account.
    //
    // "same-origin-allow-popups" relaxes the policy just enough to let the
    // Google Sign-In popup communicate back while still isolating the page
    // from unrelated cross-origin windows.
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
})