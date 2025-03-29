import React, { useState } from 'react';
import GridGeneric from '../components/GridGeneric'; 
import Layout from '../components/Layout';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Literature' },
    { id: 4, name: 'History' },
    { id: 5, name: 'Biology' },	
    { id: 6, name: 'Chemistry' }
  ]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' }
  ];

  const handleEdit = (item) => {
    console.log('Editar categoría:', item);
  };

  const handleDelete = (item) => {
    console.log('Eliminar categoría:', item);
    setCategories(prev => prev.filter(cat => cat.id !== item.id));
  };

  const handleAdd = () => {
    console.log('Agregar nueva categoría');
  };

  return (
    <Layout>
      <GridGeneric
        title="Categories"
        data={categories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </Layout>
  );
};

export default Categories;


