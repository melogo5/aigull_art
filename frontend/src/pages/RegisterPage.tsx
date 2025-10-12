import React from 'react';
import { RegisterForm } from '@/features/auth';

export const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <div className="container">
        <div className="text-center">
          <h1>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
