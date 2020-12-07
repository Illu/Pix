import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { MONTHS_FULL } from '../../constants';

const Wrapper = styled.ImageBackground<{ source: ImageSourcePropType }>`
  border-radius: 8px;
  margin-bottom: 10px;
  height: 180px;
  background: ${({ theme }) => theme.accent};
  justify-content: center;
  overflow: hidden;
`;

const ContentWrapper = styled(LinearGradient)`
  padding: 25px 15px;
  flex: 1;
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

const Link = styled.Text`
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #fff;
  margin-top: 10px;
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

const currentMonth = MONTHS_FULL[new Date().getMonth()];

const CurrentChallengeCard = ({ challengeTitle }: Props) => {
  const [challengeImageURL, setChallengeImageURL] = useState(undefined);

  useEffect(() => {
    storage()
      .ref(`challenges/${currentMonth.toLowerCase()}.png`)
      .getDownloadURL()
      .then(setChallengeImageURL);
  }, []);

  const navigation = useNavigation();
  return (
    <Wrapper source={{ uri: challengeImageURL }} resizeMode="cover">
      <ContentWrapper colors={['#00000000', '#00000099']}>
        <Month>{currentMonth} Challenge</Month>
        {challengeTitle ? (
          <>
            <TitleWrapper>
              <Title>{challengeTitle}</Title>
            </TitleWrapper>
            <Desc>
              Participate in our challenge to win this month unique badge and
              get a chance to enter the hall of fame !
            </Desc>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditorModal')}
            >
              <Link>Create your entry now</Link>
            </TouchableOpacity>
          </>
        ) : (
          <Desc>{'\n'}Unable to get infos about this month challenge</Desc>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default CurrentChallengeCard;
