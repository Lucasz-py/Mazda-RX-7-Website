import React from 'react';
import { HoodOption } from '../types';
import './HoodSelector.css';

interface HoodSelectorProps {
    options: HoodOption[];
    selectedOption: 'original' | 'black';
    onOptionSelect: (option: HoodOption) => void;
}

export const HoodSelector: React.FC<HoodSelectorProps> = ({
    options,
    selectedOption,
    onOptionSelect
}) => {
    return (
        <div className="hood-selector">
            <h2 className="hood-selector-title">🎩 Capó</h2>
            <div className="hood-options">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onOptionSelect(option)}
                        className={`hood-option ${selectedOption === option.value ? 'selected' : ''}`}
                    >
                        {option.value === 'original' && <span className="hood-icon">🎨</span>}
                        {option.value === 'black' && <span className="hood-icon">⬛</span>}
                        <span className="hood-label">{option.name}</span>
                    </button>
                ))}
            </div>
            <p className="hood-description">
                {selectedOption === 'original'
                    ? 'El capó sigue el color de la pintura principal'
                    : 'El capó está pintado de negro'}
            </p>
        </div>
    );
};