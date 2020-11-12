import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import styled from 'styled-components/native';
import {BUTTON_WIDTH} from '../constants';

const Wrapper = styled.Pressable`
  width: ${BUTTON_WIDTH}px;
  padding: 10px;
  background: ${({theme, fill}) => (fill ? theme.accent : theme.secondary)};
  border-radius: 4px;
  align-items: center;
  border-width: ${({fill}) => (fill ? 0 : 1)}px;
  border-color: ${({theme}) => theme.secondaryText};
`;

const Title = styled.Text`
  font-weight: 600;
  color: ${({theme, fill}) => (fill ? theme.secondary : theme.secondaryText)};
`;

interface Props {
  onPress(): void;
  title: string;
  fill?: boolean;
  style?: ViewStyleProp;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  onPress,
  title,
  fill = true,
  style,
  loading = false,
  disabled = false,
}: Props) => {
  const {colors} = useTheme();

  return (
    <Wrapper
      style={{...style}}
      onPress={onPress}
      fill={fill}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          color={fill ? colors.secondary : colors.secondaryText}
        />
      ) : (
        <Title fill={fill}>{title}</Title>
      )}
    </Wrapper>
  );
};

export default Button;
