export interface Color {
    name: string;
    hex: string;
    image: string;
}

export interface MaterialConfig {
    primary: string[];
    secondary: string[];
    hood: string[];
    rims: string[];
}

export interface HoodOption {
    name: string;
    value: 'original' | 'black';
    image: string; // <-- AÑADIDO
}