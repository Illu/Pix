import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/Button';
import { BUTTON_WIDTH } from '../constants';
import auth from '@react-native-firebase/auth';

const Wrapper = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.secondary};
  flex: 1;
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  padding: 10px;
  width: ${BUTTON_WIDTH}px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const IntroText = styled.Text`
  width: ${BUTTON_WIDTH}px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.secondaryText};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
  color: ${({ theme }) => theme.text};
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.error};
  margin-top: 10px;
`;

const Title = styled.Text`
  margin: 30px 0 15px 0;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Image = styled.Image``;

const Birb = require('../../assets/images/birb.png');

const AccountPasswordCreation = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, username } = route.params;

  const createAccount = () => {
    if (password !== passwordVerification) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!, setting username...');
        const update = {
          displayName: username,
          badges: []
        };
        return auth().currentUser.updateProfile(update);
        // navigate success
      })
      .then(() => {
        Alert.alert(
          'Welcome to Pix 👋',
          'Now, try our editor to create your first artwork or browse through people’s creations!',
        );
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('Invalid email address!');
        }
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Wrapper behavior="padding">
      <Image source={Birb} />
      <Title>Welcome to Pix!</Title>
      <IntroText>
        Almost done! Create a password to secure your account and access the
        App.
      </IntroText>
      <Label>Your password</Label>
      <TextInput
        value={password}
        onChangeText={(str) => {
          setError('');
          setPassword(str);
        }}
        style={{ color: colors.text }}
        secureTextEntry
      />
      <Label>Confirm your password</Label>
      <TextInput
        value={passwordVerification}
        onChangeText={(str) => {
          setError('');
          setPasswordVerification(str);
        }}
        style={{ color: colors.text }}
        returnKeyType="done"
        onSubmitEditing={createAccount}
        secureTextEntry
      />
      <Button
        onPress={createAccount}
        loading={loading}
        title="Create my account"
        disabled={password.length === 0 || passwordVerification.length === 0}
      />
      <Button
        onPress={navigation.goBack}
        fill={false}
        title="Previous"
        style={{ marginTop: 10 }}
      />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default AccountPasswordCreation;
