export interface Color {
    name: string;
    hex: string;
}

export interface MaterialConfig {
    primary: string[];
    secondary: string[];
    hood: string[];      // Nuevo: Material del capó
    rims: string[];      // Nuevo: Material de los rines
}

export interface HoodOption {
    name: string;
    value: 'original' | 'black';
}