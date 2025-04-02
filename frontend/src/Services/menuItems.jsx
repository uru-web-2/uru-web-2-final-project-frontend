// menuItems.js
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People'; // Ícono para Usuarios
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Ícono para Perfiles
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Ícono para Books
import DescriptionIcon from '@mui/icons-material/Description'; // Ícono para Articles
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ConstructionIcon from '@mui/icons-material/Construction';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';

export const menuItems = [
  { text: 'Inventory', icon: <InventoryIcon sx={{ color: '#FFFFFF' }} />,
  children:[
    { text: 'Maintenance', icon: <ConstructionIcon sx={{ color: '#FFFFFF'}}/>, 
    children:[
      { text: 'Categories', icon: <CategoryIcon sx={{ color: '#FFFFFF' }} />, path: '/inventory/maintenance/categories', nested: true },
      { text: 'Authors', icon: <PeopleIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/maintenance/authors', nested: true },
      { text: 'Publishers', icon: <BusinessIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/maintenance/publishers', nested: true },
      { text: 'Locations', icon: <MapIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/maintenance/locations', nested: true },
    ], path: '/inventory/maintenance'},
    { text: 'Books', icon: <MenuBookIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/books'},
    { text: 'Articles', icon:<DescriptionIcon sx={{color: '#FFFFFF'}}/>, path: '/inventory/articles'},
    { text: 'Theses', icon: <CollectionsBookmarkIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/theses'},
    { text: 'Magazines', icon: <ImportContactsIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/magazines'},,
    ],
  },
  { text: 'Loans', icon: <LocalAtmIcon sx={{ color: '#FFFFFF' }} />, path: '/inventory/loans' },
  {
    text: 'Security',
    icon: <SecurityIcon sx={{ color: '#FFFFFF' }} />,
    children: [
      { text: 'Users', icon: <PeopleIcon sx={{ color: '#FFFFFF' }} />, path: '/security/users' }, // Ruta para Usuarios
      { text: 'Profiles', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, path: '/security/profiles' }, // Ruta para Perfiles
    ],
  },
  { text: 'Review', icon: <AssignmentIcon sx={{ color: '#FFFFFF' }} /> },
  { text: 'Configuration', icon: <SettingsIcon sx={{ color: '#FFFFFF' }} /> },
];

export const menuItemsLibrarian = [
  { text: 'Inventory', icon: <InventoryIcon sx={{ color: '#FFFFFF' }} />,
  children:[
    { text: 'Books', icon: <MenuBookIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/books'},
    { text: 'Articles', icon:<DescriptionIcon sx={{color: '#FFFFFF'}}/>, path: '/inventory/articles'},
    { text: 'Theses', icon: <CollectionsBookmarkIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/theses'},
    { text: 'Magazines', icon: <ImportContactsIcon sx={{ color: '#FFFFFF'}}/>, path: '/inventory/magazines'},
    ],
  },
  { text: 'Loans', icon: <LocalAtmIcon sx={{ color: '#FFFFFF' }} /> },
  { text: 'Review', icon: <AssignmentIcon sx={{ color: '#FFFFFF' }} /> },
  { text: 'Configuration', icon: <SettingsIcon sx={{ color: '#FFFFFF' }} /> },
];