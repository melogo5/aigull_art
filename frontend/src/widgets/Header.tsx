import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useAuth } from '@/features/auth';

const useStyles = createUseStyles({
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.75rem 0',
  },
  container: {
    maxWidth: 1200,
    margin: [0, 'auto'],
    padding: [0, '1rem'],
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#000',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      width: '100%',
    },
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    transition: 'background-color 0.2s',
    '&:hover': { backgroundColor: '#f8f9fa' },
  },
  linkActive: {
    color: '#9a031e',
    borderBottom: '2px solid #9a031e',
  },
});

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <nav className={classes.navbar}>
          <Link to="/" className={classes.brand}>Айгуль Утлякова</Link>
          <div className={classes.nav}>
            <NavLink to="/" end className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Главная</NavLink>
            <NavLink to="/bio" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Биография</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Галерея</NavLink>
            <NavLink to="/exhibitions" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Выставки</NavLink>
            <NavLink to="/contacts" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Контакты</NavLink>
            {user ? (
              <>
                <NavLink to="/profile" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Профиль</NavLink>
                <button onClick={logout} className="btn btn-secondary">Выйти</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Вход</NavLink>
                <NavLink to="/register" className={({ isActive }) => `${classes.link} ${isActive ? classes.linkActive : ''}`}>Регистрация</NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
