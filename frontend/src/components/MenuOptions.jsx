// components/MenuOptions.js
import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const MenuOptions = ({ options, iconButton }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span onClick={handleOpenMenu}>{iconButton}</span>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => {
            option.onClick();
            handleClose();
          }}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuOptions;
