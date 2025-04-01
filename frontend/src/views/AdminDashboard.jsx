import { useState, useEffect, useCallback } from 'react';
import { Toolbar, CssBaseline, Container, CircularProgress, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import CustomDrawer from '../components/CustomDrawer';
import MenuItem from '../components/MenuItem';
import { getMenuItems } from '../Services/menuItems';
import WelcomeAdmin from '../components/WelcomeAdmin';
import { useAuth } from '../components/AuthContext'; // Asumiendo que tienes un AuthContext

const MainContent = () => (
  <Container>
    <Toolbar />
    <WelcomeAdmin />
  </Container>
);

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Obtener información del usuario autenticado

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Función memoizada para cargar los items del menú
  const loadMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      const items = await getMenuItems();
      setMenuItems(items || []);
      
      // Guardar en sessionStorage para persistencia
      if (items && items.length > 0) {
        sessionStorage.setItem('cachedMenuItems', JSON.stringify(items));
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
      
      // Intentar recuperar del cache si hay error
      const cached = sessionStorage.getItem('cachedMenuItems');
      if (cached) {
        setMenuItems(JSON.parse(cached));
      } else {
        setMenuItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para carga inicial y cambios de autenticación
  useEffect(() => {
    // Cargar desde cache inmediatamente si existe
    const cached = sessionStorage.getItem('cachedMenuItems');
    if (cached) {
      setMenuItems(JSON.parse(cached));
    }
    
    // Luego cargar datos frescos
    loadMenuItems();
  }, [loadMenuItems, user?.roles]); // Dependencia de roles del usuario

  // Escuchar cambios en sessionStorage desde otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'selectedRoles' || e.key === 'cachedMenuItems') {
        loadMenuItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadMenuItems]);

  // Mostrar loading state
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      
      <Box display="flex" flexGrow={1}>
        <SideBar
          open={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          menuItems={menuItems}
          MenuItem={MenuItem}
          CustomDrawer={CustomDrawer}
        />
        
        <Box 
          component="main" 
          flexGrow={1} 
          overflow="auto"
          sx={{
            transition: (theme) => theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: mobileOpen ? 0 : `-${drawerWidth}px`,
            ...(mobileOpen && {
              transition: (theme) => theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginLeft: 0,
            }),
          }}
        >
          <MainContent />
        </Box>
      </Box>
    </Box>
  );
};

// Define el ancho del drawer
const drawerWidth = 240;

export default AdminDashboard;