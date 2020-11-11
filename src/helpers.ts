import {Themes} from './types';
import {darkTheme, lightTheme} from './theme';
import {ColorSchemeName} from 'react-native-appearance';

export const getColorScheme = (theme: Themes, scheme: ColorSchemeName) => {
  if (theme === Themes.automatic) {
    if (scheme === 'dark') {
      return {theme: darkTheme, statusBarStyle: 'light-content'};
    } else {
      return {theme: lightTheme, statusBarStyle: 'dark-content'};
    }
  } else if (theme === Themes.light) {
    return {theme: lightTheme, statusBarStyle: 'dark-content'};
  } else if (theme === Themes.dark) {
    return {theme: darkTheme, statusBarStyle: 'light-content'};
  }
};
