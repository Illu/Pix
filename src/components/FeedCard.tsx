import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SCREEN_PADDING } from '../theme';
import Avatar from './Avatar';
import PixelArt from './PixelArt';
import { Pixel } from '../types';
import Icon from './Icon';
import { useTheme } from '@react-navigation/native';
import User from '../stores/User';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const Row = styled.View`
  flex-direction: row;
  margin: ${({ noMargins }) => (noMargins ? 0 : 5)}px 0;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.View`
  border-radius: 8px;
  padding: ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
  margin-bottom: ${SCREEN_PADDING}px;
`;

const Likes = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  margin-left: 5px;
  font-weight: 600;
`;

const LikesRow = styled.Pressable`
  margin: 10px 0 5px 0;
  flex-direction: row;
  align-items: center;
`;

const UserName = styled.Text`
  margin-left: 10px;
  color: ${({ theme }) => theme.text};
`;

interface Props {
  data: Pixel[];
  backgroundColor: string;
  likesCount?: number;
  userName: string;
  onLike(): void;
  liked: boolean;
  id: number;
  onReport(): void;
  reports?: number;
}

const FeedCard = ({
  userName,
  data,
  backgroundColor,
  likesCount = 0,
  liked,
  onLike,
  id,
  onReport,
  reports
}: Props) => {
  const { colors } = useTheme();
  const userStore = useContext(User)

  return (
    <Wrapper>
      <Row>
        <Row noMargins>
          <Avatar />
          <UserName>{userName}</UserName>
        </Row>
        <TouchableOpacity onPress={() => {
          Alert.alert("Options", `Help us get rid of low quality posts (such as innapropriate content or low-effort)\n\nID: ${id}`,
            [
              {
                text: 'Report',
                onPress: onReport,
                style: 'destructive',
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => { },
              },
              userStore.isAdmin && {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  firestore().collection('Posts').doc(`${id}`).delete().then(() => Alert.alert("💥", "Removed post"))
                }
              }
            ])
        }}>
          <Icon name="Dots" size={24} color={colors.text} />
        </TouchableOpacity>
      </Row>
      <PixelArt
        data={data}
        backgroundColor={backgroundColor}
        size={width - SCREEN_PADDING * 4}
      />
      <LikesRow onPress={onLike}>
        <Icon
          name={liked ? 'HeartFull' : 'Heart'}
          color={liked ? '#ED6A5A' : colors.text}
          size={24}
        />
        <Likes>{likesCount}</Likes>
        {userStore.isAdmin && reports && (
          <>
            <Likes>{"- "}{reports} Reports</Likes>
          </>
        )}
      </LikesRow>

    </Wrapper>
  );
};

export default FeedCard;
