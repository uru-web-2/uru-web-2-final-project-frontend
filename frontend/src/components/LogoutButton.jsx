import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logoutService } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";


function LogoutButton () {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const onLogout = async () => {
        try {

            const res = await logoutService();
            console.log(res,"aja");
            
            if (res.status === 'success') {
                sessionStorage.clear();
                console.log("Logout successful:", res);
                logout(); // Clear the auth state in context
                navigate("/login");
            }else{
                console.log("Error during logout:", res);
            }

        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
        <Button 
            variant="outline" 
            endIcon={<ExitToAppIcon />} 
            onClick={onLogout}
            disableRipple
            
            sx={{
                textTransform: "none",
                fontSize: "16px",
                margin: 2,
                color:'#1A4568',
                borderRadius: "8px",
                '&:focus': {
                    outline: 'none', 
                    boxShadow: 'none',
                }
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;