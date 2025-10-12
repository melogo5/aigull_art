import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            Aigull Art
          </Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Home</Link>
            {user ? (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
