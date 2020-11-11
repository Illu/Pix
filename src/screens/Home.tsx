import React from 'react';
import {Text, ScrollView, Image} from 'react-native';

const Home = () => {
  return (
    <ScrollView>
      <Text style={{fontSize: 34}}>Hello 🦦</Text>
      <Image
        source={{uri: 'http://placekitten.com/600/600'}}
        style={{height: 300, width: 300}}
      />
    </ScrollView>
  );
};

export default Home;
