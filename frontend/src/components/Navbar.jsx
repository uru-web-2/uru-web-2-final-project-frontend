import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

// Navbar con color de fondo #FFFFFF (blanco)
const Navbar = ({ handleDrawerToggle }) => (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#FFFFFF', // Color de fondo blanco
        color: '#000000', // Color del texto negro para contrastar
        boxShadow: '-moz-initial', // Opcional: eliminar la sombra
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, color: '#000000' }} // Color del ícono negro
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ color: '#000000' }}>
          Inicio
        </Typography>
      </Toolbar>
    </AppBar>
  );

export default Navbar