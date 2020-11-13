import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, Text, Pressable} from 'react-native';
import {SCREEN_PADDING} from '../theme';
import Avatar from './Avatar';
import PixelArt from './PixelArt';
import {Pixel} from '../types';

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

const Image = styled.Image`
  height: ${width - SCREEN_PADDING * 4}px;
  width: ${width - SCREEN_PADDING * 4}px;
`;

const Likes = styled.Text`
  margin: 10px 0 5px 0;
`;

const UserName = styled.Text`
  margin-left: 10px;
`;

interface Props {
  data: Pixel[];
  backgroundColor: string;
  likes?: string[];
  userName: string;
  onLike(): void;
}

const FeedCard = ({
  userName,
  data,
  backgroundColor,
  likes = [],
  onLike,
}: Props) => (
  <Wrapper>
    <Row>
      <Row noMargins>
        <Avatar />
        <UserName>{userName}</UserName>
      </Row>
      <Text>···</Text>
    </Row>
    <PixelArt
      data={data}
      backgroundColor={backgroundColor}
      size={width - SCREEN_PADDING * 4}
    />
    <Pressable onPress={onLike}>
      <Likes>❤️ {likes.length}</Likes>
    </Pressable>
  </Wrapper>
);

export default FeedCard;
