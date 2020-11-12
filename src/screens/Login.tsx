import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import { BUTTON_WIDTH } from '../constants';
import auth from '@react-native-firebase/auth';

const Wrapper = styled.View`
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
`;

const ErrorText = styled.Text`
  color: red;
`;

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
        alert('ok')
        // navigate success
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        } else {
          setError('Incorrect login');
        }
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <Wrapper>
      <IntroText>
        Welcome to Pix, your brand new pixel art community !
      </IntroText>
      <TextInput
        value={email}
        placeholder="Your email"
        placeholderTextColor={colors.secondaryText}
        autoCapitalize="none"
        onChangeText={setEmail}
        autocompleteType="username"
      />
      <TextInput
        value={password}
        placeholder="Your password"
        autoCapitalize="none"
        placeholderTextColor={colors.secondaryText}
        onChangeText={setPassword}
        autoCompleteType="password"
        secureTextEntry
      />
      <Button onPress={login} loading={loading} title="Sign in" />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default Login;
