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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register/', form);
      navigate('/login');
    } catch {
      setError('Хатогӣ! Маълумотро дуруст пур кун.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{background: 'linear-gradient(180deg, #13102a 0%, #0f0f13 100%)'}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-medium">
            Ilm<span className="text-primary">Bozor</span>
          </Link>
          <p className="text-gray-400 text-sm mt-2">Аккаунти нав созед</p>
        </div>
        {error && (
          <div className="bg-red-950 border border-red-800 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">Логин</label>
            <input
              type="text"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
              placeholder="username"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">Email</label>
            <input
              type="email"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">Нақш</label>
            <select
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
            >
              <option value="scientist">Олим</option>
              <option value="investor">Инвестор</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">Ташкилот</label>
            <input
              type="text"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.organization}
              onChange={e => setForm({...form, organization: e.target.value})}
              placeholder="ДМТ, АИТ..."
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">Парол</label>
            <input
              type="password"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">Паролро такрор кун</label>
            <input
              type="password"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.password2}
              onChange={e => setForm({...form, password2: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 mt-2"
          >
            {loading ? 'Зеркунӣ...' : 'Қайд шудан'}
          </button>
          <p className="text-center text-xs text-gray-500">
            Аккаунт дорӣ?{' '}
            <Link to="/login" className="text-primary hover:underline">Дохил шав</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;