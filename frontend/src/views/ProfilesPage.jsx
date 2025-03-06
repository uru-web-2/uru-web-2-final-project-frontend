import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import GridProfiles from '../components/GridProfiles';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import CustomDrawer from '../components/CustomDrawer'; // Importa CustomDrawer
import MenuItem from '../components/MenuItem'; // Importa MenuItem
import { menuItems } from '../Services/menuItems'; // Importa menuItems
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos

// Datos de ejemplo para la tabla

const profiles = [
  { id: 1, name: 'student'},
  { id: 2, name: 'student'},
  { id: 3, name: 'student'}
]

const MainContent = () => (
  <Container>
    <Toolbar /> {/* Espacio para el AppBar */}
    <GridProfiles data={profiles} /> {/* Pasa la data como prop */}
  </Container>
);

const ProfilesPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div style={{ 
      backgroundColor: '#F5F5F5', 
      height: '100vh', 
      width: '98.4vw', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      left: '-140px',
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

export default ProfilesPage;