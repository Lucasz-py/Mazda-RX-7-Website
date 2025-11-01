import React, { useState, useCallback, useRef } from 'react';
import { ModelViewer } from './components/ModelViewer';
import { ControlPanel } from './components/ControlPanel';
import { Color } from './types';
import { COLORS, MATERIAL_CONFIG } from './config/materials';
import './App.css';

const App: React.FC = () => {
    const [primaryColor, setPrimaryColor] = useState<string | null>(null);
    const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
    const modelViewerInstanceRef = useRef<any>(null);

    const handleModelLoad = useCallback((modelViewer: any, materials: string[]) => {
        setIsModelLoaded(true);
        setAvailableMaterials(materials);
        modelViewerInstanceRef.current = modelViewer;

        console.log('🎯 Configuración actual:');
        console.log('   Pintura Principal:', MATERIAL_CONFIG.primary);
        console.log('   Pintura Secundaria:', MATERIAL_CONFIG.secondary);
    }, []);

    const changeMaterialColor = useCallback((materialNames: string[], color: string) => {
        const modelViewer = modelViewerInstanceRef.current;

        if (!modelViewer?.model) {
            console.warn('⚠️ Modelo no disponible');
            return;
        }

        const materials = modelViewer.model.materials;

        console.log('🎨 Cambiando color a:', color);
        console.log('📋 Materiales objetivo:', materialNames);

        let successCount = 0;
        let failCount = 0;

        materialNames.forEach(targetName => {
            const material = materials.find((m: any) => m.name === targetName);
            if (material) {
                try {
                    material.pbrMetallicRoughness.setBaseColorFactor(color);
                    console.log(`✅ Color cambiado: ${targetName}`);
                    successCount++;
                } catch (error) {
                    console.error(`❌ Error al cambiar color de ${targetName}:`, error);
                    failCount++;
                }
            } else {
                console.warn(`⚠️ Material no encontrado: ${targetName}`);
                failCount++;
            }
        });

        console.log(`📊 Resultado: ${successCount} éxitos, ${failCount} fallos`);
    }, []);

    const testSingleMaterial = useCallback((materialName: string, color: string) => {
        console.log(`\n🧪 === PROBANDO MATERIAL ===`);
        console.log(`Material: ${materialName}`);
        console.log(`Color: ${color}`);
        changeMaterialColor([materialName], color);
    }, [changeMaterialColor]);

    const handlePrimaryColorChange = useCallback((color: Color) => {
        console.log('\n🎨 === PINTURA PRINCIPAL ===');
        setPrimaryColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.primary, color.hex);
    }, [changeMaterialColor]);

    const handleSecondaryColorChange = useCallback((color: Color) => {
        console.log('\n✨ === PINTURA SECUNDARIA ===');
        setSecondaryColor(color.hex);
        changeMaterialColor(MATERIAL_CONFIG.secondary, color.hex);
    }, [changeMaterialColor]);

    const resetColors = useCallback(() => {
        console.log('\n🔄 === RESTAURANDO COLORES ===');
        setPrimaryColor(null);
        setSecondaryColor(null);

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
                    <h1 className="title">Personalizador de Auto 3D</h1>
                    <p className="subtitle">Mazda RX-7 FD3S - Stinger Prototype (auto5.glb)</p>
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
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            onPrimaryColorChange={handlePrimaryColorChange}
                            onSecondaryColorChange={handleSecondaryColorChange}
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