import React, { useRef, useEffect, useState } from 'react';
import '@google/model-viewer';
import './ModelViewer.css';

interface ModelViewerProps {
    onModelLoad: (modelViewer: any, materials: string[]) => void;
    isModelLoaded: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
    onModelLoad,
    isModelLoaded
}) => {
    const modelViewerRef = useRef<any>(null);
    const [showWarning, setShowWarning] = useState(true);

    useEffect(() => {
        const modelViewer = modelViewerRef.current;

        const handleLoad = () => {
            console.log('✅ Modelo auto5.glb cargado correctamente');
            setShowWarning(false);

            if (modelViewer?.model) {
                const materials = modelViewer.model.materials;
                const materialNames = materials.map((m: any) => m.name);

                console.log('📋 Total de materiales:', materials.length);
                console.log('🎨 Materiales disponibles:', materials.map((m: any, i: number) =>
                    `Material ${i}: ${m.name}`
                ));

                // Llamar al callback con los nombres de materiales
                onModelLoad(modelViewer, materialNames);
            }
        };

        const handleError = (event: any) => {
            console.error('❌ Error al cargar el modelo:', event);
            setShowWarning(true);
        };

        if (modelViewer) {
            modelViewer.addEventListener('load', handleLoad);
            modelViewer.addEventListener('error', handleError);
        }

        return () => {
            if (modelViewer) {
                modelViewer.removeEventListener('load', handleLoad);
                modelViewer.removeEventListener('error', handleError);
            }
        };
    }, [onModelLoad]);

    return (
        <div className="model-viewer-container">
            <div className="model-viewer-wrapper">
                <model-viewer
                    ref={modelViewerRef}
                    src="/auto5.glb"
                    alt="Mazda RX-7 FD3S"
                    auto-rotate
                    camera-controls
                    shadow-intensity="1"
                    exposure="1"
                    className="model-viewer"
                >
                    <div slot="progress-bar" style={{ display: 'none' }}></div>
                </model-viewer>

                {showWarning && !isModelLoaded && (
                    <div className="warning-message">
                        <p>
                            ⚠️ Asegúrate de que el archivo <strong>auto5.glb</strong> esté en la carpeta <strong>public/</strong>
                        </p>
                    </div>
                )}
            </div>

            <div className="controls-info">
                <span>🖱️ Arrastra para rotar</span>
                <span>🔍 Rueda para zoom</span>
                <span>⚪ Click derecho para mover</span>
            </div>
        </div>
    );
};