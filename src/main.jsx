import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Master from './master.jsx'
// import './master.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Master />
  </StrictMode>,
)
