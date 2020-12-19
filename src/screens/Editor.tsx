import {
  useFocusEffect,
  useNavigation,
  useTheme
} from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Alert, TouchableOpacity, Dimensions } from 'react-native';
import ColorPicker from 'react-native-color-picker-ios';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Pixel } from 'src/types';
import styled from 'styled-components/native';

import Button from '../components/Button';
import CustomHeader from '../components/CustomHeader';
import Canvas from '../components/editor/Canvas';
import Palettes from '../components/editor/Palettes';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import { TOOLS } from '../constants';
import { getInitialCanvasData } from '../helpers';
import Drafts from '../stores/Drafts';
import {
  DEFAULT_EDITOR_BACKGROUND_COLOR,
  DEFAULT_EDITOR_COLOR_PALETTE,
  PALETTES
} from '../theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.secondary};
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${SCREEN_HEIGHT > 750 ? 25 : 15}px;
  align-items: center;
  max-height: 50px;
`;

const ColorDrop = styled.TouchableOpacity<{
  selected?: boolean;
  color?: string;
}>`
  height: ${({ selected }) => (selected ? 50 : 40)}px;
  width: ${({ selected }) => (selected ? 50 : 40)}px;
  background: ${({ color }) => color};
  border-width: ${({ color }) => (color === '#FFFFFF' ? 1 : 0)}px;
  border-radius: 25px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.TouchableOpacity<{
  active?: boolean;
  disabled?: boolean;
}>`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background: ${({ theme, active }) =>
    active ? theme.accent : theme.background};
`;

const OpacityView = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
  opacity: 0.5;
  z-index: 1;
