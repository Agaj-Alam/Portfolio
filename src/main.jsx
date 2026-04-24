import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Portfolio from './App.jsx'   // 👈 change here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Portfolio />   {/* 👈 change here */}
  </StrictMode>,
)