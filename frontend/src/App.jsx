import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddRecipe } from './pages/AddRecipe';
import { Profile } from './pages/Profile';
import GlobalSearch from './components/GlobalSearch';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header onSearch={handleSearch} />
          
          <main className="flex-1">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    searchQuery={searchQuery} 
                    key={searchQuery}
                  />
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/global-search" element={<GlobalSearch />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
