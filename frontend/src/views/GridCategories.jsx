import React, { useState, useEffect } from 'react';
import GridGeneric from '../components/GridGeneric'; 
import Layout from '../components/Layout';
import { apiService } from '../Services/Services';
import CategoryModal from '../components/CategoryModal';
import { menuItems } from '../Services/menuItems';

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [state, setState] = useState(null);


  useEffect(() => {

    const fetchCategories = async () => {
      
      try {
        const response = await apiService.getAllTopics();
        setCategories(response.data.topics);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();

  }, [state]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' }
  ];

  const handleEdit = (item) => {
    setCurrentCategory(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    console.log('Delete category:', item);
    
    try{
      const response = await apiService.removeTopic(item.id);

      if(response.status === 'success' || response.status === 200){
        console.log('Category deleted successfully!');
        setState(Math.random()); 
      }else{
        console.error('Error deleting category:', response);
      }
    }catch{
      console.error('Error deleting category:', error);
    }
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setIsModalOpen(true);
  };

  const handleSearchClick = async (category) => {
  
      try {

        const response = await apiService.searchTopicByName(category)

        if(response.data.topics.length === 0){
          console.log('No results found');
          return;
        }
        
        if(response.status === 'success' || response.status === 200){
          setCategories(response.data.topics);
        }
        
      } catch (error) {
        console.log(error);
      }
      
  }

  const handleSaveCategory = async(categoryData) => {

    if (currentCategory) {

      try {
    

        const response = await apiService.updateTopic(currentCategory.id , categoryData);

        if (response.status === 'success' || response.status === 201) {

          console.log('Category updated successfully!');
          setState(Math.random()); 

        } else{
          console.error('Error updating category:', response);
        }
        
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }

    } else {

      try{

        const response = await apiService.createTopic(categoryData);
        
        if (response.status === 'success' || response.status === 201) {

          console.log('Category created successfully!');
          setState(Math.random()); 
          
        } else {
          console.error('Error creating category:', response.data);
        }

      }catch(error){
        console.error('Error creating category:', error);
      }
  
    }
    setIsModalOpen(false);
  };




  return (
    
    <Layout menuItemsGeneral={menuItems}>

      <GridGeneric
        title="Categories"
        data={categories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onSearch={handleSearchClick}
      />
      
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        initialData={currentCategory}
      />

    </Layout>
  );
};

export default Categories;