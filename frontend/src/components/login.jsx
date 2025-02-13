import { useState } from 'react';
import '../CSS/Login.css';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className='title'>{isRegister ? 'CREATE ACCOUNT' : 'KEEP CONNECTED'}</h2>
                <p className='paragraph'>
                    {isRegister ? 'Register with your details to create a new account' : 'Login with your credential to access your account'}
                </p>

                <form>
                    <div className="input-box">
                        <FaUserCircle className="icon" /> {/* Ícono de usuario */}
                        <input type="text" placeholder="Enter your username" />
                    </div>
                    <div className="input-box">
                        <FaLock className="icon" /> {/* Ícono de candado */}
                        <input type={passwordVisible ? "text" : "password"} placeholder="Enter your password" />
                        {passwordVisible ? (
                            <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
                        )}
                    </div>
                    
                    {!isRegister && (
                        <div className='forgot-password'>
                            <a href="#">Forgot password?</a>
                        </div>
                    )}
                    <button className='login-button' type="submit">{isRegister ? 'Register' : 'Login'}</button>
                </form>
                <button className='toggle-button' onClick={toggleForm}>
                    {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
                </button>
            </div>
            <div className="info-box">
                <img src="/Logo.png" alt="U-Book Logo" className="logo" />
                <h2>WELCOME TO U-BOOK!</h2>
                <img src="/Libro.png" alt="Book Image" className="book-image" />
                <p><b>Your Books Your Library</b> <br /> since 2025 </p>
            </div>
        </div>
    );
};

export default Login;