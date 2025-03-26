import { useState } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../components/CSS/Login.css';
import { loginService } from '../Services/authService';
import ModalWrapper from './ModalWrapper'; // Importar el componente ModalWrapper
import { Select, MenuItem, Button } from '@mui/material'; // Importar los componentes necesarios de MUI
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext'; 

const Login = () => {
    const { login } = useContext(AuthContext);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
    const [selectedProfile, setSelectedProfile] = useState(''); // Estado para manejar el perfil seleccionado
    const [saveRoles, setSaveRoles] = useState([]); // Estado para guardar los roles
    const navigate = useNavigate(); // Hook para redireccionar

    const selectRole = (roles) => {
        sessionStorage.setItem("selectedRoles", JSON.stringify(roles));
    };

    const profileRoutes = {
        "Student": "/student-homepage",
        "Librarian": "/librarian-dashboard",
        "Super Admin": "/admin-dashboard",
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginService(username, password);
            console.log(res, "dorito6");
            
            if (res.status === 'multiple_profiles') {
                setProfiles(res.profiles);
                setSaveRoles(res.profiles); // Guardar todos los roles en el estado
                setIsModalOpen(true); // Activar el modal
            } else if (res.status === 'success') {
                login();
                setError('');
                let selectedRoles = JSON.parse(sessionStorage.getItem("selectedRoles"));     
                selectedRoles+= "-dashboard";
                navigate(`/${selectedRoles}`); // Redirigir según el perfil seleccionado
            }
        } catch (error) {
            setError(error.data?.username || error.data?.password || 'Login failed');
        }
    };

    const handleToggle = () => {
        let infoBox = document.querySelector('.info-box');
        if (infoBox) {
            infoBox.style.left = '-410px';
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleProfileChange = (event) => {
        setSelectedProfile(event.target.value);
    };

    const handleProfileSubmit = async () => {
        try {
            const res = await loginService(username, password, selectedProfile);
            // Aquí puedes manejar el login exitoso
            setError('');
            setIsModalOpen(false); // Cerrar el modal

            if (res.status) {
                login();
                selectRole(saveRoles); // Guardar todos los roles
                navigate(profileRoutes[selectedProfile]); // Redirigir según el perfil seleccionado
            } else {
                setError('Session is undefined');
            }
        } catch (error) {
            setError(error.data?.username || error.data?.password || 'Login failed');
        }
    };

    return (
        <div className="combined-container">
            <div className="login-box">
                <h2 className='title'>KEEP CONNECTED</h2>
                <p className='paragraph'>Login with your credential to access your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <FaUserCircle className="icon" />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <FaLock className="icon" />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordVisible ? (
                            <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
                        )}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className='forgot-password'>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button className='login-button' type="submit">Login</button>
                </form>
                <button className='toggle-button' onClick={handleToggle}>
                    Dont have an account? Register
                </button>
            </div>
            <ModalWrapper
                isOpen={isModalOpen}
                title="¡Felicidades! Tú tienes más de un perfil"
                onClose={closeModal}
                actions={
                    <>
                        <Button onClick={closeModal} sx={{ mt: 2 }}>Cerrar</Button>
                        <Button onClick={handleProfileSubmit} sx={{ mt: 2 }} disabled={!selectedProfile}>
                            Iniciar sesión con perfil
                        </Button>
                    </>
                }
            >
                <Select
                    value={selectedProfile}
                    onChange={handleProfileChange}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        Selecciona un perfil
                    </MenuItem>
                    {profiles.map((profile, index) => (
                        <MenuItem key={index} value={profile}>
                            {profile}
                        </MenuItem>
                    ))}
                </Select>
            </ModalWrapper>
        </div>
    );
};

export default Login;