import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import CustomDrawer from "../components/CustomDrawer";
import MenuItem from "../components/MenuItem";
import { getMenuItems } from "../Services/menuItems"; // Importa el método asíncrono

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // Estado para almacenar los menuItems
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useEffect para cargar los menuItems
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        const items = await getMenuItems(); // Llama a la función asíncrona
        setMenuItems(items || []); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error al cargar los menuItems:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    loadMenuItems();
  }, []); // Se ejecuta solo una vez al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <SideBar
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuItems={menuItems} // Pasa los menuItems cargados al SideBar
        MenuItem={MenuItem}
        CustomDrawer={CustomDrawer}
      />
      <Box sx={{ ml: 12, height: "74%", width: "77%" }}>{children}</Box>
    </div>
  );
}

export default Layout;