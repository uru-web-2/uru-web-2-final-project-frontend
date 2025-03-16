// CustomDrawer.js
import { Drawer, Toolbar, List } from '@mui/material';

const CustomDrawer = ({ open, onClose, children }) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 290,
          boxSizing: 'border-box',
          backgroundColor: '#1A4568',
          color: '#FFFFFF',
          boxShadow: '0 0 15px 0 rgba(0,0,0,0.5)',
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Toolbar />
      <List>{children}</List>
    </Drawer>
  );
};

export default CustomDrawer;