import { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const MenuItem = ({ text, icon, sx = {}, children, path, onClickItem }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleItemClick = () => {
    if (onClickItem && path) {
      onClickItem(path);
    }
  };

  const isExpandable = Array.isArray(children);

  return (
    <>
      <ListItem
        onClick={() => {
          if (isExpandable) {
            handleClick();
          } else {
            handleItemClick();
          }
        }}
        sx={{
          ...sx,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#5F84A2',
          },
        }}
      >
        <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary:{
              sx: {
                fontSize: '20px',
                fontWeight: 'medium',
            }
            },
          }}
        />
        {isExpandable ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItem>

      {isExpandable && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, index) => (
              <MenuItem
                key={index}
                text={child.text}
                icon={child.icon}
                path={child.path}
                onClickItem={onClickItem}
                sx={{
                  pl: child.nested ? 6 : 4, 
                  color: '#fff',
                }}
              >
                {child.children}
              </MenuItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;
