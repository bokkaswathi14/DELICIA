import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Plus, Menu, X, ChefHat } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Delicia</span>
          </Link>

          {/* Search Bar - Desktop */}
          {isHomePage && onSearch && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</Link>
              <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Recipes</Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">About</Link>
            </nav>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/add-recipe"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Recipe</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-6 py-2.5 text-orange-600 hover:text-orange-700 font-medium transition-colors">Login</Link>
                <Link to="/register" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        {isHomePage && onSearch && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 pt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">Home</Link>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">Recipes</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">About</Link>

              {user ? (
                <>
                  <Link to="/add-recipe" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Recipe</span>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
