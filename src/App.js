import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/new" element={<NewProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;