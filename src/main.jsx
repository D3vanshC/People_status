import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Master from './master.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Master />
  </StrictMode>,
)
