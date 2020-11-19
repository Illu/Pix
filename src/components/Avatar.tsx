import React from 'react';
import styled from 'styled-components/native';

export const AVATARS = {
  'animal-1': {
    image: require('../../assets/images/avatars/animal-1.png'),
    backgroundColor: '#FFFDE6',
  },
  'animal-2': {
    image: require('../../assets/images/avatars/animal-2.png'),
    backgroundColor: '#FAEBDE',
  },
  'animal-3': {
    image: require('../../assets/images/avatars/animal-3.png'),
    backgroundColor: '#DBF0FF',
  },
  'animal-4': {
    image: require('../../assets/images/avatars/animal-4.png'),
    backgroundColor: '#F4F4F4',
  },
  'animal-5': {
    image: require('../../assets/images/avatars/animal-5.png'),
    backgroundColor: '#FFFDE6',
  },
  'plant-1': {
    image: require('../../assets/images/avatars/plant-1.png'),
    backgroundColor: '#EBFBF4',
  },
  'plant-2': {
    image: require('../../assets/images/avatars/plant-2.png'),
    backgroundColor: '#DBF0FF',
  },
  'plant-3': {
    image: require('../../assets/images/avatars/plant-3.png'),
    backgroundColor: '#FAEBDE',
  },
  'cat-1': {
    image: require('../../assets/images/avatars/cat-1.png'),
    backgroundColor: '#E5E5E5',
  },
  'cat-2': {
    image: require('../../assets/images/avatars/cat-2.png'),
    backgroundColor: '#FFB800',
  },
  'cat-3': {
    image: require('../../assets/images/avatars/cat-3.png'),
    backgroundColor: '#DBF0FF',
  },
  'cat-4': {
    image: require('../../assets/images/avatars/cat-4.png'),
    backgroundColor: '#EBFBF4',
  },
  'bird-1': {
    image: require('../../assets/images/avatars/bird-1.png'),
    backgroundColor: '#FFFDE6',
  },
  'bird-2': {
    image: require('../../assets/images/avatars/bird-2.png'),
    backgroundColor: '#EBFBF4',
  },
  'bird-3': {
    image: require('../../assets/images/avatars/bird-3.png'),
    backgroundColor: '#F4F4F4',
  },
  'other-1': {
    image: require('../../assets/images/avatars/other-1.png'),
    backgroundColor: '#FAEBDE',
  },
  'other-2': {
    image: require('../../assets/images/avatars/other-2.png'),
    backgroundColor: '#FFFDE6',
  },
};

const Wrapper = styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: ${({ backgroundColor }) => backgroundColor || "#FFFFFF"};
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
    backgroundColor={AVATARS[id]?.backgroundColor}>
    <Image source={AVATARS[id]?.image} />
  </Wrapper>
);

export default Avatar;
