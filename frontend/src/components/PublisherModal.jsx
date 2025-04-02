import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button, Snackbar, Alert} from '@mui/material';
import useValidator from '../components/useValidator';

const PublisherModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [publisherData, setPublisherData] = useState({
        name: '',
        description: ''
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const validationRules = {
        name: [
          { type: 'required' },
          { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
          { type: 'maxLength', max: 20, message: 'Max 20 characters allowed' }
        ],
        description: [
          { type: 'required' },
          { type: 'regex', pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Only letters allowed' },
          { type: 'maxLength', max: 100, message: 'Max 100 characters allowed' }
        ]
      };

      const { errors, validateField, validateForm, clearErrors } = useValidator();

      const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      };


    useEffect(() => {
        if (initialData) {
            setPublisherData(initialData);
        } else {
            setPublisherData({ name: '', description: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const normalizedValue =
        name === 'name' ? capitalizeFirstLetter(value) : value;

        setPublisherData({
            ...publisherData,
            [name]: normalizedValue
        });

        validateField(name, normalizedValue, validationRules[name]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const isValid = validateForm(publisherData, validationRules);
        if (!isValid) {
          setOpenSnackbar(true);
          return;
        }
    
        onSave(publisherData);
        clearErrors();
        setPublisherData({ name: '', description: '' });
        onClose();
      };

      const handleClose = () => {
        clearErrors();
        setPublisherData({ name: '', description: '' });
        onClose();
      };

    return (
        <>
        <ModalWrapper
            isOpen={isOpen}
            title={initialData ? "Edit Publisher" : "Add New Publisher"}
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
                    value={publisherData.name}
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
                    value={publisherData.description}
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
            <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
            Please fix the validation errors before submitting.
            </Alert>
            </Snackbar>
        </>
        );
    };

export default PublisherModal;