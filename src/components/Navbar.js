import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{background: '#0a0a12'}} className="flex items-center justify-between px-6 py-4 border-b border-gray-800 sticky top-0 z-50">
      <Link to="/" className="text-lg font-medium tracking-tight">
        Ilm<span className="text-primary">Bozor</span>
      </Link>
      <div className="flex gap-6 text-sm text-gray-400">
        <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>
          Лоиҳаҳо
        </Link>
        <Link to="/dashboard" className={`hover:text-white transition-colors ${location.pathname === '/dashboard' ? 'text-white' : ''}`}>
          Dashboard
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {token ? (
          <button
            onClick={logout}
            className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-card text-gray-300"
          >
            Баромад
          </button>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white">
              Вуруд
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:opacity-90">
              Қайд
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;