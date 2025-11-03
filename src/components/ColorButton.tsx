import React from 'react';
import { Color } from '../types';
import './ColorButton.css';

interface ColorButtonProps {
    color: Color;
    onClick: () => void;
    isSelected: boolean;
}

export const ColorButton: React.FC<ColorButtonProps> = ({
    color,
    onClick,
    isSelected
}) => {
    return (
        <button
            onClick={onClick}
            className={`color-button ${isSelected ? 'selected' : ''}`}
            title={color.name}
        >
            {/* --- INICIO DEL CAMBIO --- */}
            <img
                src={color.image}
                alt={color.name}
                className="color-button-image"
            />
            {/* --- FIN DEL CAMBIO --- */}
        </button>
    );
};