import React from 'react';
import styled from 'styled-components/native';

export const AVATARS = {
  'animal-1': {
    image: require('../../assets/images/avatars/animal-1.png'),
    backgroundColor: '#FFFDE6',
  },
  'cat-1': {
    image: require('../../assets/images/avatars/cat-1.png'),
    backgroundColor: '#E5E5E5',
  },
  'cat-2': {
    image: require('../../assets/images/avatars/cat-2.png'),
    backgroundColor: '#FFB800',
  },
};



const Wrapper = styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ theme }) => theme.text};
  border-width: ${({ border }) => (border ? 1 : 0)}px;
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

const Avatar = ({ size = 32, withBorder = false, id = 'cat-1' }: Props) => (
  <Wrapper
    size={size}
    border={withBorder}
    backgroundColor={AVATARS[id].backgroundColor}>
    <Image source={AVATARS[id].image} />
  </Wrapper>
);

export default Avatar;
