import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import CustomDrawer from '../components/CustomDrawer'; // Importa CustomDrawer
import MenuItem from '../components/MenuItem'; // Importa MenuItem
import { menuItemsLibrarian } from '../Services/menuItems'; // Importa menuItems
import WelcomeLibrarian from '../components/WelcomeLibrarian';
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos

const MainContent = () => (
  <Container>
    <Toolbar /> {/* Espacio para el AppBar */}
    <WelcomeLibrarian  /> {/* Pasa la data como prop */}
  </Container>
);

const LibrarianDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div style={{ 
      backgroundColor: '#F5F5F5', 
      height: '100vh', 
      width: '100vh', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      left: '100px',
      position: 'relative',
    }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <SideBar
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        //drawerStyles={drawerStyles}
        menuItems={menuItemsLibrarian}
        MenuItem={MenuItem}
        //listItemTextStyles={listItemTextStyles}
        CustomDrawer={CustomDrawer}
      />
      <MainContent />
    </div>
  );
};

export default LibrarianDashboard;