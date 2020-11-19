import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { useTheme } from '@react-navigation/native';
import { Alert, TouchableOpacity } from 'react-native';
import User from '../../stores/User';
import Avatar from '../../components/Avatar';
import { SCREEN_PADDING } from '../../theme';
import Button from '../../components/Button';
import { BUTTON_WIDTH, STATES } from '../../constants';
import BottomSheet from 'reanimated-bottom-sheet';
import EditAvatar from '../../components/settings/EditAvatar';
import Animated from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';

const Wrapper = styled.ScrollView`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
  color: ${({ theme }) => theme.text};
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  padding: 10px;
  width: ${BUTTON_WIDTH}px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const StatusText = styled.Text`
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
        firestore().collection('Users').doc(userStore.user.uid).set(update),
      )
      .then(() => {
        setStatus(STATES.SUCCESS);
      })
      .catch((err) => {
        setStatus(STATES.ERROR);
      });
  };

  const resetPassword = () => {
    setStatus(STATES.LOADING);
    auth().sendPasswordResetEmail(userStore.user.email).then(() => {
      Alert.alert("Check your mailbox!", "We sent you an email to help you reset your password.")
      setStatus(STATES.IDLE);
    }).catch(err => {
      setStatus(STATES.ERROR)
    });
  }

  const sheetRef = React.useRef(null);

  const animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <>
      <Wrapper contentContainerStyle={{ alignItems: 'center' }}>
        <Avatar size={119} id={avatar} />
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
          autoCapitalize="none"
          placeholderTextColor={colors.secondaryText}
          onChangeText={setUsername}
          style={{ color: colors.text }}
        />
        <Label>Your email</Label>
        <TextInput
          value={userStore.user.email}
          placeholder="New username"
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
          onChangeText={() => { }}
          secureTextEntry
          style={{ color: colors.secondaryText }}
        />
        <TouchableOpacity onPress={resetPassword} disabled={status === STATES.LOADING}>
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
        renderContent={() =>
          EditAvatar((newAvatar) => {
            if (newAvatar) {
              setAvatar(newAvatar);
            }
            sheetRef.current.snapTo(1);
          })
        }
        callbackNode={fall}
        onCloseEnd={() => setDrawerShown(false)}
      />
      <OpacityView
        pointerEvents={drawerShown ? 'auto' : 'none'}
        style={{
          opacity: animatedShadowOpacity,
        }}
      />
    </>
  );
};

export default EditProfile;
