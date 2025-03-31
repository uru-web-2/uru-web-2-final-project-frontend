import React, { useState, useEffect } from 'react';
import GridGeneric from '../components/GridGeneric'; 
import Layout from '../components/Layout';
import { apiService } from '../Services/Services';
import LocationModal from '../components/LocationModal';
import { useNavigate } from 'react-router-dom';

const Locations = () => {

    // Removed duplicate navigate declaration
    const [locations, setLocations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [state, setState] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocations = async () => {
        try {
            const response = await apiService.getAllLocations();
            setLocations(response.data.locations);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
        }
        fetchLocations();
    }, [state]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'floor', label: 'Floor' },
        { key: 'area', label: 'Area' }
    ];

    const handleEdit = (item) => {
        setCurrentLocation(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (item) => {
        console.log('Delete location:', item);
        
        try {
        const response = await apiService.removeLocation(item.id);

        if(response.status === 'success' || response.status === 200) {
            console.log('Location deleted successfully!');
            setState(Math.random()); 
        } else {
            console.error('Error deleting location:', response);
        }
        } catch(error) {
        console.error('Error deleting location:', error);
        }
    };

    const handleAdd = () => {
        setCurrentLocation(null);
        setIsModalOpen(true);
    };

    const handleViewSections = (locationId) => {
        console.log('View sections for location:', locationId);
        
        navigate(`/inventory/maintenance/locations/section/${locationId}`);
    };

    const handleSearchClick = async (location) => {
        try {
        const response = await apiService.searchLocationByFloor(location);

        if(response.data.locations.length === 0) {
            console.log('No results found');
            return;
        }
        
        if(response.status === 'success' || response.status === 200) {
            setLocations(response.data.locations);
        }
        } catch (error) {
        console.log(error);
        }
    }

    const handleSaveLocation = async(locationData) => {
        if (currentLocation) {
        try {
            const response = await apiService.updateLocation(currentLocation.id, locationData);

            if (response.status === 'success' || response.status === 201) {
            console.log('Location updated successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error updating location:', response);
            }
        } catch (error) {
            console.error('Error updating location:', error);
        }
        } else {
        try {
            const response = await apiService.createLocation(locationData);
            
            if (response.status === 'success' || response.status === 201) {
            console.log('Location created successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error creating location:', response.data);
            }
        } catch(error) {
            console.error('Error creating location:', error);
        }
        }
        setIsModalOpen(false);
    };

    const customActions = [
        {
        label: 'Sections',
        color: 'secondary',
        onClick: (item) => handleViewSections(item.id),
        },
    ];

    return (
        <Layout>
            <GridGeneric
                title="Locations"
                data={locations}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onSearch={handleSearchClick}
                customActions={customActions}
            />
            <LocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLocation}
                initialData={currentLocation}
            />
        </Layout>
    );
    };

    export default Locations;