// MenuContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getMenuItems } from '../Services/menuItems';
import { AuthContext } from './AuthContext'; // Importa el AuthContext

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const { isAuthenticated } = useContext(AuthContext); // Usamos el AuthContext existente

  const updateMenu = async () => {
    const items = await getMenuItems();
    setMenuItems(items);
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateMenu();
    } else {
      setMenuItems([]); // Limpiar menú si no está autenticado
    }
  }, [isAuthenticated]);

  return (
    <MenuContext.Provider value={{ menuItems }}>
      {children}
    </MenuContext.Provider>
  );
};