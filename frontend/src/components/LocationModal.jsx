import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';
import useValidator from '../components/useValidator'; // importamos el validador

const LocationModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [locationData, setLocationData] = useState({
    floor: '',
    area: ''
  });

  const validationRules = {
    floor: 'number', 
    area: 'text',    
  };

  const { errors, validateField, validateForm } = useValidator();

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
        console.log('Form is invalid', errors);
        return;
    }

    onSave(locationData);
    setLocationData({ floor: '', area: '' });
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title={initialData ? "Edit Location" : "Add New Location"}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose} color="secondary">
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
  );
};

export default LocationModal;
