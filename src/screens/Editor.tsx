import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Canvas from '../components/editor/Canvas';
import CustomHeader from '../components/CustomHeader';
import {PIXEL_COUNT} from '../constants';
import {
  DEFAULT_EDITOR_BACKGROUND_COLOR,
  DEFAULT_EDITOR_COLOR_PALETTE,
} from '../theme';

const initialData = Array.apply(null, {length: PIXEL_COUNT * PIXEL_COUNT}).map(
  () => {
    return {color: DEFAULT_EDITOR_BACKGROUND_COLOR};
  },
);

const Editor = () => {
  const navigation = useNavigation();

  const [canvasData, setCanvasData] = useState(initialData);
  const [currentColor, setCurrentColor] = useState(
    DEFAULT_EDITOR_COLOR_PALETTE[0],
  );
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_EDITOR_BACKGROUND_COLOR,
  );

  return (
    <>
      <CustomHeader
        action={() => navigation.navigate('Publish')}
        title={'Create'}
        back
      />
      <Canvas
        data={canvasData}
        updateData={setCanvasData}
        backgroundColor={backgroundColor}
        currentColor={currentColor}
      />
    </>
  );
};

export default Editor;
