import { useLinking } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableOpacity, Linking } from 'react-native';

import styled from 'styled-components/native';
import { SCREEN_PADDING } from '../../theme';

const licenses = require('./licenses.json');

const Wrapper = styled.View`
`;

const Title = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 10px 0;
  padding: 0 ${SCREEN_PADDING}px;
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
  padding: 0 ${SCREEN_PADDING}px;
`;

const LicenseTitle = styled.Text`
  font-size: 15px;
  margin-top: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const DescWrapper = styled.View`
  border-left-width: 5px;
  padding: 10px;
  margin-left: 5px;
  border-color: ${({ theme }) => theme.accent};
`;

const Desc = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
`;

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => Linking.openURL(licenses[item].repository)}>
    <LicenseTitle>{item}</LicenseTitle>
    <DescWrapper>
      {licenses[item].publisher && <Desc>{licenses[item].publisher}</Desc>}
      <Desc>{licenses[item].licenses} license</Desc>
    </DescWrapper>
  </TouchableOpacity>
)

const Licenses = () => (
  <Wrapper>
    <Title>Open Source Licenses</Title>
    <SubTitle>Pix is made possible thanks to the following Open-Source libraries and tools:</SubTitle>
    <FlatList style={{ padding: SCREEN_PADDING }} data={Object.keys(licenses)} keyExtractor={item => item} renderItem={renderItem} removeClippedSubview />
  </Wrapper>
)

export default Licenses;
