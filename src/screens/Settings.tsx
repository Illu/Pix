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
        thumbIcon: 'Palette',
        thumbColor: '#ED6A5A',
        icon: 'ChevronRight',
        action: () => navigation.navigate('Notifications'),
      },
      {
        title: 'App Icon',
        thumbIcon: 'Edit',
        thumbColor: '#FFB800',
        icon: 'ChevronRight',
        action: () => navigation.navigate('Appearance'),
      },
      {
        title: 'Account',
        icon: 'ChevronRight',
        thumbIcon: 'Account',
        thumbColor: '#4DB3FF',
        disabled: !userStore.user,
        action: () => navigation.navigate('EditProfile'),
      },
      {
        title: 'Log me out',
        icon: 'ChevronRight',
        thumbIcon: 'Logout',
        thumbColor: '#35CE8D',
        disabled: !userStore.user,
        action: logout,
      },
    ],
    [
      {
        title: 'About',
        icon: 'ChevronRight',
        thumbIcon: 'Infos',
        thumbColor: '#35CE8D',
        action: () => {},
      },
      {
        title: 'Rate the App',
        icon: 'Twitter',
        thumbIcon: 'Star',
        thumbColor: '#4DB3FF',
        action: () => {},
      },
      {
        title: 'Leave a tip',
        icon: 'Twitter',
        thumbIcon: 'Money',
        thumbColor: '#FFB800',
        action: () => {},
      },
    ],
    [
      {
        title: 'Help',
        icon: 'ChevronRight',
        thumbIcon: 'Help',
        thumbColor: '#ED6A5A',
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