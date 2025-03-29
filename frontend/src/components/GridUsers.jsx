import { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination, Box } from '@mui/material';
import UserDetailsModal from './UserDetailsModal';
import Search from './Search';
import PageSizeSelector from './PageSizeSelector';
import CreateUserModal from './CreateUserModal';
import { apiService } from '../Services/Services';

// Componente de la tabla de usuarios
const GridUsers = () => {
  // Estado para los datos de usuarios
  const [data, setData] = useState([]);

  // Estado para los detalles del usuario seleccionado
  const [userDetails, setUserDetails] = useState(null);

  // Columnas excluidas de la tabla
  const excludedColumns = ['type_document', 'number_document', 'role'];
  const columns = data.length > 0 ? Object.keys(data[0]).filter(column => !excludedColumns.includes(column)) : [];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // Estado para el modal de detalles
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Estado para el modal de creación de usuario
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Calcular los usuarios que deben mostrarse en la página actual
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearchClick = async (userSearch) => {

    try {
      const response = await apiService.searchUser(userSearch)
      console.log(response);
      if(userSearch==''){
        const updatedUsersResponse = await apiService.getAllUsers();
        setData(updatedUsersResponse.data.users); // Actualiza el estado con la lista completa
      }else{
        setData(response)
      }
      
    } catch (error) {
      console.log(error);
    }
    
  }

  // Cambiar de página
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Cambiar el número de elementos por página
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  // Abrir el modal de detalles y establecer el usuario seleccionado
  const handleOpenDetailsModal = (user) => {
    setSelectedUser(user); // Establece el usuario seleccionado
    setIsDetailsModalOpen(true); // Abre el modal
  };

  // Cerrar el modal de detalles y limpiar el usuario seleccionado
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false); // Cierra el modal
    setSelectedUser(null); // Limpia el usuario seleccionado
    setUserDetails(null); // Limpia los detalles del usuario
  };

  // Abrir el modal de creación de usuario
  const handleOpenCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  };

  // Cerrar el modal de creación de usuario
  const handleCloseCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  const handleCreateUser = async (newUser) => {
    try {
      console.log(newUser, 'newUser');
      
      // Enviar los datos del nuevo usuario al servidor
      const response = await apiService.createUsers(newUser);
      console.log(1);
      console.log(response, 'respuesta');
      
      // Verificar si la respuesta es exitosa
      if (response.status === 'success' || response.status === 201) {
        console.log(response.status, 'user');
        console.log(2);
  
        // Volver a cargar la lista de usuarios desde el servidor
        const updatedUsersResponse = await apiService.getAllUsers();
        setData(updatedUsersResponse.data.users); // Actualiza el estado con la lista completa
  
        // Cerrar el modal de creación de usuario
        handleCloseCreateUserModal();
      } else {
        console.error('Error al crear el usuario:', response.data);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  // Llamar a getAllUsers cuando el componente se monte
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getAllUsers(); // Obtiene la lista de usuarios
        setData(response.data.users); // Almacena los datos en el estado local
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  // Llamar a GetUserDetailsByUserID cuando se seleccione un usuario
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (selectedUser) {
        try {
          const response = await apiService.getUserDetailsByUserID(selectedUser.id); // Obtiene los detalles del usuario
          setUserDetails(response.data); // Almacena los detalles en el estado
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
      
    };

    fetchUserDetails();
  }, [selectedUser]); // Se ejecuta cuando selectedUser cambia

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>

      {/* Barra de búsqueda, selector de items por página y botón "Add" */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Search click={handleSearchClick} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PageSizeSelector numberItems={[1, 5, 7, 10, 15]} onChange={handleItemsPerPageChange} value={itemsPerPage} />
          <Button variant="contained" color="primary" onClick={handleOpenCreateUserModal}>
            + Add
          </Button>
        </Box>
      </Box>

      {/* Tabla de usuarios */}
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
              {columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    backgroundColor: '#1A4568',
                    color: '#FFFFFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
                </TableCell>
              ))}
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
                key={user.user_id} // Clave única para cada fila
                sx={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3EAF9',
                  '&:hover': {
                    backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#E0E7FF',
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={`${user.user_id}-${column}`}>
                    {Array.isArray(user[column]) ? user[column].join(', ') : user[column]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    onClick={() => handleOpenDetailsModal(user)}
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Details
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

      {/* Modal de detalles */}
      {isDetailsModalOpen && userDetails && (
        console.log(userDetails, 'userdetails8'),
        <UserDetailsModal
          isOpen={isDetailsModalOpen}
          title="Información Personal"
          onClose={handleCloseDetailsModal}
          user={selectedUser}
          userDetails={userDetails} // Pasamos los detalles del usuario al modal
        />
      )}

      {/* Modal de creación de usuario */}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={handleCloseCreateUserModal}
        onCreateUser={handleCreateUser}
      />
    </Paper>
  );
};

export default GridUsers;