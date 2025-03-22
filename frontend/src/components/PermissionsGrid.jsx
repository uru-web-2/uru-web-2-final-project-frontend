import { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, Box } from '@mui/material';
import { apiService } from '../Services/Services'; // Importa las funciones para obtener datos

const PermissionsGrid = () => {
  const [modules, setModules] = useState([]); // Módulos disponibles
  const [objects, setObjects] = useState([]); // Objetos del módulo seleccionado
  const [methods, setMethods] = useState([]); // Métodos del objeto seleccionado
  const [selectedModule, setSelectedModule] = useState(''); // Módulo seleccionado
  const [selectedObject, setSelectedObject] = useState(''); // Objeto seleccionado
  const [selectedMethods, setSelectedMethods] = useState({}); // Métodos seleccionados
  const [isModified, setIsModified] = useState(false); // Estado de modificación

  // Cargar módulos al montar el componente
  useEffect(() => {
    apiService.getModModules().then(modulesData => {
      setModules(modulesData);
    }).catch(err => console.error('Error fetching modules:', err));
  }, []);

  // Cargar objetos cuando se selecciona un módulo
  useEffect(() => {
    if (selectedModule) {
      const fetchObjects = async () => {
        try {
          const objectsData = await apiService.getObjectsByModuleID(selectedModule);
          setObjects(objectsData);
          setSelectedObject(''); // Reiniciar el objeto seleccionado
          setMethods([]); // Reiniciar los métodos
          setSelectedMethods({}); // Reiniciar los métodos seleccionados
        } catch (error) {
          console.error('Error fetching objects:', error);
        }
      };

      fetchObjects();
    }
  }, [selectedModule]);

  // Cargar métodos cuando se selecciona un objeto
  useEffect(() => {
    const profiles = window.location.href.split('/').pop();
    if (selectedObject) {
      const fetchMethods = async () => {
        try {
          const methodsData = await apiService.getMethodsByProfileIDObjectID(profiles, selectedObject);
          setMethods(methodsData);
          // Inicializar el estado de los métodos seleccionados
          const initialSelectedMethods = methodsData.reduce((acc, method) => {
            acc[method.id] = method.is_allowed;
            return acc;
          }, {});
          setSelectedMethods({ [selectedObject]: initialSelectedMethods });
        } catch (error) {
          console.error('Error fetching methods:', error);
        }
      };

      fetchMethods();
    }
  }, [selectedObject]);

  // Manejar cambios en los checkboxes
  const handleMethodChange = (objectId, methodId) => {
    setSelectedMethods(prev => ({
      ...prev,
      [objectId]: {
        ...prev[objectId],
        [methodId]: !prev[objectId]?.[methodId]
      }
    }));
    setIsModified(true);
  };

  // Seleccionar todos los métodos de un objeto
  const handleSelectAll = (objectId) => {
    const allMethods = methods.map(m => m.id);
    const allSelected = allMethods.every(methodId => selectedMethods[objectId]?.[methodId]);

    setSelectedMethods(prev => ({
      ...prev,
      [objectId]: allMethods.reduce((acc, methodId) => ({
        ...acc,
        [methodId]: !allSelected
      }), {})
    }));
    setIsModified(true);
  };

  // Manejar la actualización
  const handleUpdate = async () => {
    const profiles = window.location.href.split('/').pop();
    const methodsToAssign = [];
    const methodsToRevoke = [];

    Object.keys(selectedMethods[selectedObject]).forEach(methodId => {
      if (selectedMethods[selectedObject][methodId]) {
        methodsToAssign.push(methodId);
      } else {
        methodsToRevoke.push(methodId);
      }
    });

    try {
      console.log(methodsToAssign, methodsToRevoke,'a');
      
      await apiService.setProfilePermissions(profiles, methodsToAssign, methodsToRevoke);
      console.log('Updated Methods:', selectedMethods);
      //setIsModified(false);

      // Volver a cargar los métodos después de actualizar los permisos
      const methodsData = await apiService.getMethodsByProfileIDObjectID(profiles, selectedObject);
      setMethods(methodsData);
      const initialSelectedMethods = methodsData.reduce((acc, method) => {
        acc[method.id] = method.is_allowed;
        return acc;
      }, {});
      setSelectedMethods({ [selectedObject]: initialSelectedMethods });
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2, height: '600px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Permissions
      </Typography>

      {/* Selectores de módulo y objeto */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Module</InputLabel>
            <Select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              label="Module"
            >
              {modules.map(module => (
                <MenuItem key={module.id} value={module.id}>
                  {module.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={!selectedModule}>
            <InputLabel>Object</InputLabel>
            <Select
              value={selectedObject}
              onChange={(e) => setSelectedObject(e.target.value)}
              label="Object"
            >
              {objects.map(obj => (
                <MenuItem key={obj.id} value={obj.id}>
                  {obj.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Botón de actualización */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!isModified}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Tablas de métodos */}
      {selectedObject && (
        <TableContainer
          component={Paper}
          sx={{
            flex: 1, // Ocupa el espacio restante
            maxHeight: '600px',
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
                <TableCell
                  sx={{
                    backgroundColor: '#1A4568',
                    color: '#FFFFFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Method Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1A4568',
                    color: '#FFFFFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: '#1A4568',
                    color: '#FFFFFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <Checkbox
                    checked={methods.every(m => selectedMethods[selectedObject]?.[m.id])}
                    onChange={() => handleSelectAll(selectedObject)}
                    sx={{ color: '#FFFFFF' }} // Color del checkbox en el header
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {methods.map((method, index) => (
                <TableRow
                  key={method.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3EAF9',
                    '&:hover': {
                      backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#E0E7FF',
                    },
                  }}
                >
                  <TableCell>{method.name}</TableCell>
                  <TableCell>{method.description}</TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={!!selectedMethods[selectedObject]?.[method.id]}
                      onChange={() => handleMethodChange(selectedObject, method.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default PermissionsGrid;