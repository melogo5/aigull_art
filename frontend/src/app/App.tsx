import React, { useEffect } from 'react';
import Routing from './Routing';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { fetchUser } from '@/shared/model/auth';

const App: React.FC = () => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ErrorBoundary>
      <Routing />
    </ErrorBoundary>
  );
};

export default App;
