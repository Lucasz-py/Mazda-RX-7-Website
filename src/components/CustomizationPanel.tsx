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
                {/* Color Principal */}
                <CollapsibleSection
                    title="COLOR PRINCIPAL"
                    imageClosed="/colorPrincipalBannerDown.png"
                    imageOpen="/colorPrincipalBannerUp.png"
                >
                    <ColorGrid
                        colors={colors}
                        onColorSelect={onPrimaryColorChange}
                        selectedColor={primaryColor}
                    />
                </CollapsibleSection>

                {/* Color Secundario */}
                <CollapsibleSection
                    title="COLOR SECUNDARIO"
                    imageClosed="/csDown.png"
                    imageOpen="/csUp.png"
                >
                    <ColorGrid
                        colors={colors}
                        onColorSelect={onSecondaryColorChange}
                        selectedColor={secondaryColor}
                    />
                </CollapsibleSection>

                {/* Color Rines */}
                <CollapsibleSection
                    title="COLOR RINES"
                    imageClosed="/crDown.png"
                    imageOpen="/crUp.png"
                >
                    <ColorGrid
                        colors={colors}
                        onColorSelect={onRimsColorChange}
                        selectedColor={rimsColor}
                    />
                </CollapsibleSection>

                {/* Color Capó */}
                <CollapsibleSection
                    title="COLOR CAPO"
                    imageClosed="/ccDown.png"
                    imageOpen="/ccUp.png"
                >
                    <HoodOptions
                        options={hoodOptions}
                        selectedOption={hoodOption}
                        onOptionSelect={onHoodOptionChange}
                    />
                </CollapsibleSection>
            </div>

            {/* BOTÓN RESTAURAR CON IMAGEN */}
            <button onClick={onReset} className="reset-button-new">
                <img
                    src="/rest.png"
                    alt="Restaurar"
                    className="reset-button-image"
                />
            </button>
        </div>
    );
};