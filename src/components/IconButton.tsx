import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';
import { useTheme } from '@react-navigation/native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  height: 30px;
  border-radius: 15px;
  background: ${({ active }) => (active ? '#35CE8D' : '#fff')};
  width: 130px;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  margin-left: 10px;
`;

interface Props {
  title: string;
  onPress(): void;
  active: boolean;
  color?: 'green' | 'yellow' | 'accent';
  icon: string;
}

const IconButton = ({ title, onPress, active, color = 'green', icon }: Props) => {
  const { colors } = useTheme();
  const localColors =
    color === 'green'
      ? active
        ? {
          background: colors.greenBackground,
          color: colors.green,
        }
        : {
          color: colors.text,
          background: colors.secondaryBackground,
        }
      : color === "accent"
        ? active
          ? {
            background: colors.accent,
            color: "#FFF",
          }
          : {
            background: colors.background,
            color: colors.text,
          } :
        active
          ? {
            background: colors.yellowBackground,
            color: colors.yellow,
          }
          : {
            color: colors.text,
            background: colors.secondaryBackground,
          };

  return (
    <Wrapper
      onPress={onPress}
      active={active}
      style={{ backgroundColor: localColors.background }}>
      <Icon name={icon} color={localColors.color} size={16} />
      <Title style={{ color: localColors.color }}>{title}</Title>
    </Wrapper>
  );
};

export default IconButton;
