import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

interface Props {
  size?: number;
}

const Avatar = ({size = 32}: Props) => (
  <Wrapper size={size}>
    <Image source={{uri: 'http://placekitten.com/1200/1200'}} />
  </Wrapper>
);

export default Avatar;
