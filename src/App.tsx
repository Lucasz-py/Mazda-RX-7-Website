import React, { useState, useCallback, useRef } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ModelViewer } from './components/ModelViewer';
import { CustomizationPanel } from './components/CustomizationPanel';
import { Color, HoodOption } from './types';
import { COLORS, HOOD_OPTIONS, MATERIAL_CONFIG } from './config/materials';
import './App.css';

const App: React.FC = () => {
    const [primaryColor, setPrimaryColor] = useState<string | null>(null);
    const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
    const [rimsColor, setRimsColor] = useState<string | null>(null);
    const [hoodOption, setHoodOption] = useState<'original' | 'black'>('original');
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
    const modelViewerInstanceRef = useRef<any>(null);

    const handleModelLoad = useCallback((modelViewer: any, materials: string[]) => {
        setIsModelLoaded(true);
        setAvailableMaterials(materials);
        modelViewerInstanceRef.current = modelViewer;
    }, []);

    const changeMaterialColor = useCallback((materialNames: string[], color: string) => {
        const modelViewer = modelViewerInstanceRef.current;

        if (!modelViewer?.model) return;

        const materials = modelViewer.model.materials;

        materialNames.forEach(targetName => {
            const material = materials.find((m: any) => m.name === targetName);
            if (material) {
                try {
                    material.pbrMetallicRoughness.setBaseColorFactor(color);
                } catch (error) {
                    console.error(`Error: ${targetName}`, error);
                }
            }
        });
    }, []);

    const handlePrimaryColorChange = useCallback((color: Color) => {
        setPrimaryColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.primary, color.hex);

        if (hoodOption === 'original') {
            changeMaterialColor(MATERIAL_CONFIG.hood, color.hex);
        }
    }, [changeMaterialColor, hoodOption]);

    const handleSecondaryColorChange = useCallback((color: Color) => {
        setSecondaryColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.secondary, color.hex);
    }, [changeMaterialColor]);

    const handleRimsColorChange = useCallback((color: Color) => {
        setRimsColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.rims, color.hex);
    }, [changeMaterialColor]);

    const handleHoodOptionChange = useCallback((option: HoodOption) => {
        setHoodOption(option.value);

        if (option.value === 'black') {
            changeMaterialColor(MATERIAL_CONFIG.hood, '#000000');
        } else {
            const colorToApply = primaryColor || '#ffffff';
            changeMaterialColor(MATERIAL_CONFIG.hood, colorToApply);
        }
    }, [changeMaterialColor, primaryColor]);

    const resetColors = useCallback(() => {
        setPrimaryColor(null);
        setSecondaryColor(null);
        setRimsColor(null);
        setHoodOption('original');

        const modelViewer = modelViewerInstanceRef.current;

        if (modelViewer?.model && availableMaterials.length > 0) {
            availableMaterials.forEach(materialName => {
                const material = modelViewer.model.materials.find((m: any) => m.name === materialName);
                if (material) {
                    try {
                        material.pbrMetallicRoughness.setBaseColorFactor('#ffffff');
                    } catch (error) {
                        console.error(`Error: ${materialName}`, error);
                    }
                }
            });
        }
    }, [availableMaterials]);

    return (
        <div className="app-container">
            <Header />

            <main className="main-content">
                <div className="viewer-container">
                    {/* Aquí ya no está la imagen del marco */}
                    <ModelViewer
                        onModelLoad={handleModelLoad}
                        isModelLoaded={isModelLoaded}
                    />
                </div>

                <div className="customization-container">
                    <CustomizationPanel
                        colors={COLORS}
                        hoodOptions={HOOD_OPTIONS}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        rimsColor={rimsColor}
                        hoodOption={hoodOption}
                        onPrimaryColorChange={handlePrimaryColorChange}
                        onSecondaryColorChange={handleSecondaryColorChange}
                        onRimsColorChange={handleRimsColorChange}
                        onHoodOptionChange={handleHoodOptionChange}
                        onReset={resetColors}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default App; 