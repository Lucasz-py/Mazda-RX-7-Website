import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
    return (
        <header className="main-header">
            <video
                className="header-media"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/encabezado.mp4" type="video/mp4" />
                {/* Fallback para navegadores que no soportan video */}
                <img src="/encabezado.gif" alt="Header" className="header-media" />
            </video>

            {/* Imagen del título encima del video */}
            <img
                src="/titulo.png"
                alt="Título"
                className="header-title"
            />
        </header>
    );
};
