import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';

const LocationModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [locationData, setLocationData] = useState({
        floor: '',
        area: ''
    });

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    type='number'
                    fullWidth
                    label="Floor"
                    name="floor"
                    value={locationData.floor}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
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
                />
            </form>
        </ModalWrapper>
    );
};

export default LocationModal;