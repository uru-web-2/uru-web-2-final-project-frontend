import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';
import useValidator from '../components/useValidator'; 
import {Snackbar, Alert} from '@mui/material';
const LocationModal = ({ isOpen, onClose, onSave, initialData }) => {

  const [locationData, setLocationData] = useState({
    floor: '',
    area: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationRules = {
    floor: [
      { type: 'required' },
      { type: 'regex', pattern: /^[0-9]+$/, message: 'Only numbers allowed' },
      { type: 'maxLength', max: 20, message: 'Max 20 digits allowed' }
    ],
    area: [
      { type: 'required' },
      { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
      { type: 'maxLength', max: 20, message: 'Max 20 characters allowed' }
    ]
  };
  
  const { errors, validateField, validateForm, clearErrors} = useValidator();

  useEffect(() => {
    if (initialData) {
      setLocationData(initialData);
    } else {
      setLocationData({ floor: '', area: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value
    });

    validateField(name, value, validationRules[name]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(locationData, validationRules);
    if (!isValid) {
        setOpenSnackbar(true);
        console.log('Form is invalid', errors);
        return;
    }

    onSave(locationData);
    clearErrors();
    setLocationData({ floor: '', area: '' });
    onClose();
  };

  const handleClose=() => {
    clearErrors();
    setLocationData({ floor: '', area: '' });
    onClose();
  };

  return (
    <>
    <ModalWrapper
      isOpen={isOpen}
      title={initialData ? "Edit Location" : "Add New Location"}
      onClose={handleClose}
      actions={
        <>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {initialData ? "Update" : "Save"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          fullWidth
          label="Floor"
          name="floor"
          value={locationData.floor}
          onChange={handleChange}
          slotProps={{ input: { inputMode: 'numeric', pattern:'[0-9]*' } }}
          margin="normal"
          size="small"
          required
          error={!!errors.floor}
          helperText={errors.floor}
        />
        <TextField
          fullWidth
          label="Area"
          name="area"
          value={locationData.area}
          onChange={handleChange}
          margin="normal"
          size="small"
          required
          error={!!errors.area}
          helperText={errors.area}
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
          Please fix the validation errors before submitting.
        </Alert>
      </Snackbar>
    </>
  );
};


export default LocationModal;
