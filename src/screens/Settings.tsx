import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Alert, Linking } from 'react-native';
import Rate from 'react-native-rate';
import styled from 'styled-components/native';

import ActionMenu from '../components/ActionMenu';
import { RateOptions } from '../config';
import User from '../stores/User';

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
        action: () => navigation.navigate('Appearance')
      },
      {
        title: 'Account',
        thumbIcon: 'Account',
        thumbColor: '#4DB3FF',
        disabled: !userStore.user,
        action: () => navigation.navigate('EditProfile')
      },
      {
        title: !userStore.user ? 'Log in / Sign up' : 'Log me out',
        thumbIcon: !userStore.user ? 'Logout' : 'Logout', // TODO
        thumbColor: '#35CE8D',
        action: !userStore.user
          ? () => navigation.navigate('EditorModal')
          : logout
      }
    ],
    [
      {
        title: 'About',
        thumbIcon: 'Infos',
        thumbColor: '#35CE8D',
        action: () => navigation.navigate('About')
      },
      {
        title: 'Rate the App',
        thumbIcon: 'Star',
        thumbColor: '#4DB3FF',
        action: () => {
          Rate.rate(RateOptions || {}, (success) => {
            if (success) {
              // user went to the review page
            }
          });
        }
      },
      {
        title: 'Contact me',
        thumbIcon: 'Pencil',
        thumbColor: '#ED6A5A',
        action: () => {
          Alert.alert(
            'Contact',
            'Whether you have a feature request, a bug report, or just want to say hello, you can always reach me on Twitter or by sending me an email.',
            [
              {
                text: 'Send a Twitter message',
                onPress: () => {
                  Linking.openURL('https://twitter.com/MaximeNory');
                },
                style: 'default'
              },
              {
                text: 'Send me an email',
                onPress: () => {
                  Linking.openURL('mailto:hello@maximenory.com');
                },
                style: 'default'
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        }
      },
      {
        title: 'Leave a tip',
        thumbIcon: 'Money',
        thumbColor: '#FFB800',
        action: () => navigation.navigate('Tips'),
        disabled: true
      }
    ],
    [
      {
        title: 'Licenses',
        thumbIcon: 'Book',
        thumbColor: '#35CE8D',
        action: () => navigation.navigate('Licenses')
      }
    ]
  ];

  return (
    <Wrapper>
      <ActionMenu items={items} />
    </Wrapper>
  );
});

export default Settings;
