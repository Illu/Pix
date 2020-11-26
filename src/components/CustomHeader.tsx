import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {HEADER_HEIGHT} from '../constants';
import Icon from './Icon';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({insetTop}) => HEADER_HEIGHT + insetTop}px;
  padding: 0 10px;
  padding-top: ${({insetTop}) => insetTop}px;
  background: ${({theme}) => theme.secondary};
  z-index: 2;
`;

const SectionWrapper = styled.View`
  width: 33%;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: ${({theme}) => theme.text};
`;

const BackText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  color: ${({theme}) => theme.text};
`;

const EmptyPlaceholder = styled.View`
  width: 40px;
`;

interface Props {
  title: string;
  action?(): void;
  leftComponent?: React.Component;
  rightComponent?: React.Component;
  back?: boolean;
  close?: boolean;
  backAction?(): void;
}

const CustomHeader = ({
  action,
  title,
  leftComponent,
  rightComponent,
  back,
  close,
  backAction,
}: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <Wrapper insetTop={insets.top}>
      <SectionWrapper>
        {leftComponent ? (
          leftComponent
        ) : back || close ? (
          <TouchableOpacity
            onPress={backAction ? backAction : navigation.goBack}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name={back ? 'ChevronLeft' : 'Cross'}
              color={colors.text}
              size={24}
            />
            <BackText>{back ? 'Back' : ''}</BackText>
          </TouchableOpacity>
        ) : (
          <EmptyPlaceholder />
        )}
      </SectionWrapper>
      <SectionWrapper style={{alignItems: 'center'}}>
        <Title>{title}</Title>
      </SectionWrapper>
      <SectionWrapper style={{alignItems: 'flex-end'}}>
        {rightComponent ? (
          rightComponent
        ) : action ? (
          <TouchableOpacity onPress={action}>
            <Icon name="ArrowRight" color={colors.accent} size={24} />
          </TouchableOpacity>
        ) : (
          <EmptyPlaceholder />
        )}
      </SectionWrapper>
    </Wrapper>
  );
};

export default CustomHeader;
