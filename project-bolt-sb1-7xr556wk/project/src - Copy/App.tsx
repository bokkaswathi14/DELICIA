import React, { useState } from 'react';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LearnMorePage from './pages/LearnMorePage';

type PageType = 'home' | 'contact' | 'about' | 'learn-more';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'learn-more':
        return <LearnMorePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex flex-col">
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Delicia Recipes
          </button>
          <div className="flex space-x-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'about' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => setCurrentPage('learn-more')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'learn-more' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Learn More
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'contact' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;