import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

const Wrapper = styled.View``;

const logout = () => {
  auth()
    .signOut()
    .then(() => alert('User signed out!'));
}

const Settings = () => {
  return (<Wrapper>
    <Button title="logout" onPress={logout} />

  </Wrapper>);
};

export default Settings;
