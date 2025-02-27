import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import GridContainer from '../components/GridContainer';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import CustomDrawer from '../components/CustomDrawer'; // Importa CustomDrawer
import MenuItem from '../components/MenuItem'; // Importa MenuItem
import { menuItems } from '../Services/menuItems'; // Importa menuItems
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos

// Datos de ejemplo para la tabla
const users = [
  { id: 1, name: 'Mario Castañeda', lastName: 'Perez', email: 'hold@gmail.com', idDocument: 'V-30123032', joinedAt: '12/12/2001' },
  { id: 2, name: 'Mario Perez', lastName: 'Mario Perez', email: 'mario@example.com', idDocument: 'V-30123032', joinedAt: '10/10/2010' },
  { id: 3, name: 'Limpieza', lastName: 'Limpieza', email: 'limpieza@example.com', idDocument: 'V-12345678', joinedAt: '01/01/2020' },
  { id: 4, name: 'Limpieza', lastName: 'Estética', email: 'estetica@example.com', idDocument: 'V-87654321', joinedAt: '05/05/2015' },
  { id: 5, name: 'Limpieza', lastName: 'Ortodoncia', email: 'ortodoncia@example.com', idDocument: 'V-11223344', joinedAt: '07/07/2017' },
  { id: 6, name: 'Limpieza', lastName: 'Cirugia', email: 'cirugia@example.com', idDocument: 'V-44332211', joinedAt: '09/09/2019' },
  { id: 7, name: 'Mario Castañeda', lastName: 'Perez', email: 'hold@gmail.com', idDocument: 'V-30123032', joinedAt: '12/12/2001' },
  { id: 21, name: 'Mario Perez', lastName: 'Mario Perez', email: 'mario@example.com', idDocument: 'V-30123032', joinedAt: '10/10/2010' },
  { id: 31, name: 'Limpieza', lastName: 'Limpieza', email: 'limpieza@example.com', idDocument: 'V-12345678', joinedAt: '01/01/2020' },
  { id: 41, name: 'Limpieza', lastName: 'Estética', email: 'estetica@example.com', idDocument: 'V-87654321', joinedAt: '05/05/2015' },
  { id: 51, name: 'Limpieza', lastName: 'Ortodoncia', email: 'ortodoncia@example.com', idDocument: 'V-11223344', joinedAt: '07/07/2017' },
  { id: 61, name: 'Limpieza', lastName: 'Cirugia', email: 'cirugia@example.com', idDocument: 'V-44332211', joinedAt: '09/09/2019' },
  // Agrega más datos si es necesario
];

const profiles = [
  { id: 1, name: 'student'},
  { id: 2, name: 'student'},
  { id: 3, name: 'student'}
]

const MainContent = () => (
  <Container>
    <Toolbar /> {/* Espacio para el AppBar */}
    <GridContainer data={users} /> {/* Pasa la data como prop */}
  </Container>
);

const UsersPage = () => {
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

export default UsersPage;