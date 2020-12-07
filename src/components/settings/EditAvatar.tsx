import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import Avatar from '../../components/Avatar';
import { BUTTON_WIDTH } from '../../constants';
import { SCREEN_PADDING } from '../../theme';

const Wrapper = styled.View`
  height: 500px;
  padding: ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
  color: ${({ theme }) => theme.text};
`;

const AvatarWrapper = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Header = styled.View`
  width: 40px;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.secondaryText};
  margin-bottom: 20px;
  align-self: center;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const EditAvatar = (categories: object, onSelect: (name: string) => void) => (
  <Wrapper>
    <Header />
    <ScrollView>
      {Object.keys(categories)?.map((key, index) => (
        <View key={key + index}>
          <Label>{key[0].toUpperCase() + key.slice(1)}</Label>
          <Row>
            {categories[key]?.map((name, index) => (
              <AvatarWrapper key={index} onPress={() => onSelect(name)}>
                <Avatar size={60} name={name} />
              </AvatarWrapper>
            ))}
          </Row>
        </View>
      ))}
    </ScrollView>
  </Wrapper>
);

export default EditAvatar;
