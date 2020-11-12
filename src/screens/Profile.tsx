import React, {useContext} from 'react';
import styled from 'styled-components';
import {Dimensions, ScrollView} from 'react-native';
import Avatar from '../components/Avatar';
import {SCREEN_PADDING} from '../theme';
import IconButton from '../components/IconButton';
import {useState} from 'react';
import PixelArt from '../components/PixelArt';
import {observer} from 'mobx-react-lite';
import User from '../stores/User';
import {useNavigation} from '@react-navigation/native';

const HeaderWrapper = styled.View`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({theme}) => theme.secondary};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: 600;
`;

const PostsInfos = styled.Text`
  font-weight: 400;
  font-size: 12px;
`;

const InfosWrapper = styled.View`
  margin-left: 10px;
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
  const navigation = useNavigation();

  if (!userStore.user) {
    navigation.popToTop();
    return;
  }

  const postSize = (Dimensions.get('window').width - SCREEN_PADDING * 3) / 2;

  return (
    <>
      <HeaderWrapper>
        <Row>
          <Avatar size={119} />
          <InfosWrapper>
            <UserName>{userStore.user.displayName}</UserName>
            <PostsInfos>12 posts</PostsInfos>
          </InfosWrapper>
          <IconButton
            title="edit"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </Row>
        <ButtonsRow>
          <IconButton
            title="Published"
            onPress={() => setShowDrafts(false)}
            active={!showDrafts}
          />
          <IconButton
            title="Drafts"
            onPress={() => setShowDrafts(true)}
            active={showDrafts}
          />
        </ButtonsRow>
      </HeaderWrapper>
      <ScrollView>
        <PostWrapper>
          <PixelArt size={postSize} rounded style={{marginBottom: 10}} />
          <PixelArt size={postSize} rounded style={{marginBottom: 10}} />
          <PixelArt size={postSize} rounded style={{marginBottom: 10}} />
          <PixelArt size={postSize} rounded style={{marginBottom: 10}} />
          <PixelArt size={postSize} rounded style={{marginBottom: 10}} />
        </PostWrapper>
      </ScrollView>
    </>
  );
});

export default Profile;
