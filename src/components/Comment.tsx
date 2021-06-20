import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { MONTHS } from '../constants';
import Avatar from './Avatar';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const LoadingAvatar = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background: ${({ theme }) => theme.background};
  margin-right: 10px;
`;

const LoadingUserName = styled.View`
  height: 16px;
  width: 100px;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
`;

const UserName = styled.Text`
  margin-left: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.secondary};
  padding: 15px;
  margin: 15px 15px 0 15px;
  border-radius: 8px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const DateText = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
  margin-top: 5px;
  font-size: 13px;
  font-weight: 300;
  margin-left: 10px;
`;

interface Props {
  userRef: any;
  text: string;
  timestamp: number;
}

const Comment = observer(({ userRef, text, timestamp }: Props) => {
  const [userInfos, setUserInfos] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  const date = useMemo(() => {
    if (timestamp) {
      const d = new Date(timestamp);
      return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    }
    return null;
  }, [timestamp]);

  useEffect(() => {
    if (userRef) {
      setLoading(true);
      userRef
        .get()
        .then((userData) => {
          const { displayName, avatar } = userData.data();
          setUserInfos({ displayName, avatar });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userRef]);

  return (
    <Wrapper>
      <Row noMargins>
        {loading ? (
          <>
            <LoadingAvatar />
            <LoadingUserName />
          </>
        ) : (
          <>
            <Avatar name={userInfos?.avatar || 'cat-1'} size={40} />
            <View>
              <UserName>{userInfos?.displayName || 'Unknown'}</UserName>
              <DateText>{date}</DateText>
            </View>
          </>
        )}
      </Row>
      <Text>{text}</Text>
    </Wrapper>
  );
});

export default Comment;
