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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get('http://127.0.0.1:8000/api/projects/categories/')
      .then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-500 hover:text-white mb-8 transition-colors"
      >
        ← Бозгашт
      </button>
      <h1 className="text-2xl font-medium mb-8">Лоиҳаи нав</h1>
      {error && (
        <div className="bg-red-950 border border-red-800 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Номи лоиҳа</label>
            <input
              type="text"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Номи лоиҳаро навис..."
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Соҳа</label>
            <select
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
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
            <label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Тавсиф</label>
            <textarea
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none transition-colors"
              rows={5}
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Лоиҳаро муфассал тавсиф кун..."
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Нарх (сомонӣ)</label>
            <input
              type="number"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              placeholder="0"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 mt-2"
          >
            {loading ? 'Нашр мешавад...' : 'Нашр кунед'}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-purple-950 border border-purple-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-3">
              ✦ AI таҳлил
            </div>
            <p className="text-purple-400 text-xs leading-relaxed mb-4">
              Лоиҳаро нашр кардан баъд саҳифаи лоиҳа дохил шав ва тугмаи "Тавлид кун"-ро зан — AI автоматан бизнес-план месозад.
            </p>
            <div className="flex flex-col gap-2">
              {['Бозори ҳадаф', 'Арзиши бозор', 'Рақибон', 'Даромади тахминӣ', 'Тавсия'].map(item => (
                <div key={item} className="bg-purple-900 bg-opacity-40 border border-purple-800 rounded-xl px-4 py-2.5 text-xs text-purple-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Маслиҳат</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Тавсифи муфассал нависед — AI беҳтар таҳлил мекунад ва инвесторон зудтар қарор мегиранд.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProject;