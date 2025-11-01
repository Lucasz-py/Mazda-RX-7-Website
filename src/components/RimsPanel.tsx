import React from 'react';
import { Color } from '../types';
import { ColorButton } from './ColorButton';
import './RimsPanel.css';

interface RimsPanelProps {
    colors: Color[];
    onColorSelect: (color: Color) => void;
    selectedColor: string | null;
}

export const RimsPanel: React.FC<RimsPanelProps> = ({
    colors,
    onColorSelect,
    selectedColor
}) => {
    return (
        <div className="rims-panel">
            <h2 className="rims-panel-title">🔘 Rines</h2>
            <div className="rims-color-grid">
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