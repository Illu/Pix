import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const DEFAULT_EDITOR_BACKGROUND_COLOR = '#F4F4F4';
export const DEFAULT_EDITOR_COLOR_PALETTE = [
  '#FF0000',
  '#2B2D42',
  '#FFFFFF',
  '#FF8A00',
  '#FFE600',
  '#70FF00',
];

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
    secondaryText: '#7A7A7A',
    secondary: '#1a1d1e',
    accent: '#4DB3FF',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#68707e',
  },
};
