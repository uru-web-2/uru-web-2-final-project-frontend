import React, { useState, useEffect } from 'react';
import GridGeneric from '../components/GridGeneric'; 
import Layout from '../components/Layout';
import { apiService } from '../Services/Services';
import MagazineModal from '../components/MagazineModal';

const GridMagazines = () => {
    const [magazines, setMagazines] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMagazine, setCurrentMagazine] = useState(null);
    const [state, setState] = useState(null);

    useEffect(() => {
        const fetchMagazines = async () => {
        try {
            const response = await apiService.getAllMagazines();
            setMagazines(response.data.magazines);
        } catch (error) {
            console.error('Error fetching magazines:', error);
        }
        }
        fetchMagazines();
    }, [state]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { 
            key: 'releaseDate', 
            label: 'Release Date',
            format: (value) => value ? new Date(value).toLocaleString() : 'N/A'
        }
    ];

    const handleEdit = (item) => {
        setCurrentMagazine(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (item) => {
        console.log('Delete magazine:', item);
        
        try {
        const response = await apiService.removeMagazine(item.id);

        if(response.status === 'success' || response.status === 200) {
            console.log('Magazine deleted successfully!');
            setState(Math.random()); 
        } else {
            console.error('Error deleting magazine:', response);
        }
        } catch (error) {
        console.error('Error deleting magazine:', error);
        }
    };

    const handleAdd = () => {
        setCurrentMagazine(null);
        setIsModalOpen(true);
    };

    const handleSearchClick = async (searchTerm) => {
        try {
        const response = await apiService.searchMagazineByName(searchTerm);

        if(response.data.magazines.length === 0) {
            console.log('No results found');
            return;
        }
        
        if(response.status === 'success' || response.status === 200) {
            setMagazines(response.data.magazines);
        }
        } catch (error) {
        console.log(error);
        }
    }

    const handleSaveMagazine = async(magazineData) => {
        if (currentMagazine) {
        try {
            const response = await apiService.updateMagazine(currentMagazine.id, magazineData);

            if (response.status === 'success' || response.status === 201) {
            console.log('Magazine updated successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error updating magazine:', response);
            }
        } catch (error) {
            console.error('Error updating magazine:', error);
        }
        } else {
        try {
            const response = await apiService.createMagazine(magazineData);
            
            if (response.status === 'success' || response.status === 201) {
            console.log('Magazine created successfully!');
            setState(Math.random()); 
            } else {
                
                console.log(magazineData);
            console.error('Error creating magazine:', response.data);
            }
        } catch(error) {
            
            
            console.error('Error creating magazine:', error);
        }
        }
        setIsModalOpen(false);
    };

    return (
        <Layout>
        <GridGeneric
            title="Magazines"
            data={magazines}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onSearch={handleSearchClick}
        />
        
        <MagazineModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveMagazine}
            initialData={currentMagazine}
        />
        </Layout>
    );
};

export default GridMagazines;