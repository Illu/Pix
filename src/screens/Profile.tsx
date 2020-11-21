import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import Avatar from '../components/Avatar';
import { SCREEN_PADDING } from '../theme';
import IconButton from '../components/IconButton';
import { useState } from 'react';
import PixelArt from '../components/PixelArt';
import { observer } from 'mobx-react-lite';
import User from '../stores/User';
import { useNavigation, useTheme } from '@react-navigation/native';
import Icon from '../components/Icon';
import Drafts from '../stores/Drafts';
import Empty from '../components/Empty';
import { STATES } from '../constants';

const HeaderWrapper = styled.View`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
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

const EditButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin-right: 10px;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PostWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${SCREEN_PADDING}px;
  justify-content: space-between;
`;

const Profile = observer(() => {
  const [showDrafts, setShowDrafts] = useState(false);
  const userStore = useContext(User);
  const draftsStore = useContext(Drafts);
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    userStore.loadPosts();
  }, []);

  if (!userStore.user) {
    navigation.popToTop();
    return;
  }

  const postSize = (Dimensions.get('window').width - SCREEN_PADDING * 3) / 2;

  const displayedData = showDrafts ? draftsStore.drafts : userStore.posts;

  const openArt = (index: number, post?: any) => {
    if (showDrafts) {
      navigation.navigate('EditorModal', {
        screen: 'Edit',
        params: { data: draftsStore.drafts[index] },
      });
      draftsStore.removeDraft(index);
    } else {
      Alert.alert("Infos", `This post has ${post?.likesCount || 0} likes and ${post?.reports || 0} reports`)
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Row>
          <Avatar size={119} id={userStore.userData?.avatar} />
          <InfosWrapper>
            <UserName>{userStore.user.displayName}</UserName>
            <PostsInfos>
              {userStore.posts?.length || 'no'} post
              {userStore.posts?.length === 1 ? '' : 's'}
            </PostsInfos>
          </InfosWrapper>
          <EditButton onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="Edit" color={colors.text} size={24} />
          </EditButton>
        </Row>
        <ButtonsRow>
          <IconButton
            title="Published"
            onPress={() => setShowDrafts(false)}
            active={!showDrafts}
            icon="Picture"
            color="green"
          />
          <IconButton
            title="Drafts"
            onPress={() => setShowDrafts(true)}
            active={showDrafts}
            icon="EditPicture"
            color="yellow"
          />
        </ButtonsRow>
      </HeaderWrapper>
      {userStore.state === STATES.LOADING && (
        <ActivityIndicator style={{ margin: 50 }} />
      )}
      <ScrollView>
        <PostWrapper>
          {displayedData?.map((post, index) => (
            <TouchableOpacity key={index} onPress={() => openArt(index, post)}>
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
        </PostWrapper>
      </ScrollView>
    </>
  );
});

export default Profile;
