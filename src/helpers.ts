import { Themes } from './types';
import { darkTheme, lightTheme } from './theme';
import { ColorSchemeName } from 'react-native-appearance';
import { PIXEL_COUNT } from './constants';

export const getColorScheme = (theme: Themes, scheme: ColorSchemeName) => {
  if (theme === Themes.automatic) {
    if (scheme === 'dark') {
      return { theme: darkTheme, statusBarStyle: 'light-content' };
    } else {
      return { theme: lightTheme, statusBarStyle: 'dark-content' };
    }
  } else if (theme === Themes.light) {
    return { theme: lightTheme, statusBarStyle: 'dark-content' };
  } else if (theme === Themes.dark) {
    return { theme: darkTheme, statusBarStyle: 'light-content' };
  }
};


export const getInitialCanvasData = () => Array.apply(null, {
  length: PIXEL_COUNT * PIXEL_COUNT,
}).map(() => ({ color: 'none' }));