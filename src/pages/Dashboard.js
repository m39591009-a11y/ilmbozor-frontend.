import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    const headers = { Authorization: `Bearer ${token}` };
    axios.get('http://127.0.0.1:8000/api/auth/profile/', { headers })
      .then(res => setUser(res.data));
    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(res => setProjects(res.data));
    axios.get('http://127.0.0.1:8000/api/projects/applications/', { headers })
      .then(res => setApplications(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-medium">
            Саломатӣ, <span className="text-primary">{user?.username}!</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">{user?.organization || 'Профил'}</p>
        </div>
        <Link
          to="/projects/new"
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90"
        >
          + Лоиҳаи нав
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-3xl font-medium">{projects.length}</div>
          <div className="text-sm text-gray-500 mt-1">Лоиҳаи фаъол</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-3xl font-medium text-primary">{applications.length}</div>
          <div className="text-sm text-gray-500 mt-1">Дархостҳо</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-3xl font-medium text-green-400">0</div>
          <div className="text-sm text-gray-500 mt-1">Фурӯхта шуд</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <span className="font-medium">Лоиҳаҳои ман</span>
          <Link to="/projects/new" className="text-xs text-primary hover:underline">+ Нав</Link>
        </div>
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 mb-3">Ҳанӯз лоиҳа нест</p>
            <Link to="/projects/new" className="text-primary text-sm hover:underline">
              Лоиҳаи аввал илова кун →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-border text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3 font-normal">Ном</th>
                <th className="text-left px-6 py-3 font-normal">Нарх</th>
                <th className="text-left px-6 py-3 font-normal">Ҳолат</th>
                <th className="text-left px-6 py-3 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b border-gray-800 hover:bg-dark transition-colors">
                  <td className="px-6 py-4 font-medium">{p.title}</td>
                  <td className="px-6 py-4 text-gray-400">{p.price} сом.</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-950 text-green-400 border border-green-900 px-2 py-1 rounded-full text-xs">
                      Фаъол
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/projects/${p.id}`} className="text-primary text-xs hover:underline">
                      Кушодан →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {applications.length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <span className="font-medium">Дархостҳои ман</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-border text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3 font-normal">Лоиҳа</th>
                <th className="text-left px-6 py-3 font-normal">Ҳолат</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a.id} className="border-b border-gray-800">
                  <td className="px-6 py-4">{a.project_title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-950 text-yellow-400 border border-yellow-900 px-2 py-1 rounded-full text-xs">
                      Дар интизор
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;