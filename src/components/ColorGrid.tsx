import React from 'react';
import { Color } from '../types';
import { ColorButton } from './ColorButton';
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
    return (
        <div className="color-grid-compact">
            {colors.map((color) => (
                <ColorButton
                    key={color.hex}
                    color={color}
                    onClick={() => onColorSelect(color)}
                    isSelected={selectedColor === color.hex}
                />
            ))}
        </div>
    );
};