import storage from '@react-native-firebase/storage';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import Images from '../stores/Images';

const Wrapper = styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-color: ${({ theme }) => theme.text};
  border-width: ${({ border }) => (border ? 1 : 0)}px;
`;

const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

interface Props {
  size?: number;
  withBorder?: boolean;
  name?: string;
  cloudRef?: any;
}

const Avatar = observer(
  ({ size = 32, withBorder = false, name = 'cat-1', cloudRef }: Props) => {
    const [uri, setUri] = useState<null | string>(null);

    const imagesStore = useContext(Images);

    useEffect(() => {
      if (cloudRef) {
        storage()
          .ref(cloudRef)
          .getDownloadURL()
          .then((url) => setUri(url));
      }
    }, []);

    const source = cloudRef
      ? { uri }
      : { uri: imagesStore?.avatars[name]?.url || null };

    return (
      <Wrapper size={size} border={withBorder}>
        <Image source={source} />
      </Wrapper>
    );
  }
);

export default Avatar;
