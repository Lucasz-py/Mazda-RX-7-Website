import React from 'react';
import { HexColorPicker } from 'react-colorful';
import './CustomColorPicker.css';

interface CustomColorPickerProps {
    color: string;
    onChange: (newColor: string) => void;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, onChange }) => {
    return (
        <div className="color-picker-popup">
            <HexColorPicker color={color} onChange={onChange} />
        </div>
    );
};