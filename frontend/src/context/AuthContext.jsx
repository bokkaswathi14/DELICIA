import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('delicia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('delicia_users') || '[]');
    const existingUser = users.find(u => u.email === email && u.password === password);

    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      localStorage.setItem('delicia_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name, email, password) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('delicia_users') || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      profilePicture: null
    };

    users.push(newUser);
    localStorage.setItem('delicia_users', JSON.stringify(users));

    // Auto-login after register
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('delicia_user', JSON.stringify(userWithoutPassword));

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('delicia_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
