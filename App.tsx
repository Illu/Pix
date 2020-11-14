import React, {useContext} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import AppState from './src/stores/AppState';
import {enableScreens} from 'react-native-screens';
import {getColorScheme} from './src/helpers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EditorStack, LoginStack, RootStack, TabsStack} from './src/navigation';
import User from './src/stores/User';
import {observer} from 'mobx-react-lite';

enableScreens();

const App = observer((props) => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);
  const userStore = useContext(User);

  const {theme, statusBarStyle} = getColorScheme(appStateStore.theme, scheme);

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
                options={{headerShown: false}}
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
