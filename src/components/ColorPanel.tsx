import React from 'react';
import { Color } from '../types';
import { ColorButton } from './ColorButton';
import './ColorPanel.css';

interface ColorPanelProps {
    title: string;
    colors: Color[];
    onColorSelect: (color: Color) => void;
    selectedColor: string | null;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
    title,
    colors,
    onColorSelect,
    selectedColor
}) => {
    return (
        <div className="color-panel">
            <h2 className="color-panel-title">{title}</h2>
            <div className="color-grid">
                {colors.map((color) => (
                    <ColorButton
                        key={color.hex}
                        color={color}
                        onClick={() => onColorSelect(color)}
                        isSelected={selectedColor === color.hex}
                    />
                ))}
            </div>
        </div>
    );
};