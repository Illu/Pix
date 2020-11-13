import React from 'react';
import { Text, ScrollView, Image } from 'react-native';
import PixelArt from '../components/PixelArt';

const Publish = ({ route }) => {
  const { canvasData, backgroundColor } = route.params;

  return (
    <ScrollView>
      <Text style={{ fontSize: 34 }}>Publish</Text>
      <PixelArt data={canvasData} backgroundColor={backgroundColor} size={200} />
    </ScrollView>
  );
};

export default Publish;
