import React from 'react';
import styled from 'styled-components/native';

import { SCREEN_PADDING } from '../../theme';
import { PALETTES } from '../../theme';

const Wrapper = styled.View`
  height: 500px;
  overflow: visible;
  width: 100%;
  background: ${({ theme }) => theme.secondary};
  align-items: center;
  padding: ${SCREEN_PADDING}px;
  z-index: 2;
`;

const Header = styled.View`
  width: 40px;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.secondaryText};
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-around;
`;

const Palette = styled.View`
  width: 100%;
`;

const ColorDrop = styled.View<{ color: string }>`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: ${({ color }) => color};
  border-width: ${({ color }) => (color === '#FFFFFF' ? 1 : 0)}px;
`;

const Palettes = (onClose: (colors: string[]) => void) => {
  return (
    <Wrapper>
      <Header />
      {PALETTES.map((palette) => (
        <Palette key={palette.name}>
          <Label>{palette.name}</Label>
          <Row onPress={() => onClose(palette.colors)}>
            {palette.colors.map((color) => (
              <ColorDrop key={color} color={color} />
            ))}
          </Row>
        </Palette>
      ))}
    </Wrapper>
  );
};

export default Palettes;
