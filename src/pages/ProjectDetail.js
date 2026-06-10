import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/projects/${id}/`)
      .then(res => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const generateAI = async () => {
    if (!token) { navigate('/login'); return; }
    setAiLoading(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/projects/${id}/ai/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProject({ ...project, ai_business_plan: res.data.ai_business_plan });
    } catch {}
    setAiLoading(false);
  };

  const sendApplication = async () => {
    if (!token) { navigate('/login'); return; }
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/projects/applications/',
        { project: id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Дархост фиристода шуд!');
    } catch {
      alert('Хатогӣ!');
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Зеркунӣ...</div>;
  if (!project) return <div className="p-8 text-gray-400">Лоиҳа ёфт нашуд</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <p className="text-gray-400 text-sm mb-4 cursor-pointer hover:text-white"
            onClick={() => navigate('/')}>← Бозгашт</p>
          <h1 className="text-2xl font-medium mb-4">{project.title}</h1>
          <div className="flex gap-2 mb-6">
            <span className="text-xs bg-purple-900 text-purple-300 px-3 py-1 rounded-full">
              {project.category_name || 'Умумӣ'}
            </span>
            <span className="text-xs bg-green-900 text-green-300 px-3 py-1 rounded-full">
              Дастрас
            </span>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Тавсиф</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider">Таҳлили AI</h3>
              <button
                onClick={generateAI}
                disabled={aiLoading}
                className="text-xs bg-primary text-white px-3 py-1 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {aiLoading ? 'Тайёр мешавад...' : '✦ Тавлид кун'}
              </button>
            </div>
            {project.ai_business_plan ? (
              <p className="text-purple-300 text-sm leading-relaxed whitespace-pre-wrap">
                {project.ai_business_plan}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">Ҳанӯз тавлид нашудааст</p>
            )}
          </div>
        </div>

        <div>
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="text-3xl font-medium mb-1">{project.price} сом.</div>
            <p className="text-gray-400 text-sm mb-4">Лиценз / хариди ҳуқуқ</p>
            <textarea
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-primary resize-none"
              rows={3}
              placeholder="Паёми худро навис..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              onClick={sendApplication}
              className="w-full bg-primary text-white rounded-lg py-3 text-sm font-medium hover:opacity-90 mb-2"
            >
              Дархост фиристодан
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center text-sm font-medium text-purple-300">
                {project.author_name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-sm">{project.author_name}</div>
                <div className="text-xs text-gray-400">Олим</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;