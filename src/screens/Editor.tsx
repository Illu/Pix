import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, ScrollView, Image, Pressable} from 'react-native';

const Editor = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Text style={{fontSize: 45}}>EDITOR</Text>
      <Image
        source={{uri: 'http://placekitten.com/800/800'}}
        style={{height: 300, width: 300}}
      />
      <Pressable onPress={navigation.goBack}>
        <Text>go back</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Editor;
