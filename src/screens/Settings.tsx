import React from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import ActionMenu from '../components/ActionMenu';
import {useContext} from 'react';
import User from '../stores/User';

const Wrapper = styled.ScrollView``;

const logout = () => {
  auth().signOut();
};

const Settings = () => {
  const navigation = useNavigation();
  const userStore = useContext(User);
  const items = [
    [
      {
        title: 'Theme',
        icon: 'ChevronRight',
        action: () => navigation.navigate('Notifications'),
      },
      {
        title: 'App Icon',
        icon: 'ChevronRight',
        action: () => navigation.navigate('Appearance'),
      },
      {
        title: 'Account',
        icon: 'ChevronRight',
        disabled: !userStore.user,
        action: () => navigation.navigate('EditProfile'),
      },
      {
        title: 'Log me out',
        icon: 'ChevronRight',
        disabled: !userStore.user,
        action: logout,
      },
    ],
    [
      {
        title: 'About',
        icon: 'ChevronRight',
        action: () => {},
      },
      {
        title: 'Rate the App',
        icon: 'Twitter',
        action: () => {},
      },
      {
        title: 'Leave a tip',
        icon: 'Twitter',
        action: () => {},
      },
    ],
    [
      {
        title: 'Help',
        icon: 'ChevronRight',
        action: () => navigation.navigate('Licenses'),
      },
    ],
  ];

  return (
    <Wrapper>
      <ActionMenu items={items} />
    </Wrapper>
  );
};

export default Settings;
