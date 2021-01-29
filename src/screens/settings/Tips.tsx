import firestore from '@react-native-firebase/firestore';
import { useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import Confetti from 'react-native-confetti';
import { Product } from 'react-native-iap';
import * as RNIap from 'react-native-iap';
import styled from 'styled-components/native';

import Icon from '../../components/Icon';
import User from '../../stores/User';
import { SCREEN_PADDING } from '../../theme';

const Wrapper = styled.ScrollView`
  padding: 20px ${SCREEN_PADDING}px ${SCREEN_PADDING}px ${SCREEN_PADDING}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  width: 60%;
  text-align: center;
  margin: 20px 0;
  font-weight: 600;
`;

const IconWrapper = styled.Pressable`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  background: ${({ theme }) => theme.secondary};
  padding: 0 ${SCREEN_PADDING}px;
  border-radius: 14px;
  width: 64%;
  margin-top: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${SCREEN_PADDING}px 0;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 600;
  margin: 20px 30px;
  text-align: center;
`;

const PriceWrapper = styled.TouchableOpacity`
  background: ${({ theme }) => theme.accent};
  padding: 5px 10px;
  border-radius: 12px;
`;

const Price = styled.Text`
  color: #fff;
  font-weight: 600;
`;

const ConfettiWrapper = styled.View`
  position: absolute;
  top: -30px;
`;

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const ThanksText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  flex: 1;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Loader = styled.ActivityIndicator`
  margin: 40px 0;
`;

const itemSkus = Platform.select({
  ios: ['SMALLTIP', 'GOODTIP', 'GREATTIP'],
  android: ['']
});

const emojis = ['☕️', '🍕', '🎉'];

const Tips = observer(() => {
  const userStore = useContext(User);
  const [egg, setEgg] = useState(0);
  const { colors } = useTheme();

  const confettiRef = useRef();

  const [products, setProducts] = useState<RNIap.Product<string>[]>();
  const [purchased, setPurchased] = useState(false);
  const [previouslyTipped, setPreviouslyTipped] = useState(false);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = async () => {
    if (userStore?.user?.uid) {
      const userData = await firestore()
        .collection('Users')
        .doc(userStore.user.uid)
        .get();
      console.log(userData.data());
      if (userData.data().tipped) {
        setPreviouslyTipped(true);
      }
    }
    const connected = await RNIap.initConnection();
    if (connected) {
      const retrievedProducts = await RNIap.getProducts(itemSkus);
      if (retrievedProducts) {
        setProducts(retrievedProducts);
      } else {
        Alert.alert(
          'Oh no!',
          'Unable to retrieve tips at this time... Try again later!'
        );
      }
    } else {
      Alert.alert(
        'Oh no!',
        'Unable to connect to the In-App purchases center... Try again later!'
      );
    }
  };

  const purchaseItem = async (itemSku: string) => {
    try {
      const productPurchase = await RNIap.requestPurchase(itemSku);
      if (confettiRef) {
        confettiRef.current.startConfetti();
      }
      if (productPurchase) {
        setPurchased(true);
        Alert.alert(
          'Thank you! 😊',
          `I am grateful for the support you give to the App ❤️ . Your tip will be used to improve the App and cover server / hosting fees.\n\nTransaction ID: ${productPurchase.transactionId}`,
          [
            {
              text: 'Hooray!',
              style: 'default'
            }
          ]
        );
      }
      if (userStore?.user?.uid) {
        firestore()
          .collection('Users')
          .doc(userStore.user.uid)
          .update({ tipped: true });
      }
      console.log('product purchase: ', productPurchase);
    } catch (error) {
      Alert.alert(
        'Oh no!',
        'Failed to send tip.. Check your billing account settings'
      );
      console.warn('Purchase error: ', error);
    }
  };

  return (
    <>
      <ConfettiWrapper>
        <Confetti
          ref={confettiRef}
          duration={6000}
          size={1.5}
          bsize={4}
          untilStopped={true}
        />
      </ConfettiWrapper>
      <Wrapper contentContainerStyle={{ alignItems: 'center' }}>
        <IconWrapper onPress={() => setEgg(egg + 1)}>
          <Icon
            size={50}
            name={egg > 10 ? 'Star' : egg % 2 === 0 ? 'Gift' : 'Smile'}
            color="#FFF"
          />
        </IconWrapper>
        <Title>
          If you want to support the development of the App, feel free to leave
          a tip. It helps us cover the fees needed to keep the App running!
        </Title>
        <ContentWrapper>
          {!purchased ? (
            products ? (
              products.map((product: Product, index: number) => (
                <Row key={index}>
                  <Label>
                    {emojis[index]} {product.title}
                  </Label>
                  <PriceWrapper onPress={() => purchaseItem(product.productId)}>
                    <Price>{product.localizedPrice}</Price>
                  </PriceWrapper>
                </Row>
              ))
            ) : (
              <Loader size="large" color={colors.text} />
            )
          ) : (
            <Row>
              <ThanksText>
                Thank you for your kind support! 🤗{'\n'}
                {'\n'}Come back to this screen at any time to send another tip.
              </ThanksText>
            </Row>
          )}
        </ContentWrapper>
        {previouslyTipped && (
          <ThanksText>
            {'\n'}
            {'\n'}You've sent a tip to us in the past.{'\n'}Thanks again for
            your support! 🙏
          </ThanksText>
        )}
      </Wrapper>
    </>
  );
});

export default Tips;
