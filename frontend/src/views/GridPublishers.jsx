import React, { useState, useEffect } from 'react';
import GridGeneric from '../components/GridGeneric'; 
import Layout from '../components/Layout';
import { apiService } from '../Services/Services';
import PublisherModal from '../components/PublisherModal';

const Publishers = () => {

const [publishers, setPublishers] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentPublisher, setCurrentPublisher] = useState(null);
const [state, setState] = useState(null);

    useEffect(() => {
        const fetchPublishers = async () => {
        try {
            const response = await apiService.getAllPublishers();
            setPublishers(response.data.publishers);
        } catch (error) {
            console.error('Error fetching publishers:', error);
        }
        }
        fetchPublishers();
        
    }, [state]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' }
    ];

    const handleEdit = (item) => {
        setCurrentPublisher(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (item) => {
        console.log('Delete publisher:', item);
        
        try {
        const response = await apiService.removePublisher(item.id);

        if(response.status === 'success' || response.status === 200) {
            console.log('Publisher deleted successfully!');
            setState(Math.random()); 
        } else {
            console.error('Error deleting publisher:', response);
        }
        } catch(error) {
        console.error('Error deleting publisher:', error);
        }
    };

    const handleAdd = () => {
        setCurrentPublisher(null);
        setIsModalOpen(true);
    };

    const handleSearchClick = async (publisher) => {
        try {
        const response = await apiService.searchPublisherByName(publisher);

        if(response.data.publishers.length === 0) {
            console.log('No results found');
            return;
        }
        
        if(response.status === 'success' || response.status === 200) {
            setPublishers(response.data.publishers);
        }
        } catch (error) {
        console.log(error);
        }
    }

    const handleSavePublisher = async(publisherData) => {
        if (currentPublisher) {
        try {
            const response = await apiService.updatePublisher(currentPublisher.id, publisherData);

            if (response.status === 'success' || response.status === 201) {
            console.log('Publisher updated successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error updating publisher:', response);
            }
        } catch (error) {
            console.error('Error updating publisher:', error);
        }
        } else {
        try {
            const response = await apiService.createPublisher(publisherData);
            
            if (response.status === 'success' || response.status === 201) {
            console.log('Publisher created successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error creating publisher:', response.data);
            }
        } catch(error) {
            console.error('Error creating publisher:', error);
        }
        }
        setIsModalOpen(false);
    };

    return (
        <Layout>
            <GridGeneric
                title="Publishers"
                data={publishers}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onSearch={handleSearchClick}
            />
            
            <PublisherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePublisher}
                initialData={currentPublisher}
            />
        </Layout>
    );
};

export default Publishers;