import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/vendor/formRenderComponents/styles/react-layout.css'
import './components/vendor/formRenderComponents/styles/react-select.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
