import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';

const CreateUserModal = ({ isOpen, onClose, onCreateUser }) => {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    document_country: '',
    document_type: '',
    document_number: ''
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUser(formData);
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Crear Usuario"
      onClose={onClose}
      actions={
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear
        </Button>
      }
      sx={{ width: 400 }} // Ajustar el ancho del modal
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          size="small" // Hacer los campos más compactos
        />
        <TextField
          fullWidth
          label="Apellido"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Nombre de usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="País del documento"
          name="document_country"
          value={formData.document_country}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Tipo de documento"
          name="document_type"
          value={formData.document_type}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Número de documento"
          name="document_number"
          value={formData.document_number}
          onChange={handleChange}
          margin="normal"
          size="small"
        />
      </form>
    </ModalWrapper>
  );
};

export default CreateUserModal;