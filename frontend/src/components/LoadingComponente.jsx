const LoadingComponent = () => {
    return (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Cargando...</p>
        </div>
    );
};

// Estilos básicos para el componente
const styles = {
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente
        zIndex: 1000, // Asegura que esté por encima de otros elementos
    },
    spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid #007BFF', // Color del spinner
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite', // Animación de rotación
    },
    loadingText: {
        marginTop: '10px',
        fontSize: '16px',
        color: '#007BFF',
    },
    // Definición de la animación de rotación
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};

export default LoadingComponent;