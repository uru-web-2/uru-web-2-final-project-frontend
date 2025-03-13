import { useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ModalWrapper from './ModalWrapper'; // Asegúrate de importar el ModalWrapper
import Search from './Search';

const GridProfiles = ({ data }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

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
    setSelectedUser(user); // Establece el usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  // Cerrar el modal y limpiar el usuario seleccionado
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>

      {/* Barra de búsqueda, selector de items por página y botón "Add" */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Search />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel>Items per page</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items per page"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            + Add
          </Button>
        </div>
      </div>

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
                    {user[column]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button 
                    onClick={() => handleOpenModal(user)} // Abre el modal con el usuario seleccionado
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

      {/* Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        title="User Details"
        onClose={handleCloseModal}
      >
        {selectedUser && (
          <div>
            {columns.map((column) => (
              <Typography key={column}>
                <strong>{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> 
                -{selectedUser[column]}
              </Typography>
            ))}
          </div>
        )}
      </ModalWrapper>
    </Paper>
  );
};

export default GridProfiles;