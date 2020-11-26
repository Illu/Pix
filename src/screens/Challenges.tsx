import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  FlatList,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import User from '../stores/User';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import { STATES } from '../constants';
import styled from 'styled-components/native';
import Challenge from '../stores/Challenge';
import CurrentChallengeCard from '../components/challenge/CurrentChallengeCard';
import { SCREEN_PADDING } from '../theme';
import FeedCard from '../components/FeedCard';
import Empty from '../components/Empty';
import { observer } from 'mobx-react-lite';

const Row = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.secondary};
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Challenges = observer(() => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const userStore = useContext(User);
  const challengeStore = useContext(Challenge);

  const load = () => {
    challengeStore.loadChallenges();
  };

  const changeSort = (newSort: 'timestamp' | 'likesCount') => {
    challengeStore.changeSort(newSort);
    challengeStore.loadChallenges();
  };

  useEffect(() => {
    load();
  }, []);

  const UserAvatar = (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Avatar name={userStore.userData?.avatar} />
    </TouchableOpacity>
  );

  const OptionsLink = (
    <Pressable onPress={() => navigation.navigate('Settings')}>
      <Icon name="Settings" size={25} color={colors.text} />
    </Pressable>
  );

  const ListItem = ({ item }) => (
    <FeedCard
      id={item.id}
      data={item.data.pixels}
      backgroundColor={item.data.backgroundColor}
      userName={item.user.displayName}
      likesCount={item.likesCount}
      onLike={() => {
        if (userStore.user?.uid) {
          challengeStore.likePost(
            item.id,
            userStore.user.uid,
            item.likes || [],
          );
        } else {
          navigation.navigate('EditorModal');
        }
      }}
      liked={userStore.user && item.likes.includes(userStore.user.uid)}
      onReport={() => challengeStore.reportPost(item.id)}
      reports={item.reports}
      avatar={item.user.avatar}
      desc={item.desc}
      userRef={item.userRef}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        title="Pix - Challenges"
        rightComponent={userStore.user ? UserAvatar : OptionsLink}
      />
      <Row>
        <IconButton
          title="Submissions"
          onPress={() => changeSort('timestamp')}
          active={challengeStore.sort === 'timestamp'}
          icon="TrendingUp"
        />
        <IconButton
          title="Hall of fame"
          onPress={() => changeSort('likesCount')}
          active={challengeStore.sort === 'likesCount'}
          color="yellow"
          icon="Star"
        />
      </Row>
      <FlatList
        contentContainerStyle={{ padding: SCREEN_PADDING }}
        refreshControl={
          <RefreshControl
            refreshing={challengeStore.state === STATES.LOADING}
            onRefresh={load}
            tintColor={colors.secondaryText}
          />
        }
        ListHeaderComponent={
          <CurrentChallengeCard
            challengeTitle={challengeStore.currentChallenge?.title}
          />
        }
        data={challengeStore.challenges}
        renderItem={ListItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={() => challengeStore.loadMore()}
        removeClippedSubviews
        ListEmptyComponent={() => challengeStore.state !== STATES.LOADING && <Empty actionTitle="Add the first entry" />}
      />
    </View>
  );
});

export default Challenges;
