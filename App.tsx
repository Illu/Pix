import React, {useContext} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {Themes} from './src/types';
import {StatusBar} from 'react-native';
import {darkTheme, lightTheme} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import AppState from './src/stores/AppState';
import Home from './src/screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen name="Home" component={Home} />
    </HomeNav.Navigator>
  );
};

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
        <NavigationContainer>
          <StatusBar barStyle={statusBarStyle} />
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Challenges" component={HomeStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
