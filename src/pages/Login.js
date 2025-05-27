import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../api';
import './Login.css';

export default function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', form);
      console.log(res.data);

      localStorage.setItem('token', res.data.token);

      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (onLogin) onLogin(res.data.user);
      } else {
        localStorage.removeItem('user');
        if (onLogin) onLogin(null);
      }

      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}


