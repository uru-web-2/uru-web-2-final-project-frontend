import { useEffect, useState } from 'react';
import './CSS/GlobalLoader.css'; // Asegúrate de que la ruta sea correcta

export const GlobalLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleLoading = (e) => {
            setIsLoading(e.detail.isLoading);
            if (e.detail.isLoading) {
                setProgress(0);
                // Simulación de progreso (opcional)
                const interval = setInterval(() => {
                    setProgress((prev) => (prev < 90 ? prev + 10 : prev));
                }, 500);
                return () => clearInterval(interval);
            }
        };

        document.addEventListener('globalLoading', handleLoading);
        return () => document.removeEventListener('globalLoading', handleLoading);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="pro-loader">
            {/* Loader principal con logo o icono */}
            <div className="logo-pulse">
                <svg viewBox="0 0 100 100" className="logo-icon">
                    <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
            </div>

            {/* Barra de progreso minimalista */}
            <div className="sleek-progress">
                <div className="progress-track" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Texto con efecto sutil */}
            <p className="loading-text">
                Cargando <span className="loading-dots">...</span>
            </p>
        </div>
    );
};