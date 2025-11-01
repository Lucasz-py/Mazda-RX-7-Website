// src/global.d.ts
import React from 'react';
import type { ModelViewerElement } from './config'; // Importamos la interfaz

// Hacemos que TypeScript reconozca <model-viewer>
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<
                React.HTMLAttributes<ModelViewerElement> & {
                    ref?: React.Ref<ModelViewerElement>;
                    src?: string;
                    alt?: string;
                    'camera-controls'?: boolean;
                    'auto-rotate'?: boolean;
                    'shadow-intensity'?: string;
                },
                ModelViewerElement
            >;
        }
    }
}