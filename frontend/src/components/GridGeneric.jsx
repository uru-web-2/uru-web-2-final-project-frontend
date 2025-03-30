import { useState } from 'react';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Pagination, Box
} from '@mui/material';
import Search from '../components/Search';
import PageSizeSelector from './PageSizeSelector';

const GridGeneric = ({
  title = 'Grid',
  data = [],
  columns = [],
  onAdd = null,
  onEdit = null,
  onDelete = null,
  customActions = null,
  onSearch = null,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => setCurrentPage(page);
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
     <Paper elevation={3} sx={{ padding: 3, margin: '40px auto', maxWidth: '1200px', width: '100%' }}>
       <Typography variant="h6" gutterBottom>
         {title}
       </Typography>
       <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Search click={onSearch}/>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
          <PageSizeSelector numberItems={[5, 7, 10, 15]} onChange={handleItemsPerPageChange} value={itemsPerPage} />
          {onAdd && <Button variant="contained" onClick={onAdd} sx={{ ml: 1 }}>+ Add</Button>}
        </Box>
      </Box>

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
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    backgroundColor: '#1A4568',
                    color: '#FFFFFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              {(onEdit || onDelete || customActions) && (
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
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3EAF9',
                  '&:hover': {
                    backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#E0E7FF',
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={`${index}-${col.key}`}>
                    {item[col.key]}
                  </TableCell>
                ))}
                {(onEdit || onDelete || customActions) && (
                  <TableCell>
                    {onEdit && <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(item)} sx={{ mr: 1 }}>Edit</Button>}
                    {onDelete && <Button size="small" variant="outlined" color="error" onClick={() => onDelete(item)}>Delete</Button>}
                    {customActions && customActions(item)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default GridGeneric;
