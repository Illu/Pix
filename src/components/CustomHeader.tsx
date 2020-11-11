import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, ScrollView, View, Pressable} from 'react-native';
import styled from 'styled-components';
import {HEADER_HEIGHT} from '../constants';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT}px;
  padding: 0 10px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 15px;
`;

interface Props {
  action?(): void;
}

const CustomHeader = ({action}: Props) => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Pressable onPress={navigation.goBack}>
        <Text>🙅‍♀️</Text>
      </Pressable>
      <Title>Create</Title>
      {action ? (
        <Pressable onPress={action}>
          <Text>👉</Text>
        </Pressable>
      ) : (
        <View />
      )}
    </Wrapper>
  );
};

export default CustomHeader;
