import NavbarHomepage from '../components/NavbarV2';
import StudentHomePage from './StudentHomepage';

const PublicHomepage = () => {
  return (
    <>
      <NavbarHomepage />
      <main style={{ marginTop: '80px' }}>
        <h1>Bienvenido a la Biblioteca Digital</h1>
        <p>Explora sin necesidad de estar registrado</p>
      </main>
    </>
  );
};

export default PublicHomepage;
