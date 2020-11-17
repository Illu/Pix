import React, { useState, useContext } from 'react';
import { Dimensions, Switch } from 'react-native';
import PixelArt from '../components/PixelArt';
import styled from 'styled-components/native';
import CustomHeader from '../components/CustomHeader';
import { SCREEN_PADDING } from '../theme';
import firestore from '@react-native-firebase/firestore';
import User from '../stores/User';
import { useNavigation } from '@react-navigation/native';
import Challenge from '../stores/Challenge';
import Feed from '../stores/Feed';

const ScrollView = styled.ScrollView`
  background: ${({ theme }) => theme.secondary};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PublishButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 70px;
  background: ${({ theme }) => theme.accent};
  border-radius: 4px;
`;

const PublishText = styled.Text`
  color: ${({ theme }) => theme.secondary};
  font-size: 14px;
  font-weight: 600;
`;

const ContentWrapper = styled.View`
  padding: ${SCREEN_PADDING}px;
  margin-top: 15px;
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin: 5px 0;
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({ theme }) => theme.secondary};
  border: 1px;
  border-color: ${({ theme }) => theme.uiAccent};
  padding: 10px;
  font-size: 12px;
  margin-bottom: 10px;
  height: 100px;
`;

const Publish = ({ route }) => {
  const { canvasData, backgroundColor } = route.params;
  const userStore = useContext(User);
  const challengeStore = useContext(Challenge);
  const feedStore = useContext(Feed);
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState(null);
  const navigation = useNavigation();

  const toggleSwitch = () => {
    if (tag) {
      setTag(null);
    } else {
      if (challengeStore.currentChallenge) {
        setTag(challengeStore.currentChallenge.id);
      }
    }
  };

  const sendPost = () => {
    const data = {
      user: {
        id: userStore.user.uid,
        displayName: userStore.user.displayName,
      },
      data: {
        backgroundColor,
        pixels: canvasData,
      },
      desc,
      likes: [],
      likesCount: 0,
      tag,
      timestamp: new Date().getTime(),
    };
    firestore()
      .collection('Posts')
      .add(data)
      .then(() => {
        console.log('post submitted!');
        if (tag) {
          challengeStore.loadChallenges('timestamp');
          navigation.navigate("Challenges");//TODO: switch tab in challenges if needed
        } else {
          feedStore.loadFeed('timestamp');
          navigation.navigate("Home"); //TODO: switch tab in home if needed
        }
      });
  };

  const headerRight = (
    <PublishButton onPress={sendPost}>
      <PublishText>Publish</PublishText>
    </PublishButton>
  );

  return (
    <>
      <CustomHeader title="Publish" back rightComponent={headerRight} />
      <ScrollView>
        <PixelArt
          data={canvasData}
          backgroundColor={backgroundColor}
          size={Dimensions.get('window').width}
        />
        <ContentWrapper>
          <Label>A quick word about your masterpiece ?</Label>
          <TextInput
            value={desc}
            onChangeText={(str) => str.length < 200 && setDesc(str)}
            multiline></TextInput>
          <Row>
            <Label style={{ flex: 1 }}>
              I’m participating in this month challenge (
              {challengeStore.currentChallenge.title})
            </Label>
            <Switch
              style={{ marginLeft: 20 }}
              onValueChange={toggleSwitch}
              value={!!tag}
            />
          </Row>
        </ContentWrapper>
      </ScrollView>
    </>
  );
};

export default Publish;
