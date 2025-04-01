import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
const SideBar = ({ open, handleDrawerToggle, drawerStyles, menuItems, MenuItem, listItemTextStyles, CustomDrawer }) => {
  const navigate = useNavigate();

  const handleClickItem = (path) => {
    navigate(path);
  };

  return (
    <CustomDrawer open={open} onClose={handleDrawerToggle} sx={drawerStyles}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingY: 2,
        }}
      >
        <img src= "/ubook.png"  style={{ height: 170}} />
      </Box>

      {menuItems.map((item) => (
        <MenuItem
          key={item.text}
          text={item.text}
          icon={item.icon}
          sx={listItemTextStyles}
          children={item.children}
          path={item.path}
          onClickItem={handleClickItem}
        />
      ))}
    </CustomDrawer>
  );
};

export default SideBar;
