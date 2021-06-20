import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState, useContext } from 'react';
import {
  ScrollView,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Comment from '../components/Comment';
import Empty from '../components/Empty';
import Icon from '../components/Icon';
import { HEADER_HEIGHT } from '../constants';
import User from '../stores/User';

const Wrapper = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
  padding: 0 15px;
  margin: 15px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const InputWrapper = styled.View<{ insetBottom: number }>`
  padding: 15px;
  padding-bottom: ${({ insetBottom }) => insetBottom}px;
  background: ${({ theme }) => theme.secondary};
  position: relative;
`;

const TextInput = styled.TextInput`
  padding: 13px 50px 13px 15px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.uiAccent};
  color: ${({ theme }) => theme.text};
`;

const SendIconWrapper = styled.TouchableOpacity<{ insetBottom: number }>`
  position: absolute;
  bottom: ${({ insetBottom }) => insetBottom + 10}px;
  right: 30px;
`;

const PostDetails = observer(({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const userStore = useContext(User);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    const post = await firestore().collection('Posts').doc(id).get();
    const postData = post.data();
    if (postData && Array.isArray(postData.comments)) {
      setComments(postData.comments);
    }
    setLoading(false);
  };

  const insets = useSafeAreaInsets();

  const onSubmit = () => {
    setLoading(true);
    setComment('');
    const postRef = firestore().collection('Posts').doc(id);
    postRef
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          userRef: firestore().doc(`Users/${userStore.user.uid}`),
          text: comment,
          timestamp: new Date().getTime()
        })
      })
      .then(() => {
        loadData();
      })
      .catch(() => {
        // TODO: add error handling
        setLoading(false);
      });
  };

  return (
    <Wrapper contentContainerStyle={{ flex: 1, padding: 15 }}>
      <StatusBar barStyle="light-content" />
      <Header>
        <Title>Comments</Title>
        <Button title="Close" onPress={navigation.goBack} />
      </Header>
      {loading && <ActivityIndicator size="small" color={colors.text} />}
      <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
        {comments.length === 0 ? (
          <Empty hideAction={true} />
        ) : (
          comments.map((data, i) => (
            <Comment
              key={i}
              text={data.text}
              userRef={data.userRef}
              timestamp={data.timestamp}
            />
          ))
        )}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={insets.bottom + 5}
      >
        <InputWrapper insetBottom={insets.bottom}>
          <TextInput
            value={comment}
            editable={!!userStore.user}
            onChange={(e) => setComment(e.nativeEvent.text)}
            placeholder={
              userStore.user
                ? comments.length === 0
                  ? 'Add the first comment...'
                  : 'Add your comment...'
                : 'You must log in to add a comment !'
            }
            returnKeyType="send"
            placeholderTextColor={colors.placeholderText}
            multiline={true}
            maxLength={300}
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={onSubmit}
          />
          <SendIconWrapper
            insetBottom={insets.bottom}
            onPress={onSubmit}
            disabled={comment.length === 0}
            style={{ opacity: comment.length === 0 ? 0.2 : 1 }}
          >
            <Icon name="Send" size={25} color={colors.text} />
          </SendIconWrapper>
        </InputWrapper>
      </KeyboardAvoidingView>
    </Wrapper>
  );
});

export default PostDetails;
