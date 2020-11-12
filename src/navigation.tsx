import React from 'react';
import {Button} from 'react-native';
import Home from './screens/Home';
import Challenges from './screens/Challenges';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Tabbar from './components/Tabbar';
import Editor from './screens/Editor';
import Publish from './screens/Publish';
import Settings from './screens/Settings';
import Login from './screens/Login';
import LoginSelection from './screens/LoginSelection';
import Profile from './screens/Profile';
import AccountCreation from './screens/AccountCreation';
import AccountPasswordCreation from './screens/AccountPasswordCreation';
import EditProfile from './screens/settings/EditProfile';

export const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const ChallengesNav = createNativeStackNavigator();
const EditorNav = createNativeStackNavigator();
const LoginNav = createNativeStackNavigator();

const HomeStack = () => (
  <HomeNav.Navigator>
    <HomeNav.Screen
      name="Home"
      options={{headerShown: false}}
      component={Home}
    />
    <HomeNav.Screen
      name="Profile"
      component={Profile}
      options={({navigation, route}) => ({
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Settings')}
            title="Settings"
          />
        ),
      })}
    />
    <HomeNav.Screen name="EditProfile" component={EditProfile} />
    <HomeNav.Screen name="Settings" component={Settings} />
  </HomeNav.Navigator>
);

const ChallengesStack = () => (
  <ChallengesNav.Navigator>
    <ChallengesNav.Screen name="Challenges" component={Challenges} />
  </ChallengesNav.Navigator>
);

export const TabsStack = () => (
  <Tab.Navigator tabBar={Tabbar}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Editor" component={Editor} />
    <Tab.Screen name="Challenges" component={ChallengesStack} />
  </Tab.Navigator>
);

export const LoginStack = () => (
  <LoginNav.Navigator>
    <LoginNav.Screen
      name="LoginSelection"
      component={LoginSelection}
      options={({navigation, route}) => ({
        headerLeft: () => <Button onPress={navigation.goBack} title="X" />,
      })}
    />
    <LoginNav.Screen name="Login" component={Login} />
    <LoginNav.Screen name="AccountCreation" component={AccountCreation} />
    <LoginNav.Screen
      name="AccountPasswordCreation"
      component={AccountPasswordCreation}
    />
  </LoginNav.Navigator>
);

export const EditorStack = () => (
  <EditorNav.Navigator>
    <EditorNav.Screen
      name="Edit"
      component={Editor}
      options={{headerShown: false}}
    />
    <EditorNav.Screen name="Publish" component={Publish} />
  </EditorNav.Navigator>
);
