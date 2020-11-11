import React from 'react';
import {Text, ScrollView, Image} from 'react-native';

const Publish = () => {
  return (
    <ScrollView>
      <Text style={{fontSize: 34}}>Publish</Text>
      <Image
        source={{uri: 'http://placekitten.com/700/600'}}
        style={{height: 300, width: 300}}
      />
    </ScrollView>
  );
};

export default Publish;
