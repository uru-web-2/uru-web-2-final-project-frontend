import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button, Snackbar, Alert} from '@mui/material';
import useValidator from '../components/useValidator';
const SectionModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [sectionData, setSectionData] = useState({
        id: '',
        name: ''
    });

    const { errors, validateField, validateForm, clearErrors } = useValidator();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const validationRules = {
        name: [
          { type: 'required' },
          { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
          { type: 'maxLength', max: 20, message: 'Max 20 characters allowed' }
        ]
      };

    useEffect(() => {
        if (initialData) {
            setSectionData(initialData);
        } else {
            setSectionData({ id: '', name: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
    validateField(name, value, validationRules[name]);
  };


    const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm(sectionData, validationRules);
    if (!isValid) {
      setOpenSnackbar(true);
      return;
    }

    onSave(sectionData);
    clearErrors();
    setSectionData({ id: '', name: '' });
    onClose();
  };

  const handleClose=() => {
    clearErrors();
    setSectionData({ id: '', name: ''});
    onClose();
  };

  
    return (
        <>
        <ModalWrapper
            isOpen={isOpen}
            title={initialData ? "Edit Section" : "Add New Section"}
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
                {initialData && (
                    <TextField
                        fullWidth
                        label="ID"
                        name="id"
                        value={sectionData.id}
                        onChange={handleChange}
                        margin="normal"
                        size="small"
                        disabled
                        required
                        error={!!errors.id}
                        helperText={errors.id}
                    />
                )}
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={sectionData.name}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                />
            </form>
        </ModalWrapper>

        <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          Please fix the validation errors before submitting.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SectionModal;