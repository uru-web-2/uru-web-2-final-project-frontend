import { useContext } from "react";
import { logoutService } from "../services/authService";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import { AuthContext } from "./AuthContext";

const NavbarHomepage = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#003366",
        zIndex: 1000,
        padding: "2 20px",
        mb: "80px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "64px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/ubook.png"
            alt="U-BOOK logo"
            style={{ height: "60px", width: "80px", marginRight: "8px" }}
          />
          <Typography variant="h6" color="inherit">
           Digital Library
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/student-homepage" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/catalog" color="inherit">
            Catalog
          </Button>
          <Button component={Link} to="/loans" color="inherit">
            Loans
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About Us
          </Button>
          <Button component={Link} to="/help" color="inherit">
            Help
          </Button>
        </Box>

        {/*Icon user*/}
        <Box>
          {isAuthenticated ? (
            <MenuOptions
              iconButton={
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              }
              options={[
                { label: "Profile", onClick: () => navigate("/student-profile") },
                { label: "Loans", onClick: () => navigate("/student-loans") },
                { label: "Booking", onClick: () => navigate("/student-booking") },
                { label: "Favorites", onClick: () => navigate("/student-favorites") },
                { label: "Logout", onClick: async () => {
                  try {
                    await logoutService();
                    sessionStorage.removeItem("selectedRoles");
                    logout();
                    navigate("/");
                  } catch (error) {
                    console.log(error);
                  }
                }
                },
              ]}
            />
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                "&:hover": {
                  borderColor: "#ccc",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarHomepage;
