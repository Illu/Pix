import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  overflow: hidden;
  border-color: ${({theme}) => theme.text};
  border-width: ${({border}) => (border ? 1 : 0)}px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

interface Props {
  size?: number;
  withBorder?: boolean;
}

const Avatar = ({size = 32, withBorder = false}: Props) => (
  <Wrapper size={size} border={withBorder}>
    <Image source={{uri: 'http://placekitten.com/1200/1200'}} />
  </Wrapper>
);

export default Avatar;
