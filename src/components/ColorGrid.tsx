import React, { useState } from 'react';
import { Color } from '../types';
import { ColorButton } from './ColorButton';
import { CustomColorPicker } from './CustomColorPicker';
import './ColorGrid.css';

interface ColorGridProps {
    colors: Color[];
    onColorSelect: (color: Color) => void;
    selectedColor: string | null;
}

export const ColorGrid: React.FC<ColorGridProps> = ({
    colors,
    onColorSelect,
    selectedColor
}) => {
    const [showPicker, setShowPicker] = useState(false);

    const handlePencilClick = () => {
        setShowPicker(!showPicker);
    };

    const handleColorChange = (newHex: string) => {
        onColorSelect({ name: 'Custom', hex: newHex });
    };

    return (
        // --- INICIO DE LA MODIFICACIÓN ---
        // 1. Añadimos un <div> padre para envolver la grilla Y el picker
        <div>
            <div className="color-grid-compact">
                {colors.map((color) => (
                    <ColorButton
                        key={color.hex}
                        color={color}
                        onClick={() => onColorSelect(color)}
                        isSelected={selectedColor === color.hex}
                    />
                ))}

                <button
                    className="custom-color-button"
                    onClick={handlePencilClick}
                    title="Seleccionar color personalizado"
                >
                    ✏️
                </button>
            </div>

            {/* 2. El picker ahora se renderiza *debajo* de la grilla,
                   dentro del <div> padre */}
            {showPicker && (
                <CustomColorPicker
                    color={selectedColor || '#ffffff'}
                    onChange={handleColorChange}
                />
            )}
        </div>
        // --- FIN DE LA MODIFICACIÓN ---
    );
};