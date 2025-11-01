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
            style={{ backgroundColor: color.hex }}
            title={color.name}
            aria-label={`Seleccionar color ${color.name}`}
        />
    );
};