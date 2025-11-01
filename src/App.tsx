import React, { useState, useCallback, useRef } from 'react';
import { ModelViewer } from './components/ModelViewer';
import { ControlPanel } from './components/ControlPanel';
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

        console.log('🎯 Configuración de materiales:');
        console.log('   Pintura Principal:', MATERIAL_CONFIG.primary);
        console.log('   Capó:', MATERIAL_CONFIG.hood);
        console.log('   Pintura Secundaria:', MATERIAL_CONFIG.secondary);
        console.log('   Rines:', MATERIAL_CONFIG.rims);
    }, []);

    const changeMaterialColor = useCallback((materialNames: string[], color: string, logPrefix = '🎨') => {
        const modelViewer = modelViewerInstanceRef.current;

        if (!modelViewer?.model) {
            console.warn('⚠️ Modelo no disponible');
            return;
        }

        const materials = modelViewer.model.materials;

        console.log(`${logPrefix} Cambiando color a:`, color);
        console.log('📋 Materiales objetivo:', materialNames);

        let successCount = 0;

        materialNames.forEach(targetName => {
            const material = materials.find((m: any) => m.name === targetName);
            if (material) {
                try {
                    material.pbrMetallicRoughness.setBaseColorFactor(color);
                    console.log(`✅ Color cambiado: ${targetName}`);
                    successCount++;
                } catch (error) {
                    console.error(`❌ Error al cambiar color de ${targetName}:`, error);
                }
            } else {
                console.warn(`⚠️ Material no encontrado: ${targetName}`);
            }
        });

        console.log(`📊 Éxitos: ${successCount}/${materialNames.length}`);
    }, []);

    const testSingleMaterial = useCallback((materialName: string, color: string) => {
        console.log(`\n🧪 === PROBANDO MATERIAL ===`);
        console.log(`Material: ${materialName}`);
        console.log(`Color: ${color}`);
        changeMaterialColor([materialName], color, '🧪');
    }, [changeMaterialColor]);

    const handlePrimaryColorChange = useCallback((color: Color) => {
        console.log('\n🎨 === PINTURA PRINCIPAL ===');
        setPrimaryColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.primary, color.hex, '🎨');

        // Si el capó está en "original", también cambiarlo
        if (hoodOption === 'original') {
            console.log('🎩 Aplicando color también al capó (modo original)');
            changeMaterialColor(MATERIAL_CONFIG.hood, color.hex, '🎩');
        }
    }, [changeMaterialColor, hoodOption]);

    const handleSecondaryColorChange = useCallback((color: Color) => {
        console.log('\n✨ === PINTURA SECUNDARIA ===');
        setSecondaryColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.secondary, color.hex, '✨');
    }, [changeMaterialColor]);

    const handleRimsColorChange = useCallback((color: Color) => {
        console.log('\n🔘 === RINES ===');
        setRimsColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.rims, color.hex, '🔘');
    }, [changeMaterialColor]);

    const handleHoodOptionChange = useCallback((option: HoodOption) => {
        console.log('\n🎩 === CAPÓ ===');
        console.log('Opción seleccionada:', option.name);
        setHoodOption(option.value);

        if (option.value === 'black') {
            // Pintar el capó de negro
            changeMaterialColor(MATERIAL_CONFIG.hood, '#000000', '🎩');
        } else {
            // Pintar el capó del color de la pintura principal
            const colorToApply = primaryColor || '#ffffff';
            console.log('🎩 Aplicando color de pintura principal:', colorToApply);
            changeMaterialColor(MATERIAL_CONFIG.hood, colorToApply, '🎩');
        }
    }, [changeMaterialColor, primaryColor]);

    const resetColors = useCallback(() => {
        console.log('\n🔄 === RESTAURANDO COLORES ===');
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
                        console.error(`Error al resetear ${materialName}:`, error);
                    }
                }
            });
            console.log('✅ Colores restaurados');
        }
    }, [availableMaterials]);

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1 className="title">Personalizador de Auto</h1>
                    <p className="subtitle">Mazda RX-7 FD3S - Stinger Prototype</p>
                </header>

                <div className="content">
                    <div className="viewer-section">
                        <ModelViewer
                            onModelLoad={handleModelLoad}
                            isModelLoaded={isModelLoaded}
                        />
                    </div>

                    <div className="controls-section">
                        <ControlPanel
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
                            onTestMaterial={testSingleMaterial}
                            availableMaterials={availableMaterials}
                            showDebug={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;