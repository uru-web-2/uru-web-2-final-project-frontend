import { createContext, useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    roles: []
  });

  useEffect(() => {
    const checkAuth = () => {
      const rolesJSON = sessionStorage.getItem('selectedRoles');
      if (rolesJSON) {
        setAuthState({
          isAuthenticated: true,
          roles: JSON.parse(rolesJSON)
        });
      }
    };
    checkAuth();
  }, []);

  const login = (roles) => {
    sessionStorage.setItem('selectedRoles', JSON.stringify(roles));
    setAuthState({
      isAuthenticated: true,
      roles
    });
  };

  const logout = () => {
    sessionStorage.removeItem('selectedRoles');
    setAuthState({
      isAuthenticated: false,
      roles: []
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado simplificado
export const useAuth = () => {
  return useContext(AuthContext);
};