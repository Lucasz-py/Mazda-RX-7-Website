import { Color, MaterialConfig, HoodOption } from '../types';

export const COLORS: Color[] = [
    { name: 'Rojo', hex: '#ff0000', image: '/rojo.png' },
    { name: 'Azul', hex: '#0066ff', image: '/azul.png' },
    { name: 'Negro', hex: '#000000', image: '/negro.png' },
    { name: 'Blanco', hex: '#ffffff', image: '/blanco.png' },
    { name: 'Amarillo', hex: '#ffdd00', image: '/amarillo.png' },
    { name: 'Verde', hex: '#00ff00', image: '/verde.png' },
    { name: 'Morado', hex: '#9900ff', image: '/morado.png' },
];

export const HOOD_OPTIONS: HoodOption[] = [
    { name: 'Original', value: 'original', image: '/original.png' },
    { name: 'Negro', value: 'black', image: '/negroCapo.png' }
];

export const MATERIAL_CONFIG: MaterialConfig = {
    primary: [
        'carroceria',
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet_ref.001'
    ],
    secondary: [
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_body_n.001',
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet.001'
    ],
    hood: [
        'MAZDA_FD3S_RX-7_R_Stinger_Prototype_bonnet_ref.001'
    ],
    rims: [
        'material.001'
    ]
};

export let AVAILABLE_MATERIALS: string[] = [];

export const updateAvailableMaterials = (materials: string[]) => {
    AVAILABLE_MATERIALS = materials;
};