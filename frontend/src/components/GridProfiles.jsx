import { useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination, Box } from '@mui/material';
import ModalWrapper from './ModalWrapper'; // Asegúrate de importar el ModalWrapper
import Search from './Search';
import PageSizeSelector from './PageSizeSelector';
import { useNavigate } from 'react-router-dom';

const GridProfiles = ({ data }) => {
  // Hook para redireccionar
  const navigate = useNavigate();
  console.log(data,"achu");
  
  // Definir las columnas que se mostrarán
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Calcular los usuarios que deben mostrarse en la página actual
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar de página
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Cambiar el número de elementos por página
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  // Abrir el modal y establecer el usuario seleccionado
  const handleOpenModal = (user) => {
    console.log(user);
    
    setSelectedUser(user); // Establece el usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  // Cerrar el modal y limpiar el usuario seleccionado
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  // Redirigir a la página de permisos
  const handlePermissions = (profileId) => {
    navigate(`/security/permissions/${profileId}`); // Redirige a la ruta dinámica
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Profiles
      </Typography>

      {/* Barra de búsqueda, selector de items por página y botón "Add" */}
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Search />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PageSizeSelector numberItems={[1,5,7,10,15]} onChange={handleItemsPerPageChange} value={itemsPerPage}/>
          {/* <Button variant="contained" color="primary">
            + Add
          </Button> */}
        </Box>
      </Box>
      

      {/* Tabla de perfiles */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: '400px', 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {/* Columnas dinámicas */}
              {columns.map((column) => (
                <TableCell 
                  key={column.key} 
                  sx={{ 
                    backgroundColor: '#1A4568',
                    color: '#FFFFFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {/* Columna Actions (siempre al final) */}
              <TableCell 
                sx={{ 
                  backgroundColor: '#1A4568',
                  color: '#FFFFFF',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3EAF9',
                  '&:hover': {
                    backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#E0E7FF',
                  },
                }}
              >
                {/* Columnas dinámicas */}
                {columns.map((column) => (
                  <TableCell key={`${user.id}-${column.key}`}>
                    {user[column.key]}
                  </TableCell>
                ))}
                {/* Columna Actions (siempre al final) */}
                <TableCell>
                  <Button 
                    onClick={() => handleOpenModal(user)} // Abre el modal con el perfil seleccionado
                    variant="outlined" 
                    color="primary" 
                    sx={{ mr: 1 }}
                  >
                    Details
                  </Button>
                  <Button 
                    onClick={() => handlePermissions(user.id)} // Redirige a la página de permisos
                    variant="outlined" 
                    color="secondary" 
                  >
                    Permissions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      {/* Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        title="Profile Details"
        onClose={handleCloseModal}
      >
        {selectedUser && (
          <div>
            {columns.map((column) => (
              <Typography key={column.key}>
                <strong>{column.label}:</strong> {selectedUser[column.key]}
              </Typography>
            ))}
          </div>
        )}
      </ModalWrapper>
    </Paper>
  );
};

export default GridProfiles;