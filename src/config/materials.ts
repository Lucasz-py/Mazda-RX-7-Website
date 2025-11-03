import { Color, MaterialConfig, HoodOption } from '../types';

export const COLORS: Color[] = [
    { name: 'Rojo', hex: '#ff0000' },
    { name: 'Azul', hex: '#0066ff' },
    { name: 'Negro', hex: '#000000' },
    { name: 'Blanco', hex: '#ffffff' },
    { name: 'Amarillo', hex: '#ffdd00' },
    { name: 'Verde', hex: '#00ff00' },
    //{ name: 'Naranja', hex: '#ff6600' },
    { name: 'Morado', hex: '#9900ff' },
];

export const HOOD_OPTIONS: HoodOption[] = [
    { name: 'Original', value: 'original' },
    { name: 'Negro', value: 'black' }
];

export const MATERIAL_CONFIG: MaterialConfig = {
    // Pintura Principal: Carrocería completa
    primary: [
        'carroceria',
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet_ref.001'
    ],
    // Pintura Secundaria: Detalles y kit aerodinámico
    secondary: [
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_body_n.001',
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet.001'
    ],
    // Capó: Material específico del capó (tiene prioridad sobre pintura principal)
    hood: [
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet_ref.001'  // Mat 6: capo
    ],
    // Rines: Material de las llantas
    rims: [
        'material.001'  // Mat 10: rines
    ]
};

export let AVAILABLE_MATERIALS: string[] = [];

export const updateAvailableMaterials = (materials: string[]) => {
    AVAILABLE_MATERIALS = materials;
};