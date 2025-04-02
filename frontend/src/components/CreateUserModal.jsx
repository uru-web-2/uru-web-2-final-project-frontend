import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { countryList } from '../Services/countryService';
import useValidator from '../components/useValidator';

const CreateUserModal = ({ isOpen, onClose, onCreateUser }) => {
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

  const { errors, validateField, validateForm, clearErrors } = useValidator();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getValidationRules = () => {
    const rules = {
      first_name: [
        { type: 'required' },
        { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
        { type: 'maxLength', max: 30 }
      ],
      last_name: [
        { type: 'required' },
        { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
        { type: 'maxLength', max: 20, message: 'Max 20 characters allowed' }
      ],
      username: [
        { type: 'required' },
        { type: 'regex', pattern: /^[a-zA-Z0-9_-]{4,20}$/, message: '4-20 chars, letters, numbers, hyphens or underscores' }
      ],
      email: [
        { type: 'required' },
        { type: 'regex', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
      ],
      password: [
        { type: 'required' },
        { type: 'minLength', min: 8, message: 'Minimum 8 characters' }
      ],
      document_country: [
        { type: 'required' }
      ],
      document_type: [
        { type: 'required' }
      ]
    };

    if (formData.document_type === 'Identity Document') {
      rules.document_number = [
        { type: 'required' },
        { type: 'regex', pattern: /^(\d{6,9}|E-\d{8})$/, message: '6–9 digits' }
      ];
    } else if (formData.document_type === 'Passport') {
      rules.document_number = [
        { type: 'required' },
        { type: 'regex', pattern: /^[A-Za-z0-9]{9}$/, message: 'Passport must be 9 alphanumeric characters' }
      ];
    }

    return rules;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (['first_name', 'last_name'].includes(name)) {
      newValue = capitalizeFirstLetter(value);
    }

    setFormData({
      ...formData,
      [name]: newValue
    });

    validateField(name, newValue, getValidationRules()[name]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rules = getValidationRules();
    const isValid = validateForm(formData, rules);
  
    if (!isValid) {
      setOpenSnackbar(true); 
      return;
    }
  
    onCreateUser(formData);
    clearErrors();
    onClose();
  };
  

  return (
    <>
    <ModalWrapper
      isOpen={isOpen}
      title="Create User"
      onClose={() => {
        clearErrors();
        onClose();
      }}
      actions={
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear
        </Button>
      }
      sx={{ width: 400 }}
    >
      <form onSubmit={handleSubmit} style={{maxHeight: '65vh', overflowY: 'auto',paddingRight: '0.5rem',}}>        
        <TextField
          fullWidth
          label="Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          size="small"
          error={!!errors.first_name}
          helperText={errors.first_name}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          size="small"
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          size="small"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          size="small"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          size="small"
          error={!!errors.password}
          helperText={errors.password}
        />
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id="document-country-label">Document Country</InputLabel>
          <Select
            labelId="document-country-label"
            id="document-country"
            label="Document Country"
            name="document_country"
            value={formData.document_country}
            onChange={handleChange}
            error={!!errors.document_country}
          >
            {countryList.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id="document-type-label">Document Type</InputLabel>
          <Select
            labelId="document-type-label"
            id="document-type"
            label="Document Type"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            error={!!errors.document_type}
          >
            <MenuItem value="Identity Document">Identity Document</MenuItem>
            <MenuItem value="Passport">Passport</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Document Number"
          name="document_number"
          value={formData.document_number}
          onChange={handleChange}
          margin="normal"
          size="small"
          error={!!errors.document_number}
          helperText={errors.document_number}
        />
      </form>
    </ModalWrapper>
    <Snackbar
    open={openSnackbar}
    autoHideDuration={4000}
    onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
      onClose={() => setOpenSnackbar(false)}
      severity="error"
      sx={{ width: '100%' }}
      >
        Please correct the validation errors before submitting.
        </Alert>
        </Snackbar>
        </>
  );
};

export default CreateUserModal;
