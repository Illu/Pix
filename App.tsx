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
import Publish from './src/screens/Publish';
import {getColorScheme} from './src/helpers';

enableScreens();

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const ChallengesNav = createNativeStackNavigator();
const EditorNav = createNativeStackNavigator();

const HomeStack = () => (
  <HomeNav.Navigator>
    <HomeNav.Screen name="Home" component={Home} />
  </HomeNav.Navigator>
);

const ChallengesStack = () => (
  <ChallengesNav.Navigator>
    <ChallengesNav.Screen name="Challenges" component={Challenges} />
  </ChallengesNav.Navigator>
);

const TabsStack = () => (
  <Tab.Navigator tabBar={Tabbar}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Editor" component={Editor} />
    <Tab.Screen name="Challenges" component={ChallengesStack} />
  </Tab.Navigator>
);

const EditorStack = () => (
  <EditorNav.Navigator>
    <EditorNav.Screen
      name="Edit"
      component={Editor}
      options={{headerShown: false}}
    />
    <EditorNav.Screen name="Publish" component={Publish} />
  </EditorNav.Navigator>
);

const App = () => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);

  const {theme, statusBarStyle} = getColorScheme(appStateStore.theme, scheme);

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
