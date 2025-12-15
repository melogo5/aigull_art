import React, { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Routing from './Routing'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { fetchUser } from '@/shared/model/auth'

const App: React.FC = () => {
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Routing />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
