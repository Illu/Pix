import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';
import styled from 'styled-components/native';
import {Pixel} from '../types';

const Wrapper = styled.View`
  border-radius: ${({rounded}) => (rounded ? 3 : 0)}px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
`;

interface Props {
  data: Pixel[];
  size: number;
  rounded?: boolean;
  style?: ViewStyle;
}

const PixelArt = ({data, size, rounded = false, style}: Props) => {
  return (
    <Wrapper rounded={rounded} style={{...style}}>
      <Image source={{uri: 'http://placekitten.com/850/850'}} size={size} />
    </Wrapper>
  );
};

export default PixelArt;
