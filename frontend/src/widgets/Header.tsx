import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { $user, logout } from '@/shared/model/auth'
import { useUnit } from 'effector-react'

const useStyles = createUseStyles({
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '12px 0',
  },
  container: {
    maxWidth: 1200,
    margin: [0, 'auto'],
    padding: [0, '16px'],
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '16px',
    },
  },
  brand: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#000',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      width: '100%',
    },
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    padding: '8px 12px',
    transition: 'background-color 0.2s',
    '&:hover': { backgroundColor: '#f8f9fa' },
  },
  linkActive: {
    color: '#9a031e',
    borderBottom: '2px solid #9a031e',
  },
  hiddenLoginButton: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '50px',
    height: '50px',
    opacity: 0,
    cursor: 'default',
    zIndex: 9999,
    background: 'transparent',
    border: 'none',
  },
})

export const Header: React.FC = () => {
  const [user] = useUnit([$user])
  const classes = useStyles()
  const navigate = useNavigate()
  const lastTapRef = React.useRef<number>(0)

  const handleDoubleClick = () => {
    navigate('/login')
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Двойной тап обнаружен
      e.preventDefault()
      navigate('/login')
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <nav className={classes.navbar}>
          <Link to="/" className={classes.brand}>
            Айгуль Утлякова
          </Link>
          <div className={classes.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ''}`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/bio"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ''}`
              }
            >
              Биография
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ''}`
              }
            >
              Галерея
            </NavLink>
            <NavLink
              to="/exhibitions"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ''}`
              }
            >
              Выставки
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ''}`
              }
            >
              Контакты
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${classes.link} ${isActive ? classes.linkActive : ''}`
                  }
                >
                  Профиль
                </NavLink>
                <button onClick={() => logout()} className="btn btn-secondary">
                  Выйти
                </button>
              </>
            ) : null}
          </div>
        </nav>
      </div>
      {!user && (
        <div
          className={classes.hiddenLoginButton}
          onDoubleClick={handleDoubleClick}
          onTouchEnd={handleTouchEnd}
          title=""
        />
      )}
    </header>
  )
}
