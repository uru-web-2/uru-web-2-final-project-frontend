import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logoutService } from "../Services/authService";
import { useNavigate } from "react-router-dom";

function LogoutButton () {

    const navigate = useNavigate();

    const onLogout = async () => {
        try {

            const res = await logoutService();

            if (res.status === 'success') {
                sessionStorage.clear();
                navigate('/login');
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