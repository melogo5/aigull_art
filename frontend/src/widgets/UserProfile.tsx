import React from 'react';
import { useAuth } from '@/features/auth';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Нужно войти чтобы увидеть профиль</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="profile-info">
        <h2>Welcome, {user.name}!</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
};
