import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import {BUTTON_WIDTH} from '../constants';
import auth from '@react-native-firebase/auth';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  background: ${({theme}) => theme.secondary};
  flex: 1;
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({theme}) => theme.background};
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

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
`;

const ErrorText = styled.Text`
  color: red;
`;

const AccountPasswordCreation = ({route}) => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {email, username} = route.params;

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
        };
        return auth().currentUser.updateProfile(update);
        // navigate success
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Wrapper>
      <IntroText>
        Create your account and enjoy the app and its community !
      </IntroText>
      <Label>Your password</Label>
      <TextInput
        value={password}
        onChangeText={(str) => {
          setError('');
          setPassword(str);
        }}
        secureTextEntry
      />
      <Label>Confirm your password</Label>
      <TextInput
        value={passwordVerification}
        onChangeText={(str) => {
          setError('');
          setPasswordVerification(str);
        }}
        secureTextEntry
      />
      <Button
        onPress={createAccount}
        loading={loading}
        title="Create my account"
      />
      <Button
        onPress={navigation.goBack}
        fill={false}
        title="Previous"
        style={{marginTop: 10}}
      />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default AccountPasswordCreation;
