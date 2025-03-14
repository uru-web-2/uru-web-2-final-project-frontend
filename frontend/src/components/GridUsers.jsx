import { useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination, Box } from '@mui/material';
import ModalWrapper from './ModalWrapper'; // Asegúrate de importar el ModalWrapper
import UserDetailsModal from './UserDetailsModal';
import Search from './Search';
import PageSizeSelector from './PageSizeSelector';
import CreateUserModal from './CreateUserModal'; // Importa el componente CreateUserModal

const GridUsers = ({ data: initialData }) => {
  const excludedColumns = ['type_document', 'number_document', 'role'];
  const columns = initialData.length > 0 ? Object.keys(initialData[0]).filter(column => !excludedColumns.includes(column)) : [];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // Estado para el modal de detalles
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Estado para el modal de creación de usuario
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Estado para los datos de usuarios
  const [data, setData] = useState(initialData);

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

  // Abrir el modal de detalles y establecer el usuario seleccionado
  const handleOpenDetailsModal = (user) => {
    setSelectedUser(user); // Establece el usuario seleccionado
    setIsDetailsModalOpen(true); // Abre el modal
  };

  // Cerrar el modal de detalles y limpiar el usuario seleccionado
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false); // Cierra el modal
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  // Abrir el modal de creación de usuario
  const handleOpenCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  };

  // Cerrar el modal de creación de usuario
  const handleCloseCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  // Manejar la creación de un nuevo usuario
  const handleCreateUser = (newUser) => {
    setData([...data, { ...newUser, id: data.length + 1 }]); // Agrega el nuevo usuario a la lista
    handleCloseCreateUserModal(); // Cierra el modal
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>

      {/* Barra de búsqueda, selector de items por página y botón "Add" */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Search />
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
                key={user.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3EAF9',
                  '&:hover': {
                    backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#E0E7FF',
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={`${user.id}-${column}`}>
                    {Array.isArray(user[column]) ? user[column].join(', ') : user[column]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    onClick={() => handleOpenDetailsModal(user)} // Abre el modal con el usuario seleccionado
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
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        title="Información Personal"
        onClose={handleCloseDetailsModal}
        user={selectedUser}
      />

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