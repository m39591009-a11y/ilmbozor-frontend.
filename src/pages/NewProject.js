import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewProject() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    status: 'active'
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get('http://127.0.0.1:8000/api/projects/categories/')
      .then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/projects/',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/projects/${res.data.id}`);
    } catch {
      setError('Хатогӣ! Маълумотро дуруст пур кун.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-medium mb-8">Лоиҳаи нав</h1>
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Номи лоиҳа</label>
            <input
              type="text"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Номи лоиҳаро навис..."
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Соҳа</label>
            <select
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
            >
              <option value="">Интихоб кун</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name_tj}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Тавсиф</label>
            <textarea
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
              rows={5}
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Лоиҳаро тавсиф кун..."
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Нарх (сомонӣ)</label>
            <input
              type="number"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              placeholder="0"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:opacity-90"
          >
            Нашр кунед
          </button>
        </div>

        <div className="bg-purple-950 border border-purple-800 rounded-xl p-6">
          <div className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-4">
            ✦ AI таҳлил
          </div>
          <p className="text-purple-400 text-sm leading-relaxed mb-4">
            Лоиҳаро нашр кардан баъд саҳифаи лоиҳа дохил шав ва тугмаи "Тавлид кун"-ро зан.
          </p>
          <div className="flex flex-col gap-2">
            {['Бозори ҳадаф', 'Арзиши бозор', 'Рақибон', 'Даромади тахминӣ', 'Тавсия'].map(item => (
              <div key={item} className="bg-purple-900 bg-opacity-50 rounded-lg px-3 py-2 text-xs text-purple-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProject;