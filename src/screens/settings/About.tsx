import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import User from '../../stores/User';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Wrapper = styled.ScrollView``;
const Desc = styled.Text``;

const About = () => {
  const userStore = useContext(User)

  useEffect(() => {
    if (!userStore.isAdmin) {
      firestore()
        .collection('Admins')
        .get()
        .then(data => {
          if (data.docs.findIndex(user => user.id === userStore.user.uid)) {
            userStore.promote();
            Alert.alert("The maker!", "You are now signed in as an admin, granting you total power on every post in the App.", [{ text: "Cool!" }])
          }
        })
    }
  }, [])

  return (
    <Wrapper>
      <Desc>About about about... about!</Desc>
    </Wrapper>
  );
};

export default About;
