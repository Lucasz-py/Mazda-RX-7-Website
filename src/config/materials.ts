import { Color, MaterialConfig } from '../types';

export const COLORS: Color[] = [
    { name: 'Rojo', hex: '#ff0000' },
    { name: 'Azul', hex: '#0066ff' },
    { name: 'Negro', hex: '#000000' },
    { name: 'Blanco', hex: '#ffffff' },
    { name: 'Amarillo', hex: '#ffdd00' },
    { name: 'Verde', hex: '#00ff00' },
    { name: 'Naranja', hex: '#ff6600' },
    { name: 'Morado', hex: '#9900ff' },
];

export const MATERIAL_CONFIG: MaterialConfig = {
    // Pintura Principal: Carrocería completa (body + capó)
    primary: [
        'carroceria',  // Material que pinta la carrocería
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet_ref.001'  // Mat 5: ref - para el capó
    ],
    // Pintura Secundaria: Detalles y kit aerodinámico
    secondary: [
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_body_n.001'  // Mat 2: n - detalles
    ]
};

// Lista completa de materiales del modelo auto5.glb (se actualizará dinámicamente)
export let AVAILABLE_MATERIALS: string[] = [];

export const updateAvailableMaterials = (materials: string[]) => {
    AVAILABLE_MATERIALS = materials;
};