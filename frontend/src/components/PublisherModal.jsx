import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import { TextField, Button } from '@mui/material';

const PublisherModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [publisherData, setPublisherData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (initialData) {
            setPublisherData(initialData);
        } else {
            setPublisherData({ name: '', description: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublisherData({
            ...publisherData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(publisherData);
        setPublisherData({ name: '', description: '' });
        onClose();
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            title={initialData ? "Edit Publisher" : "Add New Publisher"}
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
                    value={publisherData.name}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
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
                />
            </form>
        </ModalWrapper>
    );
};

export default PublisherModal;