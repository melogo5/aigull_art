import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space } from 'antd'
import {
  $isFecthingUser,
  $isLoggingIn,
  $user,
  login,
} from '@/shared/model/auth'
import { useUnit } from 'effector-react'

export const LoginForm: React.FC = () => {
  const [isLoggingIn, isFecthingUser, user] = useUnit([
    $isLoggingIn,
    $isFecthingUser,
    $user,
  ])
  const loading = isLoggingIn || isFecthingUser
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    login({ email: formData.email, password: formData.password })
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>Секретный вход</h1>
      <Space direction="vertical">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
          className="form-input"
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </Space>
    </form>
  )
}
