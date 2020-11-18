import React from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { SCREEN_PADDING } from '../../theme';
import { BUTTON_WIDTH } from '../../constants';
import { View, ScrollView } from 'react-native';

const Wrapper = styled.View`
  height: 500px;
  padding: ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
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

const CATEGORIES = [
  { name: 'Cats', images: ['cat-1', 'cat-2'] },
  { name: 'Animals', images: ['animal-1'] }
]

const EditAvatar = (onSelect) => {

  return (
    <Wrapper>
      <Header />
      <ScrollView>
        {CATEGORIES.map(category => (
          <View key={category.name}>
            <Label>{category.name}</Label>
            <Row>
              {category.images.map(imageId => (
                <AvatarWrapper onPress={() => onSelect(imageId)}>
                  <Avatar size={60} id={imageId} />
                </AvatarWrapper>
              ))}
            </Row>
          </View>
        ))}
      </ScrollView>
    </Wrapper>
  );
};

export default EditAvatar;
