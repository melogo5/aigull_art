import React from 'react';
import { LoginForm } from '@/features/auth';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="container">
        <div className="text-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
