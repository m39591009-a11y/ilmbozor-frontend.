import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="text-center py-16 px-6">
        <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm text-primary mb-6">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          Платформаи инноватсионии Тоҷикистон
        </div>
        <h1 className="text-4xl font-medium mb-4">
          Илмро ба <span className="text-primary">тиҷорат</span> табдил кун
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Олимони Тоҷикистонро ба инвесторон пайваст мекунад
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90">
            Лоиҳа илова кун
          </Link>
          <Link to="/projects" className="px-6 py-3 border border-border rounded-xl hover:bg-card">
            Лоиҳаҳоро бин
          </Link>
        </div>
      </div>

      <div className="px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Лоиҳаҳои охирин</h2>
        </div>
        {loading ? (
          <p className="text-gray-400">Зеркунӣ...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400">Ҳанӯз лоиҳа нест</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map(project => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-purple-900 text-purple-300 px-3 py-1 rounded-full">
                      {project.category_name || 'Умумӣ'}
                    </span>
                    <span className="text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full">
                      AI
                    </span>
                  </div>
                  <h3 className="font-medium mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{project.price} сом.</span>
                    <span className="text-xs text-gray-500">{project.author_name}</span>
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