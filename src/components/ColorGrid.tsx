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
        onColorSelect({ name: 'Custom', hex: newHex, image: '/lapiz.png' }); // Añadimos 'image'
    };

    return (
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

                {/* --- INICIO DEL CAMBIO --- */}
                <button
                    className="custom-color-button"
                    onClick={handlePencilClick}
                    title="Seleccionar color personalizado"
                >
                    {/* Reemplazamos el emoji por la imagen */}
                    <img
                        src="/lapiz.png"
                        alt="Personalizar"
                        className="color-button-image"
                    />
                </button>
                {/* --- FIN DEL CAMBIO --- */}
            </div>

            {showPicker && (
                <CustomColorPicker
                    color={selectedColor || '#ffffff'}
                    onChange={handleColorChange}
                />
            )}
        </div>
    );
};