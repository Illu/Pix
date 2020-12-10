import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Product } from 'react-native-iap';
import styled from 'styled-components/native';

import Icon from '../../components/Icon';
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

const Label = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Tips = observer(({ route }) => {
  const [egg, setEgg] = useState(0);

  const { products } = route.params;

  return (
    <Wrapper contentContainerStyle={{ alignItems: 'center' }}>
      <IconWrapper onPress={() => setEgg(egg + 1)}>
        <Icon
          size={50}
          name={egg > 10 ? 'Star' : egg % 2 === 0 ? 'Gift' : 'Smile'}
          color="#FFF"
        />
      </IconWrapper>
      <Title>
        If you want to support the development of the App, feel free to leave a
        tip. It helps us cover the fees needed to keep the App runnning!
      </Title>
      <ContentWrapper>
        {products ? (
          products.map((product: Product, index: number) => (
            <Row key={index}>
              <Label>{product.title}</Label>
              <PriceWrapper>
                <Price>{product.localizedPrice}</Price>
              </PriceWrapper>
            </Row>
          ))
        ) : (
          <>
            <Text>Weird...</Text>
            <Text>Unable to retrieve tips at this time, try again later!</Text>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
});

export default Tips;
