// Tipos para @google/model-viewer

export interface Material {
    name: string;
    pbrMetallicRoughness: {
        setBaseColorFactor: (color: string) => void;
    };
}

export interface Model {
    materials: Material[];
}

export interface ModelViewerElement extends HTMLElement {
    model?: Model;
    addEventListener(type: 'load', listener: () => void): void;
    addEventListener(type: 'error', listener: (event: ErrorEvent) => void): void;
    removeEventListener(type: 'load', listener: () => void): void;
    removeEventListener(type: 'error', listener: (event: ErrorEvent) => void): void;
}

// Declaración global para JSX
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src?: string;
                    alt?: string;
                    'auto-rotate'?: boolean;
                    'camera-controls'?: boolean;
                    'shadow-intensity'?: string;
                    exposure?: string;
                    ar?: boolean;
                    'ar-modes'?: string;
                    ref?: React.Ref<ModelViewerElement>;
                },
                HTMLElement
            >;
        }
    }
}