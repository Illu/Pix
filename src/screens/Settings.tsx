import React, { useContext } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import ActionMenu from '../components/ActionMenu';
import { Alert, Linking } from 'react-native';
import User from '../stores/User';
import { observer } from 'mobx-react';

const Wrapper = styled.ScrollView``;

const logout = () => {
  auth().signOut();
};

const Settings = observer(() => {
  const navigation = useNavigation();
  const userStore = useContext(User);
  const items = [
    [
      {
        title: 'Theme',
        thumbIcon: 'Palette',
        thumbColor: '#ED6A5A',
        icon: 'ChevronRight',
        action: () => navigation.navigate('Appearance'),
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
        title: !userStore.user ? 'Log in / Sign up' : 'Log me out',
        icon: 'ChevronRight',
        thumbIcon: !userStore.user ? 'Logout' : 'Logout', // TODO
        thumbColor: '#35CE8D',
        action: !userStore.user
          ? () => navigation.navigate('EditorModal')
          : logout,
      },
    ],
    [
      {
        title: 'About',
        icon: 'ChevronRight',
        thumbIcon: 'Infos',
        thumbColor: '#35CE8D',
        action: () => navigation.navigate('About'),
      },
      {
        title: 'Rate the App',
        icon: 'Twitter',
        thumbIcon: 'Star',
        thumbColor: '#4DB3FF',
        action: () => { },
      },
      {
        title: 'Contact me',
        icon: 'Twitter',
        thumbIcon: 'Pencil',
        thumbColor: '#ED6A5A',
        action: () => {
          Alert.alert("Contact", "Whether you have a feature request, a bug report, or just want to say hello, you can always reach me on Twitter or by sending me an email.",
            [
              {
                text: 'Send a Twitter message',
                onPress: () => { Linking.openURL("https://twitter.com/MaximeNory") },
                style: 'default',
              },
              {
                text: 'Send me an email',
                onPress: () => { },
                style: 'default',
              },
              {
                text: 'Cancel',
                style: 'cancel'
              },
            ],
          )
        },
      },
      {
        title: 'Leave a tip',
        icon: 'Twitter',
        thumbIcon: 'Money',
        thumbColor: '#FFB800',
        action: () => { },
      },
    ],
    [
      {
        title: 'Licenses',
        icon: 'ChevronRight',
        thumbIcon: 'Bucket',
        thumbColor: '#35CE8D',
        action: () => navigation.navigate('Help'),
      }
    ],
  ];

  return (
    <Wrapper>
      <ActionMenu items={items} />
    </Wrapper>
  );
});

export default Settings;
