import React, {useState, useContext} from 'react';
import {
  Dimensions,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import PixelArt from '../components/PixelArt';
import styled from 'styled-components/native';
import CustomHeader from '../components/CustomHeader';
import {SCREEN_PADDING} from '../theme';
import firestore from '@react-native-firebase/firestore';
import User from '../stores/User';
import {useNavigation, useTheme} from '@react-navigation/native';
import Challenge from '../stores/Challenge';
import Feed from '../stores/Feed';

const ScrollView = styled.ScrollView`
  background: ${({theme}) => theme.secondary};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const PublishButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 70px;
  background: ${({theme}) => theme.accent};
  border-radius: 4px;
`;

const PublishText = styled.Text`
  color: ${({theme}) => theme.text};
  font-size: 14px;
  font-weight: 600;
`;

const ContentWrapper = styled.View`
  padding: ${SCREEN_PADDING}px;
  margin-top: 10px;
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin: 5px 0;
  color: ${({theme}) => theme.text};
`;

const TextInput = styled.TextInput`
  border-radius: 4px;
  background: ${({theme}) => theme.background};
  border: 1px;
  border-color: ${({theme}) => theme.uiAccent};
  color: ${({theme}) => theme.text};
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  height: 100px;
`;

const Publish = ({route}) => {
  const {canvasData, backgroundColor} = route.params;
  const userStore = useContext(User);
  const challengeStore = useContext(Challenge);
  const feedStore = useContext(Feed);
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
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
    setLoading(true);
    const data = {
      userRef: firestore().doc(`Users/${userStore.user.uid}`),
      user: {
        id: userStore.user.uid,
        displayName: userStore.user.displayName,
        avatar: userStore.userData?.avatar || 'cat-1',
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
        if (tag) {
          challengeStore.changeSort('timestamp');
          challengeStore.loadChallenges();
          navigation.navigate('Challenges');
          if (!userStore.userData.badges.includes(tag)) {
            userStore.addBadge(tag);
          }
        } else {
          feedStore.changeSort('timestamp');
          feedStore.loadFeed();
          navigation.navigate('Home');
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const headerRight = (
    <PublishButton disabled={loading} onPress={sendPost}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <PublishText>Publish</PublishText>
      )}
    </PublishButton>
  );

  return (
    <>
      <CustomHeader
        title="Your Post"
        back
        rightComponent={headerRight}
        backAction={() =>
          navigation.navigate('Edit', {
            data: {data: {pixels: canvasData, backgroundColor}},
          })
        }
      />
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{flex: 1}}
        style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView>
          <PixelArt
            data={canvasData}
            backgroundColor={backgroundColor}
            size={Dimensions.get('window').width}
          />
          <ContentWrapper>
            <Row>
              <Label style={{flex: 1}}>
                I’m participating in this month challenge (
                {challengeStore.currentChallenge.title})
              </Label>
              <Switch
                style={{marginLeft: 20}}
                onValueChange={toggleSwitch}
                value={!!tag}
                trackColor={{true: colors.accent}}
              />
            </Row>
            <Label>A quick word about your masterpiece? (optional)</Label>
            <TextInput
              value={desc}
              onChangeText={(str) => str.length < 200 && setDesc(str)}
              multiline
            />
          </ContentWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Publish;
