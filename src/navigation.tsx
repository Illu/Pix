import React from 'react';
import {Button, TouchableOpacity} from 'react-native';
import Home from './screens/Home';
import Challenges from './screens/Challenges';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
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
import Icon from './components/Icon';
import {useTheme} from '@react-navigation/native';
import About from './screens/settings/About';
import Appearance from './screens/settings/Appearance';
import EditAvatar from './screens/settings/EditAvatar';

export const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const ChallengesNav = createNativeStackNavigator();
const EditorNav = createNativeStackNavigator();
const LoginNav = createNativeStackNavigator();

const HomeStack = () => {
  const {colors} = useTheme();

  return (
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
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Icon name="Settings" size={25} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeNav.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerTitle: 'Edit your profile'}}
      />
      <HomeNav.Screen name="Settings" component={Settings} />
      <HomeNav.Screen name="About" component={About} />
      <HomeNav.Screen
        name="Appearance"
        component={Appearance}
        options={{headerTitle: 'Theme'}}
      />
    </HomeNav.Navigator>
  );
};

const ChallengesStack = () => (
  <ChallengesNav.Navigator>
    <ChallengesNav.Screen
      name="Challenges"
      component={Challenges}
      options={{headerShown: false}}
    />
    {/* TODO: Duplicate Profile & settings screens here */}
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
        headerLeft: () => <Button onPress={navigation.goBack} title="Close" />,
        headerTitle: 'Login',
      })}
    />
    <LoginNav.Screen
      name="Login"
      component={Login}
      options={{headerTitle: 'Sign in'}}
    />
    <LoginNav.Screen
      name="AccountCreation"
      component={AccountCreation}
      options={{headerTitle: 'Create your account'}}
    />
    <LoginNav.Screen
      name="AccountPasswordCreation"
      component={AccountPasswordCreation}
      options={{headerTitle: 'Create a password'}}
    />
  </LoginNav.Navigator>
);

export const EditorStack = () => (
  <EditorNav.Navigator>
    <EditorNav.Screen
      name="Edit"
      component={Editor}
      options={{headerShown: false, stackPresentation: 'modal'}}
    />
    <EditorNav.Screen
      name="Publish"
      component={Publish}
      options={{headerShown: false}}
    />
  </EditorNav.Navigator>
);
