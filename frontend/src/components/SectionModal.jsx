import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';

const SectionModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [sectionData, setSectionData] = useState({
        id: '',
        name: ''
    });

    useEffect(() => {
        if (initialData) {
            setSectionData(initialData);
        } else {
            setSectionData({ id: '', name: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionData({
            ...sectionData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(sectionData);
        setSectionData({ id: '', name: '' });
        onClose();
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            title={initialData ? "Edit Section" : "Add New Section"}
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
                />
            </form>
        </ModalWrapper>
    );
};

export default SectionModal;