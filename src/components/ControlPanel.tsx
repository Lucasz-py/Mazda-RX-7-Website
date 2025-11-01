import React from 'react';
import { Color, HoodOption } from '../types';
import { ColorPanel } from './ColorPanel';
import { HoodSelector } from './HoodSelector';
import { RimsPanel } from './RimsPanel';
import './ControlPanel.css';

interface ControlPanelProps {
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
    onTestMaterial?: (materialName: string, color: string) => void;
    availableMaterials?: string[];
    showDebug?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
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
    onReset,
    onTestMaterial,
    availableMaterials = [],
    showDebug = false
}) => {
    return (
        <div className="control-panel">
            <ColorPanel
                title="🎨 Pintura Principal"
                colors={colors}
                onColorSelect={onPrimaryColorChange}
                selectedColor={primaryColor}
            />

            <ColorPanel
                title="✨ Pintura Secundaria"
                colors={colors}
                onColorSelect={onSecondaryColorChange}
                selectedColor={secondaryColor}
            />

            {/* --- Rines movido aquí --- */}
            <RimsPanel
                colors={colors}
                onColorSelect={onRimsColorChange}
                selectedColor={rimsColor}
            />

            {/* --- Capó movido al final --- */}
            <HoodSelector
                options={hoodOptions}
                selectedOption={hoodOption}
                onOptionSelect={onHoodOptionChange}
            />

            <button onClick={onReset} className="reset-button">
                🔄 Restaurar Colores Originales
            </button>

            {showDebug && onTestMaterial && availableMaterials.length > 0 && (
                <div className="test-materials-section">
                    <h3 className="test-title">🔬 Prueba de Materiales (Debug)</h3>
                    <p className="test-description">
                        Haz clic para pintar cada material de rojo y ver qué parte es:
                    </p>
                    <div className="material-count">
                        Total de materiales: <strong>{availableMaterials.length}</strong>
                    </div>
                    <div className="test-buttons">
                        {availableMaterials.map((material, index) => (
                            <button
                                key={`${material}-${index}`}
                                onClick={() => onTestMaterial(material, '#ff0000')}
                                className="test-button"
                                title={material}
                            >
                                <span className="mat-number">Mat {index}:</span>
                                <span className="mat-name">
                                    {material.length > 20 ? material.substring(0, 20) + '...' : material}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="info-box">
                <h3 className="info-title">ℹ️ Información</h3>
                <ul className="info-list">
                    <li>• <strong>Pintura Principal:</strong> Carrocería completa</li>
                    <li>• <strong>Capó:</strong> Original (sigue pintura principal) o Negro</li>
                    <li>• <strong>Pintura Secundaria:</strong> Kit aerodinámico y detalles</li>
                    <li>• <strong>Rines:</strong> Color personalizado de las llantas</li>
                    <li>• Archivo actual: <strong>auto5.glb</strong></li>
                </ul>
            </div>
        </div>
    );
};