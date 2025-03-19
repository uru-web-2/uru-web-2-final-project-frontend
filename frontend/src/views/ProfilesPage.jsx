import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import GridProfiles from '../components/GridProfiles';
import Layout from '../components/Layout';
import { getAllProfiles } from '../Services/permissionsPageService';

// eslint-disable-next-line react/prop-types
const MainContent = ({ profiles }) => (
  <Container>
    <GridProfiles data={profiles} /> {/* Pasa la data como prop */}
  </Container>
);

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllProfiles();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <Layout>
      <MainContent profiles={profiles} />
    </Layout>
  );
};

export default ProfilesPage;