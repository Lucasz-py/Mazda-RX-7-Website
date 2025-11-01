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
        <div className="model-viewer-clean">
            <model-viewer
                ref={modelViewerRef}
                src="/auto5.glb"
                alt="Mazda RX-7 FD3S"
                auto-rotate
                camera-controls
                shadow-intensity="1"
                exposure="1"
            >
                <div slot="progress-bar" style={{ display: 'none' }}></div>
            </model-viewer>

            {showWarning && !isModelLoaded && (
                <div className="warning-overlay">
                    <p>⚠️ Asegúrate de que <strong>auto5.glb</strong> esté en la carpeta <strong>public/</strong></p>
                </div>
            )}
        </div>
    );
};