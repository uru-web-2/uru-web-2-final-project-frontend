// menuItems.js
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People'; // Ícono para Usuarios
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Ícono para Perfiles
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Ícono para Books

export const menuItems = [
  { text: 'Inventario', icon: <InventoryIcon sx={{ color: '#FFFFFF' }} />,
  children:[
    { text: 'Books', icon: <MenuBookIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/books'},
    ],
  },
  { text: 'Préstamos', icon: <LocalAtmIcon sx={{ color: '#FFFFFF' }} /> },
  {
    text: 'Seguridad',
    icon: <SecurityIcon sx={{ color: '#FFFFFF' }} />,
    children: [
      { text: 'Usuarios', icon: <PeopleIcon sx={{ color: '#FFFFFF' }} />, path: '/security/users' }, // Ruta para Usuarios
      { text: 'Perfiles', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, path: '/security/profiles' }, // Ruta para Perfiles
    ],
  },
  { text: 'Revisión', icon: <AssignmentIcon sx={{ color: '#FFFFFF' }} /> },
  { text: 'Configuración', icon: <SettingsIcon sx={{ color: '#FFFFFF' }} /> },
];