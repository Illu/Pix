import React, {useContext} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {Themes} from './src/types';
import {StatusBar} from 'react-native';
import {darkTheme, lightTheme} from './src/theme';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import AppState from './src/stores/AppState';
import Home from './src/screens/Home';

const App = () => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);

  let theme;
  let statusBarStyle;
  if (appStateStore.theme === Themes.automatic) {
    if (scheme === 'dark') {
      theme = darkTheme;
      statusBarStyle = 'light-content';
    } else {
      theme = lightTheme;
      statusBarStyle = 'dark-content';
    }
  } else if (appStateStore.theme === Themes.light) {
    theme = lightTheme;
    statusBarStyle = 'dark-content';
  } else if (appStateStore.theme === Themes.dark) {
    theme = darkTheme;
    statusBarStyle = 'light-content';
  }

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={statusBarStyle} />
        <Home />
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
