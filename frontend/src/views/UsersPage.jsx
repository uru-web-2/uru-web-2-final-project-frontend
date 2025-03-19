import { useState } from 'react';
import { Toolbar, CssBaseline, Container } from '@mui/material';
import Layout from '../components/Layout';
import GridUsers from '../components/GridUsers';
//import { drawerStyles, listItemTextStyles } from '../components/styles'; // Importa estilos

// Datos de ejemplo para la tabla
const users = [
  { id: 1, name: 'Mario', lastname: 'Castañeda', email: 'hold@gmail.com', username: 'mcastaneda', country: 'Venezuela', type_document: 'V', number_document: '30123032', role: ['Admin','user','lol','achu'], joinedAt: '12/12/2001' },
  { id: 2, name: 'Mario', lastname: 'Perez', email: 'mario@example.com', username: 'mperez', country: 'Venezuela', type_document: 'V', number_document: '30123032', role: ['User'], joinedAt: '10/10/2010' },
  { id: 3, name: 'Limpieza', lastname: 'Limpieza', email: 'limpieza@example.com', username: 'limpieza', country: 'Venezuela', type_document: 'V', number_document: '12345678', role: ['User'], joinedAt: '01/01/2020' },
  { id: 4, name: 'Estética', lastname: 'Limpieza', email: 'estetica@example.com', username: 'estetica', country: 'Venezuela', type_document: 'V', number_document: '87654321', role: ['User'], joinedAt: '05/05/2015' },
  { id: 5, name: 'Ortodoncia', lastname: 'Limpieza', email: 'ortodoncia@example.com', username: 'ortodoncia', country: 'Venezuela', type_document: 'V', number_document: '11223344', role: ['User'], joinedAt: '07/07/2017' },
  { id: 6, name: 'Cirugia', lastname: 'Limpieza', email: 'cirugia@example.com', username: 'cirugia', country: 'Venezuela', type_document: 'V', number_document: '44332211', role: ['User'], joinedAt: '09/09/2019' },
  { id: 7, name: 'Mario', lastname: 'Castañeda', email: 'hold@gmail.com', username: 'mcastaneda', country: 'Venezuela', type_document: 'V', number_document: '30123032', role: ['Admin'], joinedAt: '12/12/2001' },
  { id: 21, name: 'Mario', lastname: 'Perez', email: 'mario@example.com', username: 'mperez', country: 'Venezuela', type_document: 'V', number_document: '30123032', role: ['User'], joinedAt: '10/10/2010' },
  { id: 31, name: 'Limpieza', lastname: 'Limpieza', email: 'limpieza@example.com', username: 'limpieza', country: 'Venezuela', type_document: 'V', number_document: '12345678', role: ['User'], joinedAt: '01/01/2020' },
  { id: 41, name: 'Estética', lastname: 'Limpieza', email: 'estetica@example.com', username: 'estetica', country: 'Venezuela', type_document: 'V', number_document: '87654321', role: ['User'], joinedAt: '05/05/2015' },
  { id: 51, name: 'Ortodoncia', lastname: 'Limpieza', email: 'ortodoncia@example.com', username: 'ortodoncia', country: 'Venezuela', type_document: 'V', number_document: '11223344', role: ['User'], joinedAt: '07/07/2017' },
  { id: 61, name: 'Cirugia', lastname: 'Limpieza', email: 'cirugia@example.com', username: 'cirugia', country: 'Venezuela', type_document: 'V', number_document: '44332211', role: ['User'], joinedAt: '09/09/2019' },
];

const MainContent = () => (
  <Container>
    <GridUsers data={users} /> {/* Pasa la data como prop */}
  </Container>
);

const UsersPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Layout>
      <MainContent/>
    </Layout>
  );
};

export default UsersPage;