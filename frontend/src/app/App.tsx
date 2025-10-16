import React from 'react';
import Routing from './Routing';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { AuthProvider } from '@/features/auth';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
