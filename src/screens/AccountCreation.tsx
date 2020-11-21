import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
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

const IntroText = styled.Text`
  width: ${BUTTON_WIDTH}px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.secondaryText};
`;

const Title = styled.Text`
  margin: 30px 0 15px 0;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
  color: ${({ theme }) => theme.text};
`;

const Image = styled.Image``;

const Birb = require('../../assets/images/birb.png');

const AccountCreation = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Wrapper behavior="padding">
      <Image source={Birb} />
      <Title>Welcome to Pix!</Title>
      <IntroText>
        Create your account and enjoy the app and its community!
      </IntroText>
      <Label>First, choose your username</Label>
      <TextInput
        value={username}
        maxLength={20}
        placeholderTextColor={colors.secondaryText}
        placeholder="Your username"
        autoCapitalize="none"
        onChangeText={setUsername}
        style={{ color: colors.text }}
        autocompleteType="username"
      />
      <Label>Your email</Label>
      <TextInput
        placeholder="Your email"
        value={email}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() =>
          navigation.navigate('AccountPasswordCreation', { username, email })
        }
        placeholderTextColor={colors.secondaryText}
        style={{ color: colors.text }}
        onChangeText={setEmail}
        autoCompleteType="email"
      />
      <Button
        onPress={() =>
          navigation.navigate('AccountPasswordCreation', { username, email })
        }
        title="Next"
        disabled={username.length === 0 || email.length === 0}
      />
    </Wrapper>
  );
};

export default AccountCreation;
