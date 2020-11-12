import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import AppState from './src/stores/AppState';
import Home from './src/screens/Home';
import Challenges from './src/screens/Challenges';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import Tabbar from './src/components/Tabbar';
import Editor from './src/screens/Editor';
import Publish from './src/screens/Publish';
import { getColorScheme } from './src/helpers';
import Profile from './src/screens/Profile';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Settings from './src/screens/Settings';

enableScreens();

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const ChallengesNav = createNativeStackNavigator();
const EditorNav = createNativeStackNavigator();

const HomeStack = () => (
  <HomeNav.Navigator>
    <HomeNav.Screen
      name="Home"
      options={{ headerShown: false }}
      component={Home}
    />
    <HomeNav.Screen
      name="Profile"
      component={Profile}
      options={({ navigation, route }) => ({
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Settings')}
            title="Settings"
          />
        ),
      })}
    />
    <HomeNav.Screen name="Settings" component={Settings} />
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
      options={{ headerShown: false }}
    />
    <EditorNav.Screen name="Publish" component={Publish} />
  </EditorNav.Navigator>
);

const App = () => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);

  const { theme, statusBarStyle } = getColorScheme(appStateStore.theme, scheme);

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle={statusBarStyle} />
            <RootStack.Navigator mode="modal">
              <RootStack.Screen
                name="Main"
                component={TabsStack}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="EditorModal"
                options={{ headerShown: false }}
                component={EditorStack}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
