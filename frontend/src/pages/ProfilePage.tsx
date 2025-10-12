import React from 'react';
import { UserProfile } from '@/widgets/UserProfile';

export const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <UserProfile />
      </div>
    </div>
  );
};
