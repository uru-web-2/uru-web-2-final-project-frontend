import React, { useEffect } from 'react';
import ModalWrapper from './ModalWrapper'; // Asegúrate de que la ruta de importación sea correcta
import '../components/CSS/UserModal.css'; // Importa el archivo CSS para estilos personalizados
import { FaTimes } from 'react-icons/fa'; // Importa el icono de X para eliminar perfiles

const UserDetailsModal = ({ isOpen, onClose, user, userDetails }) => {
  const handleDeleteProfile = (profile) => {
    // Lógica para eliminar el perfil
    console.log(`Eliminar perfil: ${profile}`);
  };

  const profiles = {
    1: 'student',
    2: 'teacher',
    3: 'librarian',
    4: 'admin',
    5: 'superadmin',
    6: 'developer',
  }

  useEffect(() => {
    console.log(userDetails,'userdetails');
    console.log(userDetails[0].user_profile_ids, 'userDetails.user_profile_ids');
  }, [userDetails]);


  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Detalles del Usuario"
      onClose={onClose}
    >
      <div className="user-details-container">
        {/* Primer bloque de detalles (Nombre, Apellido, Email, Username) */}
        <div className="user-details-column">
          <p><strong>Nombre:</strong> {user?.user_first_name}</p>
          <p><strong>Apellido:</strong> {user?.user_last_name}</p>
          <p><strong>Email:</strong> {user?.user_email}</p>
          <p><strong>Username:</strong> {user?.user_username}</p>
        </div>

        {/* Segundo bloque de detalles (País, Tipo de Documento, Número de Documento) */}
        <div className="user-details-column">
          <p><strong>País:</strong> {user?.user_country}</p>
          <p><strong>Tipo de Documento:</strong> {user?.user_type_document}</p>
          <p><strong>Número de Documento:</strong> {user?.user_number_document}</p>
        </div>
      </div>

      {/* Bloque de perfiles */}
<div className="profiles-container">
  <div className='profiles-header'>
    <h3>Perfiles</h3>
    <select>
      <option value="">Ingresar</option>
    </select>
  </div>
  
  <div className="profiles-list">
    {userDetails[0]?.user_profile_ids?.map((profileId, index) => {
      console.log(userDetails[0].user_profile_ids, 'userDetails.user_profile_ids');
      
      const profileName = profiles[profileId] || `Perfil desconocido (ID: ${profileId})`;
      console.log(profileName, 'profileName');
      
      return (
        <div key={index} className="profile-item">
          {profileName}
          <FaTimes 
            className="delete-icon" 
            onClick={() => handleDeleteProfile(profileId)} 
          />
        </div>
      );
    })}
  </div>
</div>
    </ModalWrapper>
  );
};

export default UserDetailsModal;