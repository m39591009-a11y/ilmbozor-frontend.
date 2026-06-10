import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    role: 'scientist',
    organization: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register/', form);
      navigate('/login');
    } catch (err) {
      setError('Хатогӣ! Маълумотро дуруст пур кун.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-medium mb-2 text-center">Қайд шудан</h1>
        <p className="text-gray-400 text-center mb-8">Аккаунти нав созед</p>
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
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <input
              type="email"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Нақш</label>
            <select
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
            >
              <option value="scientist">Олим</option>
              <option value="investor">Инвестор</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Ташкилот</label>
            <input
              type="text"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.organization}
              onChange={e => setForm({...form, organization: e.target.value})}
              placeholder="ДМТ, АИТ..."
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
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Паролро такрор кун</label>
            <input
              type="password"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.password2}
              onChange={e => setForm({...form, password2: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:opacity-90"
          >
            Қайд шудан
          </button>
          <p className="text-center text-sm text-gray-400">
            Аккаунт дорӣ?{' '}
            <Link to="/login" className="text-primary hover:underline">Дохил шав</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;