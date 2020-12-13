import firestore from '@react-native-firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { Alert, Linking, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { version } from '../../../package.json';
import User from '../../stores/User';

const Wrapper = styled.ScrollView`
  padding: 10px 16px;
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryText};
  margin-top: 20px;
`;

const DescWrapper = styled.View`
  background: ${({ theme }) => theme.secondary};
  padding: 15px;
  border-radius: 8px;
  margin-top: 5px;
`;

const Desc = styled.Text`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.text};
`;

const Header = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 40px;
`;

const InfosText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.secondaryText};
`;

const InfosTitle = styled(InfosText)`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const AppIcon = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: ${({ theme }) => theme.secondary};
  margin-right: 10px;
`;

const AppIconImage = require('../../../assets/images/logo_black.png');

const About = () => {
  const userStore = useContext(User);

  useEffect(() => {
    if (!userStore.isAdmin && userStore.user) {
      firestore()
        .collection('Admins')
        .get()
        .then((data) => {
          if (
            data.docs.findIndex(
              (user) => user.data().id === userStore.user.uid
            ) >= 0
          ) {
            userStore.promote();
            Alert.alert(
              'The maker!',
              'You are now signed in as an admin, granting you total power on every post in the App.',
              [{ text: 'Cool!' }]
            );
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Header>
        <AppIcon source={AppIconImage} />
        <View>
          <InfosTitle>Pix {version}</InfosTitle>
          <InfosText>by Maxime Nory</InfosText>
        </View>
      </Header>
      <Label>WHAT IS PIX ?</Label>
      <DescWrapper>
        <Desc>
          Pix is an online pixel art community. Share your creations with
          everyone to contribute to the app ! If you have any question or
          suggestion, feel free to contact us, we’ll be glad to hear from you !
        </Desc>
      </DescWrapper>
      <Label>PRIVACY POLICY</Label>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://maximenory.com/pix')}
      >
        <DescWrapper>
          <Desc>
            Tap here to open our privacy policy informations using your default
            web browser
          </Desc>
        </DescWrapper>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default About;
