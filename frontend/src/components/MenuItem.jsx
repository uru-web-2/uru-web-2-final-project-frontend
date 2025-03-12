import { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const MenuItem = ({ text, icon, sx, children, path, onClickItem }) => {
  const [open, setOpen] = useState(false); // Estado para controlar la expansión

  const handleClick = () => {
    setOpen(!open); // Alternar estado de expansión
  };

  const handleItemClick = () => {
    if (onClickItem) {
      onClickItem(path); // Ejecuta la función callback con la ruta como argumento
    }
  };

  return (
    <>
      <ListItem
        button
        onClick={(e) => {
          handleClick(); // Maneja la expansión
          if (!children) {
            handleItemClick(); // Maneja el clic en el ítem (solo si no tiene hijos)
          }
        }}
        sx={sx}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} slotProps={{
            primary: {
              sx: {
                fontSize: '20px',
                fontWeight: 'medium'
              }
            }
          }} />
        {children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, index) => (
              <MenuItem
                key={index}
                text={child.text}
                icon={child.icon}
                sx={{ pl: 4, ...sx }} // Añadir sangría para los subítems
                children={child.children} // Soporte para más niveles anidados
                path={child.path}
                onClickItem={onClickItem} // Pasa la función callback a los hijos
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;