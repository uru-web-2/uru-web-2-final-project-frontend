import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const MenuOptions = ({ iconButton, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation(); // Para que no dispare otros eventos
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span onClick={handleClick}>
        {iconButton}
      </span>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => {
            handleClose();
            option.onClick && option.onClick();
          }}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuOptions;
