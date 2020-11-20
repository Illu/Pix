import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FeedCard from '../components/FeedCard';
import { SORT, STATES } from '../constants';
import { SCREEN_PADDING } from '../theme';
import styled from 'styled-components/native';
import IconButton from '../components/IconButton';
import Avatar from '../components/Avatar';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import User from '../stores/User';
import { observer } from 'mobx-react-lite';
import Feed from '../stores/Feed';
import Icon from '../components/Icon';
import Empty from '../components/Empty';

const Row = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.secondary};
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Home = observer(() => {
  const navigation = useNavigation();
  const userStore = useContext(User);
  const feedStore = useContext(Feed);
  const { colors } = useTheme();
  const [sort, setSort] = useState(SORT.TRENDING);

  useEffect(() => {
    feedStore.loadFeed();
  }, []);

  const load = () => {
    if (feedStore.state !== STATES.LOADING) {
      feedStore.loadFeed(sort === SORT.NEW ? 'timestamp' : 'likesCount');
    }
  };

  const changeSort = (newSort: SORT) => {
    feedStore.clearFeed();
    setSort(newSort);
    feedStore.loadFeed(newSort === SORT.NEW ? 'timestamp' : 'likesCount');
  };

  const UserAvatar = (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Avatar id={userStore.userData?.avatar} />
    </TouchableOpacity>
  );

  const OptionsLink = (
    <Pressable onPress={() => navigation.navigate('Settings')}>
      <Icon name="Settings" size={25} color={colors.text} />
    </Pressable>
  );

  const ListItem = ({ item }) => (
    <FeedCard
      data={item.data.pixels}
      backgroundColor={item.data.backgroundColor}
      userName={item.user.displayName}
      likesCount={item.likesCount}
      id={item.id}
      onLike={() => {
        if (userStore.user?.uid) {
          feedStore.likePost(item.id, userStore.user.uid, item.likes || []);
        } else {
          navigation.navigate('EditorModal');
        }
      }}
      avatar={item.user.avatar}
      liked={userStore.user && item.likes.includes(userStore.user.uid)}
      onReport={() => feedStore.reportPost(item.id)}
      reports={item.reports}
    />
  );

  return (
    <>
      <CustomHeader
        title={userStore.isAdmin ? '🔨 Admin Mode' : 'Pix'}
        rightComponent={userStore.user ? UserAvatar : OptionsLink}
      />
      <Row>
        <IconButton
          title="Trending"
          onPress={() => changeSort(SORT.TRENDING)}
          active={sort === SORT.TRENDING}
          icon="TrendingUp"
        />
        <IconButton
          title="New"
          onPress={() => changeSort(SORT.NEW)}
          active={sort === SORT.NEW}
          color="yellow"
          icon="Star"
        />
      </Row>
      <FlatList
        contentContainerStyle={{ padding: SCREEN_PADDING }}
        refreshControl={
          <RefreshControl
            refreshing={feedStore.state === STATES.LOADING}
            onRefresh={load}
            tintColor={colors.secondaryText}
          />
        }
        data={feedStore.feed}
        renderItem={ListItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => feedStore.state !== STATES.LOADING && <Empty actionTitle="Add the first ever pixel art!" />}
        onEndReached={() => feedStore.loadMore(sort === SORT.NEW ? 'timestamp' : 'likesCount')}
        removeClippedSubviews
      />
    </>
  );
});

export default Home;
