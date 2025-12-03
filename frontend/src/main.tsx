import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './components/Layout'
import { UserPage } from './components/users/UserPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <UserPage />
    </Layout>
  </StrictMode>,
)
