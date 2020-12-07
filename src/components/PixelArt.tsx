import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheet';
import styled from 'styled-components/native';

import { PIXEL_COUNT } from '../constants';
import { Pixel } from '../types';

const Wrapper = styled.View<{
  size: number;
  rounded?: boolean;
  background: string;
}>`
  border-radius: ${({ rounded }) => (rounded ? 3 : 0)}px;
  background: ${({ background }) => background};
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const PixelsWrapper = styled.View<{ pixelSize: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${({ pixelSize }) =>
    pixelSize - 1}px; //-1 to avoid early flex wraps with decimals
`;

const PixelBlock = styled.View<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
`;

const WarningText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.secondaryText};
`;

interface Props {
  data: Pixel[];
  backgroundColor: string;
  size: number;
  rounded?: boolean;
  style?: ViewStyle;
}

const PixelArt = ({
  data,
  backgroundColor,
  size,
  rounded = false,
  style
}: Props) => {
  const { colors } = useTheme();

  const pixelSize = size / (PIXEL_COUNT + 2);

  if (data?.length !== PIXEL_COUNT * PIXEL_COUNT || !backgroundColor) {
    return (
      <Wrapper
        size={size}
        rounded={rounded}
        background={colors.secondary}
        style={[{ ...style }, { justifyContent: 'center' }]}
      >
        <WarningText>Unable to load this art</WarningText>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      size={size}
      rounded={rounded}
      background={backgroundColor}
      style={{ ...style }}
    >
      <PixelsWrapper pixelSize={pixelSize}>
        {data.map((pixel, index) => (
          <PixelBlock
            key={index}
            size={pixelSize}
            color={pixel.color !== 'none' ? pixel.color : backgroundColor}
          />
        ))}
      </PixelsWrapper>
    </Wrapper>
  );
};

export default PixelArt;
