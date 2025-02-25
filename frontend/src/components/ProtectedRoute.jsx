import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const roles = JSON.parse(sessionStorage.getItem("selectedRoles"));
  const [unauthorized, setUnauthorized] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [seconds, setSeconds] = useState(5); // Estado para manejar el contador de segundos

  useEffect(() => {
    if (!roles || !Array.isArray(roles)) {
      setUnauthorized(true);
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setTimeout(() => {
        setRedirect(true);
      }, 5000);
      return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
    } else {
      const hasAccess = roles.some(role => allowedRoles.includes(role));
      if (!hasAccess) {
        setUnauthorized(true);
        const timer = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        setTimeout(() => {
          setRedirect(true);
        }, 5000);
        return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
      }
    }
  }, [roles, allowedRoles]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (unauthorized) {
    return (
      <div style={styles.overlay}>
        <div style={styles.messageBox}>
          <h2 style={styles.message}>❌ No tienes permisos para estar aquí.</h2>
          <p style={styles.timer}>Serás redirigido en <b>{seconds}</b> segundos...</p>
        </div>
      </div>
    );
  }

  return children;
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 1000,
  },
  messageBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  message: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#721c24",
    marginBottom: "10px",
  },
  timer: {
    fontSize: "18px",
    color: "#333",
  },
};

export default ProtectedRoute;