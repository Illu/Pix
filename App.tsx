import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import AppState from './src/stores/AppState';
import { enableScreens } from 'react-native-screens';
import { getColorScheme } from './src/helpers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EditorStack, LoginStack, RootStack, TabsStack } from './src/navigation';
import User from './src/stores/User';
import { observer } from 'mobx-react-lite';
import Challenge from './src/stores/Challenge';
import Images from './src/stores/Images';

enableScreens();

const App = observer((props) => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);
  const challengeStore = useContext(Challenge);
  const imagesStore = useContext(Images);
  const userStore = useContext(User);

  useEffect(() => {
    challengeStore.loadCurrentChallenge();
    imagesStore.loadAvatarsURLs();
  }, [])

  const { theme, statusBarStyle } = getColorScheme(appStateStore.theme, scheme);

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme.colors}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <StatusBar barStyle={statusBarStyle} />
            <RootStack.Navigator mode="modal">
              <RootStack.Screen
                name="Main"
                component={TabsStack}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="EditorModal"
                options={{
                  headerShown: false,
                  stackPresentation: 'fullScreenModal',
                }}
                component={userStore.user ? EditorStack : LoginStack}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
});

export default App;
