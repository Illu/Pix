import React, {useContext} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {Themes} from './src/types';
import {StatusBar} from 'react-native';
import {darkTheme, lightTheme} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import AppState from './src/stores/AppState';
import Home from './src/screens/Home';
import Challenges from './src/screens/Challenges';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';
import Tabbar from './src/components/Tabbar';
import Editor from './src/screens/Editor';

enableScreens();

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const ChallengesNav = createNativeStackNavigator();
const EditorNav = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen name="Home" component={Home} />
    </HomeNav.Navigator>
  );
};

const ChallengesStack = () => {
  return (
    <ChallengesNav.Navigator>
      <ChallengesNav.Screen name="Challenges" component={Challenges} />
    </ChallengesNav.Navigator>
  );
};

const TabsStack = () => {
  return (
    <Tab.Navigator tabBar={Tabbar}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Editor" component={Editor} />
      <Tab.Screen name="Challenges" component={ChallengesStack} />
    </Tab.Navigator>
  );
};

const EditorStack = () => {
  return (
    <EditorNav.Navigator>
      <EditorNav.Screen name="Edit" component={Editor} />
    </EditorNav.Navigator>
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
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={TabsStack}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="EditorModal"
              options={{headerShown: false}}
              component={EditorStack}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
