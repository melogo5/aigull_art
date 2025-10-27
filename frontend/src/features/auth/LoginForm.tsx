import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Space } from 'antd';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>Секретный вход</h1>
      {error && <div className="error-message">{error}</div>}
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
  );
};
