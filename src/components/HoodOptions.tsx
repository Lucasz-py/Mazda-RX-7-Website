import React from 'react';
import { HoodOption } from '../types';
import './HoodOptions.css';

interface HoodOptionsProps {
    options: HoodOption[];
    selectedOption: 'original' | 'black';
    onOptionSelect: (option: HoodOption) => void;
}

export const HoodOptions: React.FC<HoodOptionsProps> = ({
    options,
    selectedOption,
    onOptionSelect
}) => {
    return (
        <div className="hood-options-grid">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onOptionSelect(option)}
                    className={`hood-option-button ${selectedOption === option.value ? 'selected' : ''}`}
                    title={option.name}
                >
                    {/* Se reemplazó el <span> por <img> */}
                    <img
                        src={option.image}
                        alt={option.name}
                        className="hood-option-image"
                    />
                </button>
            ))}
        </div>
    );
};