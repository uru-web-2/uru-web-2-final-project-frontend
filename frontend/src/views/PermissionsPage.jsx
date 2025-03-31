import { Container } from '@mui/material';
import PermissionsGrid from '../components/PermissionsGrid'; // Importa el componente PermissionsGrid
import Layout from '../components/Layout';
import { menuItems} from "../Services/menuItems";

const MainContent = () => (
  <Container>
    <PermissionsGrid /> {/* No necesita props */}
  </Container>
);

function PermissionsPage() {
  return (
    <Layout menuItemsGeneral={menuItems}>
      <MainContent />
    </Layout>
  );
}

export default PermissionsPage;