import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
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

const Title = styled.Text`
  margin: 30px 0 40px 0;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ErrorText = styled.Text`
  color: red;
`;

const Image = styled.Image``;


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
    <Wrapper behavior="padding">
      <Image source={Chick} />
      <Title>
        Welcome back!
      </Title>
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
