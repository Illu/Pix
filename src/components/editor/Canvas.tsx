import React from 'react';
import styled from 'styled-components';
import { Pixel } from '../../types';
import { PanResponder } from 'react-native';
import {
  EDITOR_BORDER_SIZE,
  HEADER_HEIGHT,
  PIXEL_COUNT,
  PIXEL_SIZE,
} from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Wrapper = styled.View`
  background: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  padding: ${EDITOR_BORDER_SIZE}px;
`;

const Grid = styled.View`
  width: 100%;
  height: ${PIXEL_SIZE * PIXEL_COUNT}px;
  background: white;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PixelBlock = styled.View`
  background: ${({ color }) => color};
  height: ${PIXEL_SIZE}px;
  width: ${PIXEL_SIZE}px;
`;

interface Props {
  backgroundColor: string;
  updateData(data: Pixel[]): void;
  data: Pixel[];
  currentColor: string;
}

const Canvas = ({ backgroundColor, data, updateData, currentColor }: Props) => {
  const insets = useSafeAreaInsets();

  const updateCanvas = (evt) => {
    if (evt.nativeEvent.pageX > EDITOR_BORDER_SIZE + PIXEL_SIZE * PIXEL_COUNT) {
      return;
    }
    const tx = evt.nativeEvent.pageX - EDITOR_BORDER_SIZE;
    const ty =
      evt.nativeEvent.pageY - EDITOR_BORDER_SIZE - HEADER_HEIGHT - insets.top;
    const px = Math.trunc(tx / PIXEL_SIZE);
    const py = Math.trunc(ty / PIXEL_SIZE);
    const arrayPosition = py * PIXEL_COUNT + px;
    if (arrayPosition + 1 > data.length || arrayPosition < 0) {
      return;
    }
    if (data[arrayPosition].color === currentColor) {
      return;
    }
    const newData = data;
    newData[arrayPosition] = { color: currentColor };
    updateData([...newData]);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        updateCanvas(evt);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        updateCanvas(evt);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Grid {...panResponder.panHandlers}>
        {data.map((pixel, index) => (
          <PixelBlock key={index} color={pixel.color} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Canvas;
