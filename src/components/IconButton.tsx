import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.Pressable`
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
`;

interface Props {
  title: string;
  onPress(): void;
  active: boolean;
}

const IconButton = ({title, onPress, active}: Props) => (
  <Wrapper onPress={onPress} active={active}>
    <Title>{title}</Title>
  </Wrapper>
);

export default IconButton;
