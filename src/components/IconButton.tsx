import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  height: 30px;
  border-radius: 15px;
  background: ${({active}) => (active ? '#35CE8D' : '#fff')};
  width: 130px;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 12px;
  margin-left: 10px;
`;

export const ICONBUTTON_COLORS = {
  green: {
    active: {
      background: '#EBFBF4',
      color: '#35CE8D',
    },
    disabled: {
      color: '#2B2D42',
      background: '#FFFFFF',
    },
  },
  yellow: {
    active: {
      background: '#FFFDE6',
      color: '#FFB800',
    },
    disabled: {
      color: '#2B2D42',
      background: '#FFFFFF',
    },
  },
};

interface Props {
  title: string;
  onPress(): void;
  active: boolean;
  color?: 'green' | 'yellow';
  icon: string;
}

const IconButton = ({title, onPress, active, color = 'green', icon}: Props) => {
  const colors =
    color === 'green'
      ? active
        ? {
            background: '#EBFBF4',
            color: '#35CE8D',
          }
        : {
            color: '#2B2D42',
            background: '#FFFFFF',
          }
      : active
      ? {
          background: '#FFFDE6',
          color: '#FFB800',
        }
      : {
          color: '#2B2D42',
          background: '#FFFFFF',
        };

  return (
    <Wrapper
      onPress={onPress}
      active={active}
      style={{backgroundColor: colors.background}}>
      <Icon name={icon} color={colors.color} size={16} />
      <Title style={{color: colors.color}}>{title}</Title>
    </Wrapper>
  );
};

export default IconButton;
