import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AIRecipes from './pages/AIRecipes';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AddRecipe from './pages/AddRecipe';
import ToolDetail from './pages/ToolDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<AIRecipes />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/tool/:id" element={<ToolDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
