import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import Canvas from '../components/editor/Canvas';
import CustomHeader from '../components/CustomHeader';
import {TOOLS} from '../constants';
import {
  DEFAULT_EDITOR_BACKGROUND_COLOR,
  DEFAULT_EDITOR_COLOR_PALETTE,
  PALETTES,
} from '../theme';
import {ScrollView, Alert, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';
import IconButton from '../components/IconButton';
import Icon from '../components/Icon';
import Drafts from '../stores/Drafts';
import Button from '../components/Button';
import BottomSheet from 'reanimated-bottom-sheet';
import Palettes from '../components/editor/Palettes';
import ColorPicker from 'react-native-color-picker-ios';
import {getInitialCanvasData} from '../helpers';

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
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: ${({theme, active}) =>
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

const Editor = ({route}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const draftsStore = useContext(Drafts);

  const [canvasData, setCanvasData] = useState(getInitialCanvasData());
  const [selectedTool, setSelectedTool] = useState(TOOLS.PENCIL);
  const [displayDrawTab, setDisplayDrawTab] = useState(true);
  const [displayGrid, setdisplayGrid] = useState(true);
  const [colorPalette, setColorPalette] = useState(
    PALETTES[DEFAULT_EDITOR_COLOR_PALETTE].colors,
  );
  const [currentColor, setCurrentColor] = useState(colorPalette[0]);
  const [drawerShown, setDrawerShown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_EDITOR_BACKGROUND_COLOR,
  );

  let fall = new Animated.Value(1);
  useFocusEffect(
    React.useCallback(() => {
      setCanvasData(route.params?.data?.data?.pixels || getInitialCanvasData());
      setBackgroundColor(
        route.params?.data?.data?.backgroundColor ||
          DEFAULT_EDITOR_BACKGROUND_COLOR,
      );
    }, [route.params]),
  );

  const goBack = () => {
    setCanvasData(getInitialCanvasData());
    setBackgroundColor(DEFAULT_EDITOR_BACKGROUND_COLOR);
    navigation.goBack();
  };

  const nonEmpty = canvasData.some((item) => item.color !== 'none');

  const sheetRef = React.useRef(null);
  const animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <>
      <CustomHeader
        action={() => {
          if (nonEmpty) {
            navigation.navigate('Publish', {canvasData, backgroundColor});
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
                      style: 'destructive',
                    },
                    {
                      text: 'Sure!',
                      onPress: () => {
                        draftsStore.addDraft(canvasData, backgroundColor);
                        goBack();
                      },
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                goBack();
              }
            }}>
            <Icon name="Cross" size={22} color={colors.text} />
          </TouchableOpacity>
        }
        title="Create"
      />
      <Wrapper>
        <Canvas
          data={canvasData}
          updateData={setCanvasData}
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
        <Row style={{justifyContent: 'space-around'}}>
          {displayDrawTab ? (
            <>
              <IconWrapper
                active={selectedTool === TOOLS.PENCIL}
                onPress={() => setSelectedTool(TOOLS.PENCIL)}>
                <Icon
                  name="Pencil"
                  size={24}
                  color={selectedTool === TOOLS.PENCIL ? '#fff' : colors.text}
                />
              </IconWrapper>
              <IconWrapper
                active={selectedTool === TOOLS.BUCKET}
                onPress={() => setSelectedTool(TOOLS.BUCKET)}>
                <Icon
                  name="Bucket"
                  size={24}
                  color={selectedTool === TOOLS.BUCKET ? '#fff' : colors.text}
                />
              </IconWrapper>
              <IconWrapper
                active={selectedTool === TOOLS.ERASER}
                onPress={() => setSelectedTool(TOOLS.ERASER)}>
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
              onPress={() => setdisplayGrid(!displayGrid)}>
              <Icon
                name="Grid"
                size={24}
                color={displayGrid ? '#fff' : colors.text}
              />
            </IconWrapper>
          )}
        </Row>
        <ScrollView horizontal style={{maxHeight: 80}}>
          <Row>
            <ColorDrop
              color={colors.background}
              selected={false}
              onPress={() => {
                ColorPicker.showColorPicker(
                  {supportsAlpha: false, initialColor: currentColor},
                  (color) => {
                    setColorPalette([color, ...colorPalette]);
                    setCurrentColor(color);
                  },
                );
              }}>
              <Icon name="Plus" color={colors.text} />
            </ColorDrop>
            {colorPalette.map((color, index) => (
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
          opacity: animatedShadowOpacity,
        }}
      />
    </>
  );
};

export default Editor;
