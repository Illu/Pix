import React, {useRef} from 'react';
import styled from 'styled-components';
import {Pixel} from '../../types';
import {PanResponder} from 'react-native';
import {
  EDITOR_BORDER_SIZE,
  HEADER_HEIGHT,
  PIXEL_COUNT,
  PIXEL_SIZE,
  TOOLS,
} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {dropBucket} from '../../helpers';

const Wrapper = styled.View`
  background: ${({backgroundColor}) => backgroundColor};
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
  background: ${({color, backgroundColor}) =>
    color === 'none' ? backgroundColor : color};
  height: ${PIXEL_SIZE}px;
  width: ${PIXEL_SIZE}px;
  ${({displayGrid, index}) =>
    displayGrid &&
    `
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: ${index % PIXEL_COUNT === 15 ? 1 : 0}px;
    border-top-width: ${index < PIXEL_COUNT ? 1 : 0}px;
  `}
`;

interface Props {
  backgroundColor: string;
  updateData(data: Pixel[]): void;
  data: Pixel[];
  currentColor: string;
  selectedTool: TOOLS;
  displayGrid: boolean;
}

const Canvas = ({
  backgroundColor,
  data,
  updateData,
  currentColor,
  displayGrid,
  selectedTool,
}: Props) => {
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
    if (
      data[arrayPosition].color ===
      (selectedTool === TOOLS.ERASER ? 'none' : currentColor)
    ) {
      return;
    }
    let newData = data;
    if (selectedTool === TOOLS.BUCKET) {
      newData = dropBucket(
        newData,
        arrayPosition,
        currentColor,
        data[arrayPosition].color,
        newData,
      );
    } else {
      newData[arrayPosition] = {
        color: selectedTool === TOOLS.PENCIL ? currentColor : 'none',
      };
    }
    updateData([...newData]);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: updateCanvas,
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
  });
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Grid {...panResponder.panHandlers}>
        {data.map((pixel, index) => (
          <PixelBlock
            key={index}
            index={index}
            backgroundColor={backgroundColor}
            displayGrid={displayGrid}
            color={pixel.color}
            style={{borderColor: '#E5E5E5'}}
          />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Canvas;
