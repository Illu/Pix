import React from 'react';
import { FlatList, TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';

import { SCREEN_PADDING } from '../../theme';

const licenses = require('./licenses.json');

const TitleWrapper = styled.View`
  padding: ${SCREEN_PADDING}px;
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
  margin-top: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const DescWrapper = styled.View`
  border-bottom-width: 1px;
  padding: 10px 0 15px 0;
  border-color: ${({ theme }) => theme.uiAccent};
`;

const Desc = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
`;

const TouchableWrapper = styled.TouchableOpacity`
  padding-left: ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
`;

const renderItem = ({ item }) => (
  <TouchableWrapper onPress={() => Linking.openURL(licenses[item].repository)}>
    <LicenseTitle>{item}</LicenseTitle>
    <DescWrapper>
      {licenses[item].publisher && <Desc>{licenses[item].publisher}</Desc>}
      <Desc>{licenses[item].licenses} license</Desc>
    </DescWrapper>
  </TouchableWrapper>
);

const Licenses = () => (
  <>
    <TitleWrapper>
      <Title>Open Source Licenses</Title>
      <SubTitle>
        Pix is made possible thanks to the following Open-Source libraries and
        tools:
      </SubTitle>
    </TitleWrapper>
    <FlatList
      style={{ padding: SCREEN_PADDING }}
      data={Object.keys(licenses)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      removeClippedSubview
    />
  </>
);

export default Licenses;
