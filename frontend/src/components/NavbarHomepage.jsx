import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Ícono de usuario

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#003366", zIndex: 1000, padding: "2 20px" }}>
      <Toolbar sx= {{ display: "flex", justifyContent: "space-between", minHeight: "64px" }}>
        
        {/*Logo*/}
        <Box sx={{ display: "flex", alignItems: "center"}}>
            <img src="ubook.png" alt="U-BOOK logo" style={{height: "60px", marginRight: "2px",  width: "80px"}} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Biblioteca Digital
            </Typography>
        </Box>

        {/* Menú de navegación con menos espacio */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>Inicio</Button>
          <Button color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>Catálogo</Button>
          <Button color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>Préstamos</Button>
          <Button color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>Nosotros</Button>
          <Button color="inherit" sx={{ minWidth: "auto", padding: "8px 45px" }}>Soporte</Button>
        </Box>
        {/* Ícono de usuario */}
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
