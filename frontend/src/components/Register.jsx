import { useState } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getCountry } from '../Services/countryService'; // Importa getNames para obtener la lista de países
import '../components/CSS/Register.css';
import { registerService } from '../Services/authService'; // Importa el servicio de registro

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [documentCountry, setDocumentCountry] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [error, setError] = useState('');

    // Obtener la lista de países
    const countries = getCountry(); // Usa getNames para obtener un objeto { código: nombre }

    // Convertir el objeto de países en un arreglo de { code, name }
    const countryList = Object.entries(countries).map(([code, name]) => ({
        code,
        name,
    }));

    const documentTypes = [
        { code: 'V', name: 'Identity Document' },
        { code: 'P', name: 'Passport' },
    ];

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Aquí puedes manejar el envío del formulario
        console.log({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
            document_country: documentCountry,
            document_type: documentType,
            document_number: documentNumber,
        });

        try{
            // Aquí puedes llamar a tu servicio de registro
            await registerService({
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password,
                document_country: documentCountry,
                document_type: documentType,
                document_number: documentNumber,
        });
        } catch (error) {
            setError(error.data?.username || error.data?.password || 'Registration failed');
        }

        setError('');
    };

    const handleToggle = () => {
        let infoBox = document.querySelector('.info-box');
        if (infoBox) {
            infoBox.style.left = '-30px';
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className='register-title'>CREATE ACCOUNT</h2>
                <p className='register-paragraph'>Register with your details to create a new account</p>

                <form onSubmit={handleSubmit}>
                    <div className="register-input-pair">
                        <div className="register-input-box">
                            <FaUserCircle className="register-icon" />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="register-input-box">
                            <FaUserCircle className="register-icon" />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="register-input-pair">
                        <div className="register-input-box">
                            <FaUserCircle className="register-icon" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="register-input-box">
                            <FaUserCircle className="register-icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="register-input-pair">
                        <div className="register-input-box">
                            <FaLock className="register-icon" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordVisible ? (
                                <FaEyeSlash className="register-eye-icon" onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className="register-eye-icon" onClick={togglePasswordVisibility} />
                            )}
                        </div>
                        <div className="register-input-box">
                            <FaLock className="register-icon" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {passwordVisible ? (
                                <FaEyeSlash className="register-eye-icon" onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className="register-eye-icon" onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <div className="register-input-pair">
                        <div className="register-input-box">
                            <FaUserCircle className="register-icon" />
                            <select
                                value={documentCountry}
                                onChange={(e) => setDocumentCountry(e.target.value)}
                            >
                                <option value="">Select Country</option>
                                {countryList.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="register-input-box">
                            <FaUserCircle className="register-icon" />
                            <select
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value)}
                            >
                                <option value="">Select Document</option>
                                {documentTypes.map((document) => (
                                    <option key={document.code} value={document.name}>
                                        {document.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="register-input-box">
                        <FaUserCircle className="register-icon" />
                        <input
                            type="text"
                            placeholder="Document Number"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                        />
                    </div>
                    {error && <p className="register-error-message">{error}</p>}
                    <button className='register-button' type="submit">Register</button>
                </form>
                <button className='register-toggle-button' onClick={handleToggle}>
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
};

export default Register;