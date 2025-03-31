import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import GridGeneric from '../components/GridGeneric'; 
import Layout from '../components/Layout';
import { apiService } from '../Services/Services';
import SectionModal from '../components/SectionModal';

const Sections = () => {
    
    const [sections, setSections] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [state, setState] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchSections = async () => {
        try {
            const response = await apiService.getLocationSectionsByLocationID(`${id}`); 
            console.log(response);
            
            setSections(response.data.location_sections);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
        }
        fetchSections();
    }, [state]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' }
    ];

    const handleEdit = (item) => {
        setCurrentSection(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (item) => {
        console.log('Delete section:', item);
        
        try {
        const response = await apiService.removeLocationSection(item.id);
        if(response.status === 'success' || response.status === 200) {
            console.log('Section deleted successfully!');
            setState(Math.random()); 
        } else {
            console.error('Error deleting section:', response);
        }
        } catch(error) {
        console.error('Error deleting section:', error);
        }
    };

    const handleAdd = () => {
        setCurrentSection(null);
        setIsModalOpen(true);
    };

    const handleSaveSection = async(sectionData) => {

        if (currentSection) {

        try {
            const response = await apiService.updateLocationSection(currentSection.id, sectionData.name);
            if (response.status === 'success' || response.status === 201) {
            console.log('Section updated successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error updating section:', response);
            }
        } catch (error) {
            console.error('Error updating section:', error);
        }
        } else {
        try {
            const response = await apiService.createLocationSection(`${id}`,sectionData.name);
            if (response.status === 'success' || response.status === 201) {
            console.log('Section created successfully!');
            setState(Math.random()); 
            } else {
            console.error('Error creating section:', response.data);
            }
        } catch(error) {
            console.error('Error creating section:', error);
        }
        }
        setIsModalOpen(false);
    };

    return (
        <Layout>
        <GridGeneric
            title="Sections"
            data={sections}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
        />
        
        <SectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveSection}
            initialData={currentSection}
        />
        </Layout>
    );
    };

    export default Sections;