import auth from '@react-native-firebase/auth';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Button from '../components/Button';
import { BUTTON_WIDTH } from '../constants';

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

const Title = styled.Text`
  margin: 30px 0 40px 0;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.error};
  margin-top: 10px;
`;

const Image = styled.Image``;

const ResetPassword = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-bottom: 30px;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.text};
`;

const Chick = require('../../assets/images/chick.png');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { colors } = useTheme();

  const login = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User loged in!');
        // navigate success
      })
      .catch((err) => {
        if (err.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        } else {
          setError('Incorrect login');
        }
        setLoading(false);
        console.error(err);
      });
  };

  const resetPassword = () => {
    if (email.length === 0) {
      Alert.alert('Please fill the email field to reset your password');
      return;
    }
    setLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Check your mailbox!',
          `We sent you an email to ${email} to help you reset your password.`
        );
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(
          'Error 😢',
          `We tried to send an email to ${email} but something unexpected happened. Make sure the address is valid.`
        );
        setLoading(false);
      });
  };

  return (
    <Wrapper behavior="padding">
      <Image source={Chick} />
      <Title>Welcome back!</Title>
      <TextInput
        value={email}
        placeholder="Your email"
        placeholderTextColor={colors.secondaryText}
        autoCapitalize="none"
        onChangeText={setEmail}
        style={{ color: colors.text }}
        autocompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        placeholder="Your password"
        autoCapitalize="none"
        placeholderTextColor={colors.secondaryText}
        style={{ color: colors.text }}
        onChangeText={setPassword}
        autoCompleteType="password"
        returnKeyType="done"
        onSubmitEditing={login}
        secureTextEntry
      />
      <TouchableOpacity onPress={resetPassword} disabled={loading}>
        <ResetPassword>Reset your password</ResetPassword>
      </TouchableOpacity>
      <Button onPress={login} loading={loading} title="Sign in" />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default Login;
