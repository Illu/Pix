import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import styled from 'styled-components/native';

import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import EditAvatar from '../../components/settings/EditAvatar';
import { BUTTON_WIDTH, STATES } from '../../constants';
import Images from '../../stores/Images';
import User from '../../stores/User';
import { SCREEN_PADDING } from '../../theme';

const Wrapper = styled.ScrollView`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
  color: ${({ theme }) => theme.text};
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  padding: 10px;
  width: ${BUTTON_WIDTH}px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const StatusText = styled.Text<{ color: string }>`
  margin-top: 10px;
  color: ${({ color }) => color};
  text-align: center;
`;

const Footer = styled.Text`
  color: ${({ theme }) => theme.inputBackground};
  margin: 50px 0;
`;

const ResetPassword = styled.Text`
  color: ${({ theme }) => theme.text};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.text};
`;

const OpacityView = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
  opacity: 0.5;
  z-index: 1;
`;

const EditProfile = () => {
  const userStore = useContext(User);
  const imagesStore = useContext(Images);
  const { colors } = useTheme();

  const [status, setStatus] = useState(STATES.IDLE);
  const [username, setUsername] = useState(userStore.user.displayName);
  const [drawerShown, setDrawerShown] = useState(false);
  const [avatar, setAvatar] = useState(userStore.userData?.avatar || 'cat-1');

  let fall = new Animated.Value(1);

  const update = () => {
    setStatus(STATES.LOADING);
    const update = {
      displayName: username,
      avatar,
    };
    auth()
      .currentUser.updateProfile(update)
      .then(() =>
        firestore().collection('Users').doc(userStore.user.uid).update(update)
      )
      .then(() => {
        setStatus(STATES.SUCCESS);
      })
      .catch(() => {
        setStatus(STATES.ERROR);
      });
  };

  const resetPassword = () => {
    setStatus(STATES.LOADING);
    auth()
      .sendPasswordResetEmail(userStore.user.email)
      .then(() => {
        Alert.alert(
          'Check your mailbox!',
          'We sent you an email to help you reset your password.'
        );
        setStatus(STATES.IDLE);
      })
      .catch(() => {
        setStatus(STATES.ERROR);
      });
  };

  const setNewAvatar = (newAvatar) => {
    if (newAvatar) {
      setAvatar(newAvatar);
    }
    sheetRef.current.snapTo(1);
  };

  const sheetRef = React.useRef(null);

  const animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.5, 0]
  });

  const categories = {};

  Object.keys(imagesStore.avatars).forEach((key) => {
    const avatar = imagesStore.avatars[key];
    if (avatar) {
      if (!categories[avatar.category]) {
        categories[avatar.category] = [];
      }
      categories[avatar.category].push(key);
    }
  });

  return (
    <>
      <Wrapper contentContainerStyle={{ alignItems: 'center' }}>
        <Avatar size={119} name={avatar} />
        <Button
          onPress={() => {
            setDrawerShown(true);
            sheetRef.current.snapTo(0);
          }}
          title="Edit profile picture"
          fill={false}
          style={{ width: 163, marginTop: 10, marginBottom: 30 }}
        />
        <Label>Username</Label>
        <TextInput
          value={username}
          placeholder="New username"
          maxLength={20}
          autoCapitalize="none"
          placeholderTextColor={colors.secondaryText}
          onChangeText={setUsername}
          style={{ color: colors.text }}
        />
        <Label>Your email</Label>
        <TextInput
          value={userStore.user.email}
          placeholder="New email"
          editable={false}
          autoCapitalize="none"
          placeholderTextColor={colors.secondaryText}
          onChangeText={setUsername}
          style={{ color: colors.secondaryText }}
        />
        <Label>Your password</Label>
        <TextInput
          value="xxxxxxxxx"
          autoCapitalize="none"
          editable={false}
          placeholderTextColor={colors.secondaryText}
          onChangeText={() => {}}
          secureTextEntry
          style={{ color: colors.secondaryText }}
        />
        <TouchableOpacity
          onPress={resetPassword}
          disabled={status === STATES.LOADING}
        >
          <ResetPassword>Reset your password</ResetPassword>
        </TouchableOpacity>
        <Button
          onPress={update}
          title="Save modifications"
          loading={status === STATES.LOADING}
          style={{ marginTop: 40 }}
          disabled={status === STATES.LOADING}
        />
        {status === STATES.ERROR && (
          <StatusText color={colors.error}>
            We’re having some troubles updating your profile 😥{'\n'}Try again
            later!
          </StatusText>
        )}
        {status === STATES.SUCCESS && (
          <StatusText color={colors.success}>
            Your modifications have been saved !
          </StatusText>
        )}
        <Footer>ID - {userStore.user.uid}</Footer>
      </Wrapper>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[500, 0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={() => EditAvatar(categories, setNewAvatar)}
        callbackNode={fall}
        onCloseEnd={() => setDrawerShown(false)}
      />
      <OpacityView
        pointerEvents={drawerShown ? 'auto' : 'none'}
        style={{
          opacity: animatedShadowOpacity
        }}
      />
    </>
  );
};

export default EditProfile;
