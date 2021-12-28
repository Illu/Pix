import firestore from '@react-native-firebase/firestore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Empty from '../components/Empty';
import IconButton from '../components/IconButton';
import PixelArt from '../components/PixelArt';
import { SCREEN_PADDING } from '../theme';

const HeaderWrapper = styled.View`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const BadgesRow = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const PostsInfos = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

const InfosWrapper = styled.View`
  margin-left: 10px;
  flex: 1;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const PostWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${SCREEN_PADDING}px;
  justify-content: space-between;
`;

const UserProfile = observer(({ route }) => {
  const [postsDisplayed, setPostDisplayed] = useState(4);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { userRef } = route.params;
  const [userInfos, setUserInfos] = useState({ avatar: undefined, displayName: undefined, badges: [] });
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (userRef) {
      setLoading(true);
      userRef
        .get()
        .then((userData: any) => {
          const { displayName, avatar } = userData.data();
          setUserInfos({ displayName, avatar });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPosts = async () => {
    const snapshot = await firestore()
    .collection('Posts')
    .where('user.id', '==', userRef.id)
    .orderBy('timestamp', 'desc')
    .get();
  const newPosts = [];
  snapshot.forEach((doc) => {
    newPosts.push({ ...doc.data(), id: doc.id });
  });
  setPosts(newPosts);
  }

  const postSize = (Dimensions.get('window').width - SCREEN_PADDING * 3) / 2;

  if (loading) {
    return <ActivityIndicator style={{ margin: 50 }} /> 
  }

  const displayedData = posts?.slice(0, postsDisplayed);

  return (
    <>
      <HeaderWrapper>
        <Row>
          <Avatar size={119} name={userInfos.avatar} />
          <InfosWrapper>
            <UserName>{userInfos.displayName}</UserName>
            <PostsInfos>
              {posts?.length || 'no'} post
              {posts?.length === 1 ? '' : 's'}
            </PostsInfos>
            <BadgesRow>
              {userInfos.badges?.map((badge) => (
                <Avatar
                  key={badge}
                  cloudRef={`badges/${badge.toLowerCase()}.png`}
                />
              ))}
            </BadgesRow>
          </InfosWrapper>
        </Row>
        <ButtonsRow>
          <IconButton
            title="Published"
            onPress={() => {}}
            active
            icon="Picture"
            color="green"
          />
        </ButtonsRow>
      </HeaderWrapper>
      <ScrollView>
        <PostWrapper>
          {displayedData?.map((post, index) => (
            <TouchableOpacity key={index} onPress={() => {navigation.navigate('PostDetails', { comments: post.comments, id: post.id })}}>
              <PixelArt
                size={postSize}
                data={post.data.pixels}
                backgroundColor={post.data.backgroundColor}
                rounded
                style={{ marginBottom: 10 }}
              />
            </TouchableOpacity>
          ))}
          {!displayedData || (displayedData.length === 0 && <Empty />)}
          {displayedData &&
            postsDisplayed < posts.length && (
              <ButtonsRow style={{ marginTop: 15 }}>
                <Button
                  fill
                  title="Show more"
                  onPress={() => setPostDisplayed(postsDisplayed + 4)}
                />
              </ButtonsRow>
            )}
        </PostWrapper>
      </ScrollView>
    </>
  );
});

export default UserProfile;
