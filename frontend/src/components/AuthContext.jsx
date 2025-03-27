import { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificamos si existe 'selectedRoles' en localStorage
    const roles = sessionStorage.getItem('selectedRoles');
    
    if (roles) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    // Al hacer login, establecemos algún valor en selectedRoles
    sessionStorage.setItem('selectedRoles', 'user'); // Puedes guardar el rol real aquí
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Al hacer logout, eliminamos selectedRoles
    sessionStorage.removeItem('selectedRoles');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};