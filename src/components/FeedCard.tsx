import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, Text} from 'react-native';
import {SCREEN_PADDING} from '../theme';
import Avatar from './Avatar';

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
  background: ${({theme}) => theme.colors.card};
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

interface Props {}

const FeedCard = () => (
  <Wrapper>
    <Row>
      <Row noMargins>
        <Avatar />
        <UserName>JuanDeLaVega777</UserName>
      </Row>
      <Text>···</Text>
    </Row>
    <Image source={{uri: 'http://placekitten.com/1000/1000'}} />
    <Likes>❤️ 128 likes</Likes>
  </Wrapper>
);

export default FeedCard;
