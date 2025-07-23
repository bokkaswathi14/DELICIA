import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Initialize demo users for authentication
const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem('delicia_users');
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 'demo-chef',
        name: 'Chef Marco',
        email: 'chef@delicia.com',
        password: 'demo123',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'demo-user',
        name: 'Food Lover',
        email: 'user@delicia.com',
        password: 'demo123',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];
    localStorage.setItem('delicia_users', JSON.stringify(demoUsers));
  }
};

// Initialize demo users on app start
initializeDemoUsers();

// ✅ Use optional chaining or null check for safety
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
