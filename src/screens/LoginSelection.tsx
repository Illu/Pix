import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import {BUTTON_WIDTH} from '../constants';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  flex: 1;
  background: ${({theme}) => theme.secondary};
`;

const IntroText = styled.Text`
  width: ${BUTTON_WIDTH}px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 30px;
`;

const LoginSelection = () => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <IntroText>
        Log in or create an account to share your work and fully enjoy the app
        and its community !
      </IntroText>
      <Button
        onPress={() => navigation.navigate('AccountCreation')}
        title="Create an account"
        style={{marginBottom: 10}}
      />
      <Button
        onPress={() => navigation.navigate('Login')}
        fill={false}
        title="Sign in"
      />
    </Wrapper>
  );
};

export default LoginSelection;