`;

let history: Pixel[][] = [];
let fall = new Animated.Value(1);
const animatedShadowOpacity = Animated.interpolate(fall, {
  inputRange: [0, 1],
  outputRange: [0.5, 0]
});

const Editor = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const draftsStore = useContext(Drafts);

  const [canvasData, setCanvasData] = useState(getInitialCanvasData());
  const [selectedTool, setSelectedTool] = useState(TOOLS.PENCIL);
  const [displayDrawTab, setDisplayDrawTab] = useState(true);
  const [displayGrid, setdisplayGrid] = useState(true);
  const [colorPalette, setColorPalette] = useState(
    PALETTES[DEFAULT_EDITOR_COLOR_PALETTE].colors
  );
  const [currentColor, setCurrentColor] = useState(colorPalette[0]);
  const [drawerShown, setDrawerShown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_EDITOR_BACKGROUND_COLOR
  );

  useFocusEffect(
    React.useCallback(() => {
      setCanvasData(route.params?.data?.data?.pixels || getInitialCanvasData());
      setBackgroundColor(
        route.params?.data?.data?.backgroundColor ||
          DEFAULT_EDITOR_BACKGROUND_COLOR
      );
    }, [route.params])
  );

  useEffect(() => {
    history = [getInitialCanvasData()];
  }, []);

  const updateCanvas = (data: Pixel[]) => {
    history.push(canvasData);
    if (history.length > 10) {
      history.shift();
    }
    setCanvasData(data);
  };

  const goBack = () => {
    setCanvasData(getInitialCanvasData());
    setBackgroundColor(DEFAULT_EDITOR_BACKGROUND_COLOR);
    navigation.goBack();
  };

  const nonEmpty = canvasData.some((item) => item.color !== 'none');

  const sheetRef = React.useRef(null);

  return (
    <>
      <CustomHeader
        action={() => {
          if (nonEmpty) {
            navigation.navigate('Publish', { canvasData, backgroundColor });
          } else {
            Alert.alert('Oops...', 'You cannot submit an empty canvas!');
          }
        }}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              if (nonEmpty) {
                Alert.alert(
                  'Save your work?',
                  'You will be able to resume working on this amazing art from your profile page.',
                  [
                    {
                      text: 'No thanks',
                      onPress: goBack,
                      style: 'destructive'
                    },
                    {
                      text: 'Sure!',
                      onPress: () => {
                        draftsStore.addDraft(canvasData, backgroundColor);
                        goBack();
                      }
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                goBack();
              }
            }}
          >
            <Icon name="Cross" size={22} color={colors.text} />
          </TouchableOpacity>
        }
        title="Create"
      />
      <Wrapper>
        <Canvas
          data={canvasData}
          updateData={updateCanvas}
          backgroundColor={backgroundColor}
          currentColor={currentColor}
          displayGrid={displayGrid}
          selectedTool={selectedTool}
        />
        <Row>
          <IconButton
            icon="Palette"
            title="Draw"
            onPress={() => setDisplayDrawTab(true)}
            active={displayDrawTab}
            color="accent"
          />
          <IconButton
            icon="Bucket"
            title="Background"
            onPress={() => setDisplayDrawTab(false)}
            active={!displayDrawTab}
            color="accent"
          />
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          {displayDrawTab ? (
            <>
              <IconWrapper
                active={selectedTool === TOOLS.PENCIL}
                onPress={() => setSelectedTool(TOOLS.PENCIL)}
              >
                <Icon
                  name="Pencil"
                  size={24}
                  color={selectedTool === TOOLS.PENCIL ? '#fff' : colors.text}
                />
              </IconWrapper>
              <IconWrapper
                active={selectedTool === TOOLS.BUCKET}
                onPress={() => setSelectedTool(TOOLS.BUCKET)}
              >
                <Icon
                  name="Bucket"
                  size={24}
                  color={selectedTool === TOOLS.BUCKET ? '#fff' : colors.text}
                />
              </IconWrapper>
              <IconWrapper
                active={false}
                disabled={history.length <= 1}
                onPress={() => {
                  if (history.length > 1) {
                    setCanvasData(history[history.length - 2]);
                    history.pop();
                  }
                }}
              >
                <Icon name="Undo" size={24} color={colors.text} />
              </IconWrapper>
              <IconWrapper
                active={selectedTool === TOOLS.ERASER}
                onPress={() => setSelectedTool(TOOLS.ERASER)}
              >
                <Icon
                  name="Eraser"
                  size={24}
                  color={selectedTool === TOOLS.ERASER ? '#fff' : colors.text}
                />
              </IconWrapper>
            </>
          ) : (
            <IconWrapper
              active={displayGrid}
              onPress={() => setdisplayGrid(!displayGrid)}
            >
              <Icon
                name="Grid"
                size={24}
                color={displayGrid ? '#fff' : colors.text}
              />
            </IconWrapper>
          )}
        </Row>
        <ScrollView horizontal style={{ maxHeight: 80 }}>
          <Row>
            <ColorDrop
              color={colors.background}
              selected={false}
              onPress={() => {
                ColorPicker.showColorPicker(
                  { supportsAlpha: false, initialColor: currentColor },
                  (color) => {
                    setColorPalette([color, ...colorPalette]);
                    setCurrentColor(color);
                  }
                );
              }}
            >
              <Icon name="Plus" color={colors.text} />
            </ColorDrop>
            {colorPalette.map((color, index) => (
              <ColorDrop
                key={index}
                onPress={() => {
                  if (displayDrawTab) {
                    setCurrentColor(color);
                    if (selectedTool === TOOLS.ERASER) {
                      setSelectedTool(TOOLS.PENCIL);
                    }
                  } else {
                    setBackgroundColor(color);
                  }
                }}
                color={color}
                selected={
                  selectedTool !== TOOLS.ERASER && displayDrawTab
                    ? color === currentColor
                    : color === backgroundColor
                }
              />
            ))}
          </Row>
        </ScrollView>
        <Row>
          <Button
            title="Change color palette"
            onPress={() => {
              setDrawerShown(true);
              sheetRef.current.snapTo(0);
            }}
            fill={false}
          />
        </Row>
      </Wrapper>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[500, 0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={() =>
          Palettes((palette) => {
            setColorPalette([...palette]);
            setCurrentColor(palette[0]);
            sheetRef.current.snapTo(1);
          })
        }
        callbackNode={fall}
        onCloseEnd={() => setDrawerShown(false)}
      />
      <OpacityView
        pointerEvents={drawerShown ? 'auto' : 'none'}
        style={{
          opacity: animatedShadowOpacity
        }}
      />
    </>
  );
};

export default Editor;
