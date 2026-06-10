import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
      <Link to="/" className="text-xl font-medium">
        Ilm<span className="text-primary">Bozor</span>
      </Link>
      <div className="flex gap-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-white">Лоиҳаҳо</Link>
        <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
      </div>
      <div className="flex gap-3">
        {token ? (
          <button
            onClick={logout}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-card"
          >
            Баромад
          </button>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-card">
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