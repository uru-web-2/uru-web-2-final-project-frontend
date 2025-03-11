
import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import CustomDrawer from "../components/CustomDrawer";
import MenuItem from "../components/MenuItem";
import { menuItems } from '../Services/menuItems'; 



function Layout({children}) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

  return (
    <div style={{ 
      backgroundColor: '#F5F5F5', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
    }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <SideBar
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        //drawerStyles={drawerStyles}
        menuItems={menuItems}
        MenuItem={MenuItem}
        //listItemTextStyles={listItemTextStyles}
        CustomDrawer={CustomDrawer}
      />
      {children}
    </div>
  );
}

export default Layout;