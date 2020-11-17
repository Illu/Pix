import React from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { SCREEN_PADDING } from '../../theme';
import Button from '../../components/Button';
import { BUTTON_WIDTH } from '../../constants';

const Wrapper = styled.ScrollView`
  padding: 20px ${SCREEN_PADDING}px 10px ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 11px;
  margin: 5px 0;
  width: ${BUTTON_WIDTH}px;
`;

const EditAvatar = () => {

  return (
    <Wrapper contentContainerStyle={{ alignItems: 'center' }}>
      <Avatar size={119} />
      <Button
        onPress={() => { }}
        title="Edit profile picture"
        fill={false}
        style={{ width: 163, marginTop: 10, marginBottom: 30 }}
      />
      <Label>Username</Label>
    </Wrapper>
  );
};

export default EditAvatar;
