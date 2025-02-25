import '../components/CSS/Login_Register.css';
import Login from '../components/Login';
import Register from '../components/Register';
import InfoBox from '../components/InfoBox';

const Login_Register = () => (
  <div className="combined-container">
     <Login />
    <div className="component-box overlay-container">
      <Register />
      <InfoBox />
    </div>
  </div>
);

export default Login_Register;