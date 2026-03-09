import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'


if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}

// Vite only exposes variables prefixed with VITE_ to the browser bundle.
// Set VITE_GOOGLE_CLIENT_ID in your .env file — never hardcode it here.
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!GOOGLE_CLIENT_ID) {
  throw new Error(
    '[Auth] VITE_GOOGLE_CLIENT_ID is not set.\n' +
    'Add it to your .env file: VITE_GOOGLE_CLIENT_ID=<your-oauth-client-id>'
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
