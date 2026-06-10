import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    axios.get('http://127.0.0.1:8000/api/auth/profile/', { headers })
      .then(res => setUser(res.data));
    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(res => setProjects(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">
            Саломатӣ, <span className="text-primary">{user?.username}!</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">{user?.organization}</p>
        </div>
        <Link
          to="/projects/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
        >
          + Лоиҳаи нав
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-medium">{projects.length}</div>
          <div className="text-sm text-gray-400 mt-1">Лоиҳаи фаъол</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-medium text-primary">0</div>
          <div className="text-sm text-gray-400 mt-1">Дархостҳо</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-medium text-green-400">0</div>
          <div className="text-sm text-gray-400 mt-1">Фурӯхта шуд</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex justify-between items-center">
          <span className="font-medium">Лоиҳаҳои ман</span>
        </div>
        {projects.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="mb-4">Ҳанӯз лоиҳа нест</p>
            <Link to="/projects/new" className="text-primary hover:underline">
              Лоиҳаи аввал илова кун
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-border">
                <th className="text-left px-4 py-3 font-normal">Ном</th>
                <th className="text-left px-4 py-3 font-normal">Нарх</th>
                <th className="text-left px-4 py-3 font-normal">Ҳолат</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b border-border hover:bg-dark">
                  <td className="px-4 py-3">
                    <Link to={`/projects/${p.id}`} className="hover:text-primary">{p.title}</Link>
                  </td>
                  <td className="px-4 py-3">{p.price} сом.</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;