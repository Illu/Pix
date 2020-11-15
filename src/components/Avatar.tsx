import React from 'react';
import styled from 'styled-components/native';

const avatars = {
  '1': {
    image: require('../../assets/images/avatar-1.png'),
    backgroundColor: '#FFFDE6',
  },
};

const Wrapper = styled.View`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: ${({backgroundColor}) => backgroundColor};
  border-color: ${({theme}) => theme.text};
  border-width: ${({border}) => (border ? 1 : 0)}px;
`;

const Image = styled.Image`
  width: 50%;
  height: 50%;
`;

interface Props {
  size?: number;
  withBorder?: boolean;
  id?: string;
}

const Avatar = ({size = 32, withBorder = false, id = '1'}: Props) => (
  <Wrapper
    size={size}
    border={withBorder}
    backgroundColor={avatars[id].backgroundColor}>
    <Image source={avatars[id].image} />
  </Wrapper>
);

export default Avatar;
