import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, IconButton, alertTitleClasses } from '@mui/material';
import LogoutButton from './LogoutButton';

// Navbar con color de fondo #FFFFFF (blanco)

const Navbar = () => (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#FFFFFF', // Color de fondo blanco
        color: '#000000', // Color del texto negro para contrastar
        boxShadow: '-moz-initial', // Opcional: eliminar la sombra
      }}
    >
      <Toolbar sx={{justifyContent: 'right'}}>
        <LogoutButton/>
      </Toolbar>
    </AppBar>
  );

export default Navbar