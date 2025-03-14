import  { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from 'react-router-dom'
import Menu from "@mui/material/Menu";


const NavbarHomepage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#003366", zIndex: 1000, padding: "2 20px" }}>
      <Toolbar sx= {{ display: "flex", justifyContent: "space-between", minHeight: "64px" }}>
        
        <Box sx={{ display: "flex", alignItems: "center"}}>
            <img src="ubook.png" alt="U-BOOK logo" style={{height: "60px", marginRight: "2px",  width: "80px"}} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Biblioteca Digital
            </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/student-homepage" color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>
            Inicio
          </Button>
          <Button component={Link} to="/catalogo" color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>
            Catálogo
          </Button>
          <Button component={Link} to="/prestamos" color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>
            Préstamos
          </Button>
          <Button component={Link} to="/nosotros" color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>
            Nosotros
          </Button>
          <Button component={Link} to="/soporte" color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>
            Soporte
          </Button>
        </Box>

        <Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              style: {
                width: "150px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          },
          }}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/perfil">Perfil</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/prestamos">Préstamos</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/reservas">Reservas</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/favoritos">Favoritos</MenuItem>

        </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarHomepage;
