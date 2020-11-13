import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import Canvas from '../components/editor/Canvas';
import CustomHeader from '../components/CustomHeader';
import {PIXEL_COUNT} from '../constants';
import {
  DEFAULT_EDITOR_BACKGROUND_COLOR,
  DEFAULT_EDITOR_COLOR_PALETTE,
} from '../theme';
import styled from 'styled-components/native';
import IconButton from '../components/IconButton';
import {ScrollView} from 'react-native-gesture-handler';

const Wrapper = styled.View`
  background: ${({theme}) => theme.secondary};
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 25px;
  align-items: center;
  max-height: 50px;
`;

const ColorDrop = styled.TouchableOpacity`
  height: ${({selected}) => (selected ? 50 : 40)}px;
  width: ${({selected}) => (selected ? 50 : 40)}px;
  background: ${({color}) => color};
  border-width: ${({color}) => (color === '#FFFFFF' ? 1 : 0)}px;
  border-radius: 25px;
  margin-left: 10px;
`;

const initialData = Array.apply(null, {
  length: PIXEL_COUNT * PIXEL_COUNT,
}).map(() => ({color: 'none'}));

const Editor = () => {
  const navigation = useNavigation();

  const [canvasData, setCanvasData] = useState(initialData);
  const [displayDrawTab, setDisplayDrawTab] = useState(true);
  const [displayGrid, setdisplayGrid] = useState(true);
  const [currentColor, setCurrentColor] = useState(
    DEFAULT_EDITOR_COLOR_PALETTE[0],
  );
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_EDITOR_BACKGROUND_COLOR,
  );

  return (
    <>
      <CustomHeader
        action={() =>
          navigation.navigate('Publish', {canvasData, backgroundColor})
        }
        title={'Create'}
        back
      />
      <Wrapper>
        <Canvas
          data={canvasData}
          updateData={setCanvasData}
          backgroundColor={backgroundColor}
          currentColor={currentColor}
          displayGrid={displayGrid}
        />
        <Row>
          <IconButton
            icon="Star"
            title="Draw"
            onPress={() => setDisplayDrawTab(true)}
            active={displayDrawTab}
          />
          <IconButton
            icon="Star"
            title="Background"
            onPress={() => setDisplayDrawTab(false)}
            active={!displayDrawTab}
          />
        </Row>
        <ScrollView horizontal>
          <Row>
            {DEFAULT_EDITOR_COLOR_PALETTE.map((color, index) => (
              <ColorDrop
                key={index}
                onPress={() =>
                  displayDrawTab
                    ? setCurrentColor(color)
                    : setBackgroundColor(color)
                }
                color={color}
                selected={
                  displayDrawTab
                    ? color === currentColor
                    : color === backgroundColor
                }
              />
            ))}
          </Row>
        </ScrollView>
      </Wrapper>
    </>
  );
};

export default Editor;
