import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import Layout from '../components/Layout';
import GridUsers from '../components/GridUsers';
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos
import { menuItems} from "../Services/menuItems";


const MainContent = () => (
  <Container>
    <GridUsers /> {/* Pasa la data como prop */}
  </Container>
);

const UsersPage = () => {
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Layout menuItemsGeneral={menuItems}>
      <MainContent/>
    </Layout>
  );
};

export default UsersPage;