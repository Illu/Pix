import firestore from '@react-native-firebase/firestore';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Dimensions, TouchableOpacity, Alert, View } from 'react-native';
import styled from 'styled-components/native';

import { MONTHS } from '../constants';
import User from '../stores/User';
import { SCREEN_PADDING } from '../theme';
import { Pixel } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';
import PixelArt from './PixelArt';

const { width } = Dimensions.get('window');

const Row = styled.View<{ noMargins?: boolean }>`
  flex-direction: row;
  margin: ${({ noMargins }) => (noMargins ? 0 : 5)}px 0;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.Pressable`
  border-radius: 8px;
  padding: ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
  margin-bottom: ${SCREEN_PADDING}px;
`;

const IconLabel = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  margin-left: 5px;
  font-weight: 600;
  margin-right: 10px;
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

const Desc = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 14px;
  font-weight: 400;
`;

const LoadingAvatar = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background: ${({ theme }) => theme.background};
  margin-right: 10px;
`;

const LoadingUserName = styled.View`
  height: 16px;
  width: 100px;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
`;

const DateText = styled(Desc)`
  margin-top: 5px;
  font-size: 13px;
  font-weight: 300;
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
  avatar?: string;
  desc?: string;
  timestamp?: number;
  userRef: any;
  comments: any[];
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
  reports,
  desc = '',
  avatar = 'cat-1',
  userRef,
  timestamp,
  comments = []
}: Props) => {
  const { colors } = useTheme();
  const userStore = useContext(User);
  const navigation = useNavigation();

  const [userInfos, setUserInfos] = useState({ avatar, displayName: userName });
  const [loading, setLoading] = useState(false);

  // Avoid re-rendering the whole flatlist for liking a post
  const [localLiked, setLocalLiked] = useState(liked);
  const localLikesCount = likesCount + (liked ? -1 : 0) + (localLiked ? 1 : 0);

  useEffect(() => {
    if (userRef) {
      setLoading(true);
      userRef
        .get()
        .then((userData) => {
          const { displayName, avatar } = userData.data();
          setUserInfos({ displayName, avatar });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = useMemo(() => {
    if (timestamp) {
      const d = new Date(timestamp);
      return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    }
    return null;
  }, [timestamp]);

  const goToDetails = () => {
    navigation.navigate('PostDetails', { comments, id });
  };

  return (
    <Wrapper onPress={goToDetails}>
      <Row>
        <Row noMargins>
          {loading ? (
            <>
              <LoadingAvatar />
              <LoadingUserName />
            </>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userRef, displayName: userName })} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar name={userInfos?.avatar || 'cat-1'} size={32} />
              <UserName>{userInfos?.displayName || 'Unknown'}</UserName>
            </TouchableOpacity>
          )}
        </Row>
        <TouchableOpacity
          onPress={() => {
            if (!userStore.user) {
              Alert.alert(
                'Warning',
                'You must log in to interact with a publication.',
                [
                  {
                    text: 'Log in or Create an account',
                    onPress: onLike,
                    style: 'default'
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { }
                  }
                ]
              );
              return;
            }
            Alert.alert(
              'Options',
              `Help us get rid of low quality posts (such as innapropriate content or low-effort)${userStore.isAdmin ? `\n\nID: ${id}` : ''
              }`,
              [
                {
                  text: 'Report',
                  onPress: onReport,
                  style: 'destructive'
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => { }
                },
                userStore.isAdmin && {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    firestore()
                      .collection('Posts')
                      .doc(`${id}`)
                      .delete()
                      .then(() => Alert.alert('💥', 'Removed post'));
                  }
                }
              ]
            );
          }}
        >
          <Icon name="Dots" size={24} color={colors.text} />
        </TouchableOpacity>
      </Row>
      <PixelArt
        data={data}
        backgroundColor={backgroundColor}
        size={width - SCREEN_PADDING * 4}
      />
      <View style={{ flexDirection: 'row' }}>
        <LikesRow
          onPress={() => {
            if (userStore.user) {
              setLocalLiked(!localLiked);
            }
            onLike();
          }}
        >
          <Icon
            name={localLiked ? 'HeartFull' : 'Heart'}
            color={localLiked ? '#ED6A5A' : colors.text}
            size={24}
          />
          <IconLabel>{localLikesCount}</IconLabel>
        </LikesRow>
        <LikesRow onPress={goToDetails}>
          <Icon name="Bubble" color={colors.text} size={24} />
          <IconLabel>{comments.length}</IconLabel>
          {userStore.isAdmin && reports && (
            <>
              <IconLabel>
                {'- '}
                {reports} Reports
              </IconLabel>
            </>
          )}
        </LikesRow>
      </View>

      {!!desc && <Desc>{desc}</Desc>}
      {date && <DateText>{date}</DateText>}
    </Wrapper>
  );
};

export default FeedCard;
