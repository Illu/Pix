import React from 'react';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FeedCard from '../components/FeedCard';
import {SORT} from '../constants';
import {SCREEN_PADDING} from '../theme';
import styled from 'styled-components/native';
import IconButton from '../components/IconButton';
import Avatar from '../components/Avatar';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';

const Row = styled.View`
  flex-direction: row;
  background: ${({theme}) => theme.colors.card};
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const navigation = useNavigation();
  const [sort, setSort] = useState(SORT.TRENDING);

  const UserAvatar = (
    <Pressable onPress={() => navigation.navigate('Profile')}>
      <Avatar />
    </Pressable>
  );

  return (
    <>
      <CustomHeader title="Pix" rightComponent={UserAvatar} />
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
      <ScrollView contentContainerStyle={{padding: SCREEN_PADDING}}>
        <FeedCard />
        <FeedCard />
      </ScrollView>
    </>
  );
};

export default Home;
