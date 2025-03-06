import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import CustomDrawer from '../components/CustomDrawer'; // Importa CustomDrawer
import MenuItem from '../components/MenuItem'; // Importa MenuItem
import { menuItems } from '../Services/menuItems'; // Importa menuItems
import WelcomeAdmin from '../components/WelcomeAdmin';
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos

const MainContent = () => (
  <Container>
    <Toolbar /> {/* Espacio para el AppBar */}
    <WelcomeAdmin  /> {/* Pasa la data como prop */}
  </Container>
);

const AdminDashboard = () => {
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
        menuItems={menuItems}
        MenuItem={MenuItem}
        //listItemTextStyles={listItemTextStyles}
        CustomDrawer={CustomDrawer}
      />
      <MainContent />
    </div>
  );
};

export default AdminDashboard;