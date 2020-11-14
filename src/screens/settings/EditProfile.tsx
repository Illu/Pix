import React from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import {useNavigation, useTheme} from '@react-navigation/native';
import ActionMenu from '../components/ActionMenu';
import {useState} from 'react';
import {useContext} from 'react';
import User from '../../stores/User';
import Avatar from '../../components/Avatar';
import {SCREEN_PADDING} from '../../theme';
import Button from '../../components/Button';
import {BUTTON_WIDTH} from '../../constants';

const Wrapper = styled.ScrollView`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({theme}) => theme.secondary};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({theme}) => theme.background};
  padding: 10px;
  width: ${BUTTON_WIDTH}px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const ErrorText = styled.Text``;

const EditProfile = () => {
  const navigation = useNavigation();
  const userStore = useContext(User);
  const {colors} = useTheme();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [username, setUsername] = useState(userStore.user.displayName);

  const update = () => {
    setLoading(true);
    setError('');
    const update = {
      displayName: username,
    };
    auth()
      .currentUser.updateProfile(update)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not update your profile');
        setLoading(false);
      });
  };

  return (
    <Wrapper contentContainerStyle={{alignItems: 'center'}}>
      <Avatar size={119} withBorder />
      <Button
        onPress={() => {}}
        title="Edit profile picture"
        fill={false}
        style={{width: 163, marginTop: 10, marginBottom: 30}}
      />
      <Label>Username</Label>
      <TextInput
        value={username}
        placeholder="New username"
        autoCapitalize="none"
        placeholderTextColor={colors.secondaryText}
        onChangeText={setUsername}
      />
      <Label>Your email</Label>
      <TextInput
        value={userStore.user.email}
        placeholder="New username"
        autoCapitalize="none"
        placeholderTextColor={colors.secondaryText}
        onChangeText={setUsername}
      />
      <Label>Your password</Label>
      <TextInput
        value="xxxxxxxxx"
        autoCapitalize="none"
        disabled
        placeholderTextColor={colors.secondaryText}
        onChangeText={() => {}}
        secureTextEntry
      />
      <Button
        onPress={update}
        title="Save modifications"
        loading={loading}
        style={{marginTop: 40}}
      />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default EditProfile;
