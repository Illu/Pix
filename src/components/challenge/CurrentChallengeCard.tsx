import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.ImageBackground`
  border-radius: 8px;
  margin-bottom: 10px;
  height: 180px;
  background: ${({theme}) => theme.accent};
  padding: 25px 15px;
  justify-content: center;
`;

const TitleWrapper = styled.View`
  border-radius: 6px;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #fff;
  padding: 5px 20px;
  align-self: flex-start;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: #000;
`;

const Month = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
`;

const Desc = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
`;

interface Props {
  challengeTitle?: string;
}

const CurrentChallengeCard = ({challengeTitle}: Props) => (
  <Wrapper>
    <Month>December Challenge</Month>
    {challengeTitle ? (
      <>
        <TitleWrapper>
          <Title>{challengeTitle}</Title>
        </TitleWrapper>
        <Desc>
          Participate in our challenge to win this month unique badge and get a
          chance to enter the hall of fame !
        </Desc>
      </>
    ) : (
      <Desc>Unable to get infos about this month challenge</Desc>
    )}
  </Wrapper>
);

export default CurrentChallengeCard;
