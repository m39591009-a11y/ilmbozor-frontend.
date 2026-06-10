import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('Ҳама');

  const filters = ['Ҳама', 'Тиб', 'IT', 'Кишоварзӣ', 'Энергетика'];

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(res => { setProjects(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="text-center py-20 px-6" style={{background: 'linear-gradient(180deg, #13102a 0%, #0f0f13 100%)'}}>
        <div className="inline-flex items-center gap-2 border border-purple-800 rounded-full px-4 py-2 text-xs text-purple-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          Платформаи инноватсионии Тоҷикистон
        </div>
        <h1 className="text-5xl font-medium mb-4 leading-tight tracking-tight">
          Илмро ба <span className="text-primary">тиҷорат</span><br />табдил кун
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Олимони Тоҷикистонро ба инвесторон пайваст мекунад. AI бизнес-план автоматӣ месозад.
        </p>
        <div className="flex gap-3 justify-center mb-16">
          <Link to="/register" className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90">
            Лоиҳа илова кун
          </Link>
          <Link to="/" className="px-6 py-3 border border-gray-700 rounded-xl text-sm hover:bg-card">
            Лоиҳаҳоро бин
          </Link>
        </div>
        <div className="flex justify-center gap-12 text-center">
          {[['240+', 'Лоиҳаи илмӣ'], ['85', 'Инвестор'], ['32', 'Муваффақ'], ['3', 'Забон']].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl font-medium text-white">{n}</div>
              <div className="text-xs text-gray-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Лоиҳаҳои охирин</h2>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  active === f
                    ? 'bg-purple-900 border-purple-600 text-purple-300'
                    : 'border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Зеркунӣ...</p>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-4">🔬</p>
            <p>Ҳанӯз лоиҳа нест</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map(project => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div className="bg-card border border-border rounded-xl p-5 hover:border-purple-700 transition-all duration-200 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-purple-950 text-purple-400 border border-purple-800 px-3 py-1 rounded-full">
                      {project.category_name || 'Умумӣ'}
                    </span>
                    <span className="text-xs bg-purple-900 bg-opacity-40 text-purple-300 px-2 py-1 rounded-full flex items-center gap-1">
                      ✦ AI
                    </span>
                  </div>
                  <h3 className="font-medium mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <span className="font-medium text-sm">{project.price} сом.</span>
                    <span className="text-xs text-gray-600">{project.author_name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;