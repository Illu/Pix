import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, Text} from 'react-native';
import {SCREEN_PADDING} from '../theme';
import Avatar from './Avatar';
import PixelArt from './PixelArt';
import {Pixel} from '../types';
import Icon from './Icon';
import {useTheme} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Row = styled.View`
  flex-direction: row;
  margin: ${({noMargins}) => (noMargins ? 0 : 5)}px 0;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.View`
  border-radius: 8px;
  padding: ${SCREEN_PADDING}px;
  background: ${({theme}) => theme.secondary};
  margin-bottom: ${SCREEN_PADDING}px;
`;

const Likes = styled.Text`
  color: ${({theme}) => theme.text};
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
`;

interface Props {
  data: Pixel[];
  backgroundColor: string;
  likesCount?: number;
  userName: string;
  onLike(): void;
  liked: boolean;
}

const FeedCard = ({
  userName,
  data,
  backgroundColor,
  likesCount = 0,
  liked,
  onLike,
}: Props) => {
  const {colors} = useTheme();

  return (
    <Wrapper>
      <Row>
        <Row noMargins>
          <Avatar withBorder />
          <UserName>{userName}</UserName>
        </Row>
        <Text>···</Text>
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
      </LikesRow>
    </Wrapper>
  );
};

export default FeedCard;
