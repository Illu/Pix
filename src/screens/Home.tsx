import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, RefreshControl} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FeedCard from '../components/FeedCard';
import {SORT, STATES} from '../constants';
import {SCREEN_PADDING} from '../theme';
import styled from 'styled-components/native';
import IconButton from '../components/IconButton';
import Avatar from '../components/Avatar';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import User from '../stores/User';
import {observer} from 'mobx-react-lite';
import Feed from '../stores/Feed';

const Row = styled.View`
  flex-direction: row;
  background: ${({theme}) => theme.secondary};
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Home = observer(() => {
  const navigation = useNavigation();
  const userStore = useContext(User);
  const feedStore = useContext(Feed);
  const [sort, setSort] = useState(SORT.TRENDING);

  useEffect(() => {
    feedStore.loadFeed();
  }, []);

  const UserAvatar = (
    <Pressable onPress={() => navigation.navigate('Profile')}>
      <Avatar />
    </Pressable>
  );

  const OptionsLink = (
    <Pressable onPress={() => navigation.navigate('Settings')}>
      <Text>Settings</Text>
    </Pressable>
  );

  return (
    <>
      <CustomHeader
        title="Pix"
        rightComponent={userStore.user ? UserAvatar : OptionsLink}
      />
      <Row>
        <IconButton
          title="Trending"
          onPress={() => setSort(SORT.TRENDING)}
          active={sort === SORT.TRENDING}
        />
        <IconButton
          title="New"
          onPress={() => setSort(SORT.NEW)}
          active={sort === SORT.NEW}
        />
      </Row>
      <ScrollView
        contentContainerStyle={{padding: SCREEN_PADDING}}
        refreshControl={
          <RefreshControl
            refreshing={feedStore.state === STATES.LOADING}
            onRefresh={() => feedStore.loadFeed()}
          />
        }>
        {feedStore.feed?.map((post) => (
          <View key={post.id}>
            <FeedCard
              data={post.data.pixels}
              backgroundColor={post.data.backgroundColor}
              userName={post.user.displayName}
              likes={post.likes}
              onLike={() =>
                feedStore.likePost(post.id, userStore.user.uid, post.likes)
              }
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
});

export default Home;
