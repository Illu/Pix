import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const DEFAULT_EDITOR_BACKGROUND_COLOR = "#E5E5E5";
export const DEFAULT_EDITOR_COLOR_PALETTE = ["#FF0000", "#2B2D42", "#FFFFFF", "#FF8A00", "#FFE600", "#70FF00"];

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondary: '#fff',
    background: '#E5E5E5',
    placeholderText: '#7d7f86',
    inputBackground: '#dee1e7',
    secondaryText: '#666',
    accent: '#0a84ff',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#c3c4c6',
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
    secondaryText: '#999',
    secondary: '#1a1d1e',
    accent: '#0a84ff',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#68707e',
  },
};
