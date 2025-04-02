import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';
import useValidator from '../components/useValidator';
import { Snackbar, Alert } from '@mui/material';

const CategoryModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const validationRules = {
        name: [
          { type: 'required' },
          { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
          { type: 'maxLength', max: 30, message: 'Max 30 characters allowed' }
        ],
        description: [
          { type: 'required' },
          { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]*$/, message: 'Invalid characters in description' },
          { type: 'maxLength', max: 300, message: 'Max 300 characters allowed' }
        ]
      };

      const { errors, validateField, validateForm, clearErrors } = useValidator();

      const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      };

    useEffect(() => {
        if (initialData) {
        setCategoryData(initialData);
        } else {
        setCategoryData({ name: '', description: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const normalizedValue =
        name === 'name' ? capitalizeFirstLetter(value) : value;

        setCategoryData({
        ...categoryData,
        [name]: normalizedValue
        });

        validateField(name, normalizedValue, validationRules[name]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm(categoryData, validationRules);
        if (!isValid) {
          setOpenSnackbar(true);
          return;
        }
    
        onSave(categoryData);
        clearErrors();
        setCategoryData({ name: '', description: '' });
        onClose();
      };

      const handleClose = () => {
        clearErrors();
        setCategoryData({ name: '', description: '' });
        onClose();
      };

    return (
        <>
        <ModalWrapper
        isOpen={isOpen}
        title={initialData ? "Edit Category" : "Add New Category"}
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
            fullWidth
            label="Name"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
            error={!!errors.name}
            helperText={errors.name}
            />
            <TextField
            fullWidth
            label="Description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            margin="normal"
            size="small"
            multiline
            rows={4}
            required
            error={!!errors.description}
            helperText={errors.description}
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

export default CategoryModal;