import React from 'react';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheet';
import styled from 'styled-components/native';
import { PIXEL_COUNT } from '../constants';
import { Pixel } from '../types';

const Wrapper = styled.View`
  border-radius: ${({ rounded }) => (rounded ? 3 : 0)}px;
  background: ${({ background }) => background};
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const PixelsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${({ pixelSize }) => pixelSize - 1}px; //-1 to avoid early flex wraps with decimals
`;

const PixelBlock = styled.View`
  border: 1px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
`;

interface Props {
  data: Pixel[];
  backgroundColor: string;
  size: number;
  rounded?: boolean;
  style?: ViewStyle;
}

const PixelArt = ({ data, backgroundColor, size, rounded = false, style }: Props) => {

  const pixelSize = size / (PIXEL_COUNT + 2)

  return (
    <Wrapper size={size} rounded={rounded} background={backgroundColor} style={{ ...style }}>
      <PixelsWrapper pixelSize={pixelSize}>
        {data.map(pixel => (
          <PixelBlock size={pixelSize} color={pixel.color !== 'none' ? pixel.color : backgroundColor} />
        ))}
      </PixelsWrapper>
    </Wrapper>
  );
};

export default PixelArt;
