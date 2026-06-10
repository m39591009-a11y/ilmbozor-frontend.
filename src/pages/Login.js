import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', form);
      localStorage.setItem('token', res.data.access);
      navigate('/dashboard');
    } catch {
      setError('Логин ё парол нодуруст!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-medium mb-2 text-center">Вуруд</h1>
        <p className="text-gray-400 text-center mb-8">Ба IlmBozor хуш омадед</p>
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Логин</label>
            <input
              type="text"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
              placeholder="username"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Парол</label>
            <input
              type="password"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:opacity-90"
          >
            Дохил шудан
          </button>
          <p className="text-center text-sm text-gray-400">
            Аккаунт надорӣ?{' '}
            <Link to="/register" className="text-primary hover:underline">Қайд шав</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;