import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  // Cambiado a DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const MagazineModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [magazineData, setMagazineData] = useState({
        name: '',
        description: '',
        releaseDate: null
    });

    useEffect(() => {
        if (initialData) {
            setMagazineData({
                ...initialData,
                releaseDate: initialData.releaseDate ? 
                    new Date(initialData.releaseDate.split('T')[0]) : null
            });
        } else {
            setMagazineData({ 
                name: '', 
                description: '', 
                releaseDate: null 
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMagazineData({
            ...magazineData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setMagazineData({
            ...magazineData,
            releaseDate: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...magazineData,
            releaseDate: magazineData.releaseDate ? 
                magazineData.releaseDate.toISOString().split('T')[0] : 
                null
        };
        onSave(dataToSave);
        onClose();
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            title={initialData ? "Edit Magazine" : "Add New Magazine"}
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
                    fullWidth
                    label="Name"
                    name="name"
                    value={magazineData.name}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={magazineData.description}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    multiline
                    rows={4}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker 
                        label="Release Date"
                        value={magazineData.releaseDate}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                margin="normal" 
                                size="small" 
                            />
                        )}
                    />
                </LocalizationProvider>
            </form>
        </ModalWrapper>
    );
};

export default MagazineModal;