import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import '../components/CSS/UserModal.css';
import { FaTimes } from 'react-icons/fa';
import { apiService } from '../Services/Services';

const UserDetailsModal = ({ isOpen, onClose, user, userDetails }) => {
  // Estado local para manejar la lista de perfiles
  const [localProfiles, setLocalProfiles] = useState(userDetails?.out_user_profile_ids || []);

  // Efecto para actualizar localProfiles cuando userDetails cambie
  useEffect(() => {
    console.log('userDetails', user);
    
    if (userDetails?.user_profile_ids) {
      setLocalProfiles(userDetails.user_profile_ids);
    }
  }, [userDetails]);

  // Función para eliminar un perfil
  const handleDeleteProfile = async (profileId) => {
    try {
      // Llamar a la función revokeUserProfile para eliminar el perfil en el backend
      const response = await apiService.revokeUserProfile(user.username, profileId);

      // Verificar si la respuesta es exitosa
      if (response.status === 'success' || response.status === 200) {
        console.log('Perfil eliminado correctamente:', profileId);

        // Eliminar el perfil de la lista local
        const updatedProfiles = localProfiles.filter((id) => id !== profileId);
        setLocalProfiles(updatedProfiles); // Actualizar el estado local

        alert('Perfil eliminado correctamente');
      } else {
        console.error('Error al eliminar el perfil:', response.data);
        alert('Error al eliminar el perfil');
      }
    } catch (error) {
      console.error('Error al eliminar el perfil:', error);
      alert('Error al eliminar el perfil');
    }
  };

  // Función para asignar un nuevo perfil
  const handleAssignProfile = async (event) => {
    const profileId = event.target.value; // Obtener el ID del perfil seleccionado
    if (!profileId) return; // Si no se selecciona un perfil, no hacer nada

    try {
      // Llamar a la función assignuserProfile para asignar el perfil en el backend
      const response = await apiService.assignUserProfile(user.username, profileId);

      // Verificar si la respuesta es exitosa
      if (response.status === 'success' || response.status === 200) {
        console.log('Perfil asignado correctamente:', profileId);

        // Agregar el perfil a la lista local
        setLocalProfiles([...localProfiles, parseInt(profileId, 10)]); // Convertir a número y agregar

        alert('Perfil asignado correctamente');
      } else {
        console.error('Error al asignar el perfil:', response.data);
        alert('Error al asignar el perfil');
      }
    } catch (error) {
      console.error('Error al asignar el perfil:', error);
      alert('Error al asignar el perfil');
    }
  };

  // Mapeo de IDs de perfiles a nombres
  const profiles = {
    1: 'student',
    2: 'teacher',
    3: 'librarian',
    4: 'admin',
    5: 'superadmin',
    6: 'developer',
  };

  // Filtrar los perfiles que el usuario no tiene
  const availableProfiles = Object.keys(profiles)
    .map((id) => parseInt(id, 10)) // Convertir a número
    .filter((id) => !localProfiles.includes(id)); // Excluir los perfiles que ya tiene

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Detalles del Usuario"
      onClose={onClose}
    >
      <div className="user-details-container">
        {/* Primer bloque de detalles (Nombre, Apellido, Email, Username) */}
        <div className="user-details-column">
          <p><strong>Nombre:</strong> {userDetails?.user_first_name}</p>
          <p><strong>Apellido:</strong> {userDetails?.user_last_name}</p>
          <p><strong>Email:</strong> {userDetails?.user_email}</p>
          <p><strong>Username:</strong> {userDetails?.user_username}</p>
        </div>

        {/* Segundo bloque de detalles (País, Tipo de Documento, Número de Documento) */}
        <div className="user-details-column">
          <p><strong>País:</strong> {userDetails?.user_document_country}</p>
          <p><strong>Tipo de Documento:</strong> {userDetails?.user_document_type}</p>
          <p><strong>Número de Documento:</strong> {userDetails?.user_document_number}</p>
        </div>
      </div>

      {/* Bloque de perfiles */}
      <div className="profiles-container">
        <div className='profiles-header'>
          <h3>Perfiles</h3>
          <select onChange={handleAssignProfile} defaultValue="">
            <option value="" disabled>Seleccionar perfil</option>
            {availableProfiles.map((profileId) => (
              <option key={profileId} value={profileId}>
                {profiles[profileId]}
              </option>
            ))}
          </select>
        </div>

        <div className="profiles-list">
          {localProfiles.map((profileId, index) => {
            const profileName = profiles[profileId] || `Perfil desconocido (ID: ${profileId})`;
            console.log(profileName, 'profileName');

            return (
              <div key={index} className="profile-item">
                {profileName}
                <FaTimes
                  className="delete-icon"
                  onClick={() => handleDeleteProfile(profileId)} // Llamar a handleDeleteProfile con el profileId
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