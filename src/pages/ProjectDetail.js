import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/projects/${id}/`)
      .then(res => { setProject(res.data); setLoading(false); })
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
      setSent(true);
      setMessage('');
    } catch {}
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-400">Зеркунӣ...</div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-400">Лоиҳа ёфт нашуд</div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8 transition-colors"
      >
        ← Бозгашт
      </button>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-5">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="text-xs bg-purple-950 text-purple-400 border border-purple-800 px-3 py-1 rounded-full">
                {project.category_name || 'Умумӣ'}
              </span>
              <span className="text-xs bg-green-950 text-green-400 border border-green-800 px-3 py-1 rounded-full">
                Дастрас
              </span>
            </div>
            <h1 className="text-2xl font-medium leading-snug">{project.title}</h1>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Тавсиф</h3>
            <p className="text-gray-300 leading-relaxed text-sm">{project.description}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider">Таҳлили AI</h3>
              <button
                onClick={generateAI}
                disabled={aiLoading}
                className="text-xs bg-primary text-white px-4 py-1.5 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
              >
                {aiLoading ? 'Тайёр мешавад...' : '✦ Тавлид кун'}
              </button>
            </div>
            {project.ai_business_plan ? (
              <div className="bg-purple-950 bg-opacity-50 border border-purple-900 rounded-xl p-4">
                <p className="text-purple-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {project.ai_business_plan}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Ҳанӯз тавлид нашудааст — тугмаро зан!</p>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-950 flex items-center justify-center text-purple-300 font-medium text-lg flex-shrink-0">
              {project.author_name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{project.author_name}</div>
              <div className="text-xs text-gray-500 mt-0.5">Олим</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-3xl font-medium mb-1">{project.price} сом.</div>
            <p className="text-gray-500 text-xs mb-5">Лиценз / хариди ҳуқуқ</p>
            {sent ? (
              <div className="bg-green-950 border border-green-800 text-green-400 rounded-xl p-3 text-sm text-center">
                Дархост фиристода шуд! ✓
              </div>
            ) : (
              <>
                <textarea
                  className="w-full bg-dark border border-gray-700 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-primary resize-none transition-colors"
                  rows={3}
                  placeholder="Паёми худро навис..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <button
                  onClick={sendApplication}
                  className="w-full bg-primary text-white rounded-xl py-3 text-sm font-medium hover:opacity-90"
                >
                  Дархост фиристодан
                </button>
              </>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Маълумот</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Марҳала</span>
                <span className="text-gray-300">Патент</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Дархостҳо</span>
                <span className="text-gray-300">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Мӯҳлат</span>
                <span className="text-green-400">Боз аст</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;