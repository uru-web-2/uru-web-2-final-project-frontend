import { useState, useEffect } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import CustomDrawer from '../components/CustomDrawer'; // Importa CustomDrawer
import MenuItem from '../components/MenuItem'; // Importa MenuItem
import { getMenuItems } from '../Services/menuItems'; // Importa el método asíncrono
import WelcomeLibrarian from '../components/WelcomeLibrarian';

const MainContent = () => (
  <Container>
    <Toolbar /> {/* Espacio para el AppBar */}
    <WelcomeLibrarian /> {/* Pasa la data como prop */}
  </Container>
);

const LibrarianDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // Estado para almacenar los menuItems
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Cargar los menuItems de forma asíncrona
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const items = await getMenuItems(); // Llama al método asíncrono
        setMenuItems(items); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al cargar los menuItems:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    loadMenuItems();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',
        height: '100vh',
        width: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        left: '100px',
        position: 'relative',
      }}
    >
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <SideBar
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuItems={menuItems} // Pasa los menuItems cargados al SideBar
        MenuItem={MenuItem}
        CustomDrawer={CustomDrawer}
      />
      <MainContent />
    </div>
  );
};

export default LibrarianDashboard;