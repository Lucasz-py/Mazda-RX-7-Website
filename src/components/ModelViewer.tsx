import React, { useRef, useEffect, useState } from 'react';
import '@google/model-viewer';
import { ModelViewerElement } from '../types/model-viewer';
import './ModelViewer.css';

interface ModelViewerProps {
    onModelLoad: (modelViewer: ModelViewerElement, materials: string[]) => void;
    isModelLoaded: boolean;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
    onModelLoad,
    isModelLoaded
}) => {
    const modelViewerRef = useRef<ModelViewerElement | null>(null);

    // --- INICIO DE LA CORRECCIÓN ---
    // Cambiamos 'useState(true)' por 'useState(false)'.
    // Esto oculta la alerta por defecto.
    const [showWarning, setShowWarning] = useState(false);
    // --- FIN DE LA CORRECCIÓN ---

    useEffect(() => {
        const modelViewer = modelViewerRef.current;

        const handleLoad = () => {
            console.log('✅ Modelo auto5.glb cargado correctamente');
            setShowWarning(false); // Se mantiene en false

            if (modelViewer?.model) {
                const materials = modelViewer.model.materials;
                const materialNames = materials.map((m) => m.name);

                console.log('📋 Total de materiales:', materials.length);
                console.log('🎨 Materiales disponibles:', materials.map((m, i) =>
                    `Material ${i}: ${m.name}`
                ));

                onModelLoad(modelViewer, materialNames);
            }
        };

        const handleError = (event: ErrorEvent) => {
            console.error('❌ Error al cargar el modelo:', event);
            // Si hay un error real, la alerta SÍ aparecerá.
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
            {/* @ts-ignore - model-viewer es un Web Component */}
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

            {/* Esta lógica ahora está oculta por defecto */}
            {showWarning && !isModelLoaded && (
                <div className="warning-overlay">
                    <p>⚠️ Asegúrate de que <strong>auto5.glb</strong> esté en la carpeta <strong>public/</strong></p>
                </div>
            )}
        </div>
    );
};