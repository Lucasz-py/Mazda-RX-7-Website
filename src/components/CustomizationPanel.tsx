import React from 'react';
import { Color, HoodOption } from '../types';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorGrid } from './ColorGrid';
import { HoodOptions } from './HoodOptions';
import './CustomizationPanel.css';

interface CustomizationPanelProps {
    colors: Color[];
    hoodOptions: HoodOption[];
    primaryColor: string | null;
    secondaryColor: string | null;
    rimsColor: string | null;
    hoodOption: 'original' | 'black';
    onPrimaryColorChange: (color: Color) => void;
    onSecondaryColorChange: (color: Color) => void;
    onRimsColorChange: (color: Color) => void;
    onHoodOptionChange: (option: HoodOption) => void;
    onReset: () => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
    colors,
    hoodOptions,
    primaryColor,
    secondaryColor,
    rimsColor,
    hoodOption,
    onPrimaryColorChange,
    onSecondaryColorChange,
    onRimsColorChange,
    onHoodOptionChange,
    onReset
}) => {
    return (
        <div className="customization-panel">
            <div className="customization-scroll">
                <CollapsibleSection title="COLOR PRINCIPAL">
                    <ColorGrid
                        colors={colors}
                        onColorSelect={onPrimaryColorChange}
                        selectedColor={primaryColor}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="COLOR SECUNDARIO">
                    <ColorGrid
                        colors={colors}
                        onColorSelect={onSecondaryColorChange}
                        selectedColor={secondaryColor}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="COLOR RINES">
                    <ColorGrid
                        colors={colors}
                        onColorSelect={onRimsColorChange}
                        selectedColor={rimsColor}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="COLOR CAPO">
                    <HoodOptions
                        options={hoodOptions}
                        selectedOption={hoodOption}
                        onOptionSelect={onHoodOptionChange}
                    />
                </CollapsibleSection>
            </div>

            <button onClick={onReset} className="reset-button-new">
                RESTAURAR
            </button>
        </div>
    );
};