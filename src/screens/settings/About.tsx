import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import User from '../../stores/User';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Wrapper = styled.ScrollView`
  padding: 10px 16px;
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 13px;
  color: ${({theme}) => theme.secondaryText};
  margin-top: 20px;
`;

const DescWrapper = styled.View`
  background: ${({theme}) => theme.secondary};
  padding: 15px;
  border-radius: 8px;
  margin-top: 5px;
`;

const Desc = styled.Text`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({theme}) => theme.text};
`;

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
              (user) => user.data().id === userStore.user.uid,
            ) >= 0
          ) {
            userStore.promote();
            Alert.alert(
              'The maker!',
              'You are now signed in as an admin, granting you total power on every post in the App.',
              [{text: 'Cool!'}],
            );
          }
        });
    }
  }, []);

  return (
    <Wrapper>
      <Label>WHAT IS PIX ?</Label>
      <DescWrapper>
        <Desc>
          Pix is an online pixel art community. Share your creations with
          everyone to contribute to the app ! If you have any question or
          suggestion, feel free to contact us, we’ll be glad to hear from you !
        </Desc>
      </DescWrapper>
      <Label>PRIVACY POLICY</Label>
      <DescWrapper>
        <Desc>Find out how we deal with privacy here</Desc>
      </DescWrapper>
    </Wrapper>
  );
};

export default About;
