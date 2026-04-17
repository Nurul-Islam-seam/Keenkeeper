import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { TimelineProvider } from './context/TimelineContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TimelineProvider>
        <App />
        <Toaster position="top-right" />
      </TimelineProvider>
    </BrowserRouter>
  </StrictMode>,
)
