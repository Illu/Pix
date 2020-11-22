import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const DEFAULT_EDITOR_BACKGROUND_COLOR = '#F4F4F4';
export const DEFAULT_EDITOR_COLOR_PALETTE = 0; // Classic

export const SCREEN_PADDING = 10;

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#333',
    secondary: '#FFFFFF',
    background: '#F4F4F4',
    placeholderText: '#7d7f86',
    inputBackground: '#dee1e7',
    secondaryText: '#7A7A7A',
    accent: '#4DB3FF',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#e5e5e5',
    success: '#35CE8D',
    error: '#ED6A5A',
    yellow: '#FFB800',
    yellowBackground: '#FFFDE6',
    green: '#35CE8D',
    greenBackground: '#EBFBF4'
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fff',
    background: '#000',
    placeholderText: '#666',
    inputBackground: '#1e2022',
    secondaryText: '#9A9A9A',
    secondary: '#1a1d1e',
    accent: '#4DB3FF',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#68707e',
    success: '#35CE8D',
    error: '#ED6A5A',
    yellow: '#FFFFFF',
    yellowBackground: '#FFB800',
    green: '#FFFFFF',
    greenBackground: '#35CE8D'
  },
};

export const PALETTES = [
  {
    name: 'Classic',
    colors: [
      '#2B2D42',
      '#FFFFFF',
      '#ED6A5A',
      '#FFB800',
      '#35CE8D',
      '#4DB3FF',
      '#0085FF',
    ],
  },
  {
    name: 'Fall',
    colors: [
      '#291517',
      '#5A1F31',
      '#A47973',
      '#F79A32',
      '#AD4D00',
      '#0A4E35',
      '#859B8E',
    ],
  },
  {
    name: 'Ocean',
    colors: [
      '#023450',
      '#076194',
      '#6493AD',
      '#72ACAE',
      '#B4DADB',
      '#F2F1F7',
      '#B2AFCC',
    ],
  },
  {
    name: 'Greens',
    colors: [
      '#DFEEC5',
      '#BAD87C',
      '#BDFF00',
      '#73DB21',
      '#55B808',
      '#188B46',
      '#01672A',
    ],
  },
  {
    name: 'Skin',
    colors: [
      '#F9F4F0',
      '#FAEBDE',
      '#F8ECCF',
      '#E6C6A2',
      '#795A3D',
      '#5F3D1F',
      '#402812',
    ],
  },
];
