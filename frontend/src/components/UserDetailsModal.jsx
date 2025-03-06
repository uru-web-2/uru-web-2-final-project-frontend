import React from 'react';
import ModalWrapper from './ModalWrapper'; // Asegúrate de que la ruta de importación sea correcta
import '../components/CSS/UserModal.css'; // Importa el archivo CSS para estilos personalizados
import { FaTimes } from 'react-icons/fa'; // Importa el icono de X para eliminar perfiles

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const handleDeleteProfile = (profile) => {
    // Lógica para eliminar el perfil
    console.log(`Eliminar perfil: ${profile}`);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Detalles del Usuario"
      onClose={onClose}
    >
      <div className="user-details-container">
        {/* Primer bloque de detalles (Nombre, Apellido, Email, Username) */}
        <div className="user-details-column">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Apellido:</strong> {user?.lastname}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Username:</strong> {user?.username}</p>
        </div>

        {/* Segundo bloque de detalles (País, Tipo de Documento, Número de Documento) */}
        <div className="user-details-column">
          <p><strong>País:</strong> {user?.country}</p>
          <p><strong>Tipo de Documento:</strong> {user?.type_document}</p>
          <p><strong>Número de Documento:</strong> {user?.number_document}</p>
        </div>
      </div>

      {/* Bloque de perfiles */}
      <div className="profiles-container">
        <div className='profiles-header'>
          <h3>Perfiles</h3>
          <select>
            <option value="">Ingresar</option>
            {/* Opciones adicionales si es necesario */}
          </select>
        </div>
        
        <div className="profiles-list">
          {user?.role?.map((profile, index) => (
            <div key={index} className="profile-item">
              {profile}
              <FaTimes className="delete-icon" onClick={() => handleDeleteProfile(profile)} />
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UserDetailsModal;