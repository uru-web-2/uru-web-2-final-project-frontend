// menuItems.js
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ConstructionIcon from '@mui/icons-material/Construction';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';

// Orden de prioridad de roles (de mayor a menor privilegio)
const ROLE_PRIORITY = ['Super Admin', 'Admin', 'Librarian', 'Student'];

// Obtenemos los roles del sessionStorage y los ordenamos por prioridad
const getCurrentRoles = async () => {
  try {
    // Intenta obtener de selectedRoles primero
    const rolesJSON = sessionStorage.getItem('selectedRoles');
    console.log('Roles JSON:', rolesJSON); // Para debugging
    
    // Si no existe, intenta obtener del objeto user
    if (!rolesJSON) {
      const userJSON = sessionStorage.getItem('user');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        if (user?.roles) {
          // Guardamos en selectedRoles para futuras cargas
          sessionStorage.setItem('selectedRoles', JSON.stringify(user.roles));
          return user.roles.sort((a, b) => ROLE_PRIORITY.indexOf(a) - ROLE_PRIORITY.indexOf(b));
        }
      }
      return []; // Retorna array vacío si no hay roles
    }
    
    const roles = JSON.parse(rolesJSON);
    return roles.sort((a, b) => ROLE_PRIORITY.indexOf(a) - ROLE_PRIORITY.indexOf(b));
    
  } catch (error) {
    console.error('Error parsing roles:', error);
    return [];
  }
};

// Función para determinar si un usuario tiene acceso basado en los roles requeridos
const hasAccess = (requiredRoles, userRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  
  return userRoles.some(userRole => {
    const userRoleIndex = ROLE_PRIORITY.indexOf(userRole);
    return requiredRoles.some(requiredRole => {
      const requiredRoleIndex = ROLE_PRIORITY.indexOf(requiredRole);
      return userRoleIndex <= requiredRoleIndex;
    });
  });
};

const allMenuItems = [
  { 
    text: 'Inventario', 
    icon: <InventoryIcon sx={{ color: '#FFFFFF' }} />,
    requiredRoles: ['Librarian'],
    children: [
      { 
        text: 'Maintenance', 
        icon: <ConstructionIcon sx={{ color: '#FFFFFF'}}/>, 
        requiredRoles: ['Librarian'],
        children: [
          { 
            text: 'Categories', 
            icon: <CategoryIcon sx={{ color: '#FFFFFF' }} />, 
            path: '/inventory/maintenance/categories', 
            requiredRoles: ['Librarian']
          },
          { 
            text: 'Publishers', 
            icon: <BusinessIcon sx={{ color: '#FFFFFF'}}/>, 
            path: '/inventory/maintenance/publishers', 
            requiredRoles: ['Librarian']
          },
          { 
            text: 'Locations', 
            icon: <MapIcon sx={{ color: '#FFFFFF'}}/>, 
            path: '/inventory/maintenance/locations', 
            requiredRoles: ['Librarian']
          },
        ], 
      },
      { 
        text: 'Books', 
        icon: <MenuBookIcon sx={{ color: '#FFFFFF'}}/>, 
        path: '/inventory/books', 
        requiredRoles: ['Librarian']
      },
      { 
        text: 'Articles', 
        icon: <DescriptionIcon sx={{color: '#FFFFFF'}}/>, 
        path: '/inventory/articles', 
        requiredRoles: ['Librarian']
      },
      { 
        text: 'Theses', 
        icon: <CollectionsBookmarkIcon sx={{ color: '#FFFFFF'}}/>, 
        path: '/inventory/theses', 
        requiredRoles: ['Librarian']
      },
      { 
        text: 'Magazines', 
        icon: <ImportContactsIcon sx={{ color: '#FFFFFF'}}/>, 
        path: '/inventory/magazines', 
        requiredRoles: ['Librarian']
      },
    ],
  },
  { 
    text: 'Préstamos', 
    icon: <LocalAtmIcon sx={{ color: '#FFFFFF' }} />, 
    path: '/inventory/loans', 
    requiredRoles: ['Librarian'] 
  },
  {
    text: 'Seguridad',
    icon: <SecurityIcon sx={{ color: '#FFFFFF' }} />,
    requiredRoles: ['Admin'],
    children: [
      { 
        text: 'Usuarios', 
        icon: <PeopleIcon sx={{ color: '#FFFFFF' }} />, 
        path: '/security/users', 
        requiredRoles: ['Admin'] 
      },
      { 
        text: 'Perfiles', 
        icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, 
        path: '/security/profiles', 
        requiredRoles: ['Super Admin'] 
      },
    ],
  },
  { 
    text: 'Revisión', 
    icon: <AssignmentIcon sx={{ color: '#FFFFFF' }} />, 
    requiredRoles: ['Librarian'] 
  },
  { 
    text: 'Configuración', 
    icon: <SettingsIcon sx={{ color: '#FFFFFF' }} />, 
    requiredRoles: ['Admin'] 
  },
];

// Función para filtrar items según los roles del usuario
const filterItemsByRole = (items, userRoles) => {
  if (!userRoles || userRoles.length === 0) {
    console.warn('No roles found, showing empty menu');
    return [];
  }

  return items.reduce((acc, item) => {
    const userHasAccess = hasAccess(item.requiredRoles, userRoles);
    if (!userHasAccess) return acc;
    
    const filteredItem = {...item};
    
    if (filteredItem.children) {
      filteredItem.children = filterItemsByRole(filteredItem.children, userRoles);
      if (filteredItem.children.length === 0) {
        delete filteredItem.children;
      }
    }
    
    return [...acc, filteredItem];
  }, []);
};

// Exportamos el menú con verificación de roles
export const getMenuItems = async () => {
  const roles = await getCurrentRoles();
  console.log('Roles actuales:', roles);
  return filterItemsByRole(allMenuItems, roles);
};

// Versión alternativa para componentes que pueden esperar
export const menuItems = await getMenuItems();