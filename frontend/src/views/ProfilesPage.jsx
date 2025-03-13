import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import GridProfiles from '../components/GridProfiles';
import Layout from '../components/Layout';
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos

// Datos de ejemplo para la tabla

const profiles = [
  { id: 1, name: 'student'},
  { id: 2, name: 'student'},
  { id: 3, name: 'student'}
]

const MainContent = () => (
  <Container>
    <GridProfiles data={profiles} /> {/* Pasa la data como prop */}
  </Container>
);

const ProfilesPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Layout>
      <MainContent />
    </Layout>
  );
};

export default ProfilesPage;