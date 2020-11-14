import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import Canvas from '../components/editor/Canvas';
import CustomHeader from '../components/CustomHeader';
import {PIXEL_COUNT, TOOLS} from '../constants';
import {
  DEFAULT_EDITOR_BACKGROUND_COLOR,
  DEFAULT_EDITOR_COLOR_PALETTE,
} from '../theme';
import {ScrollView, Alert, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import IconButton from '../components/IconButton';
import Icon from '../components/Icon';
import Drafts from '../stores/Drafts';
import Button from '../components/Button';

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

const IconWrapper = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: ${({theme, active}) =>
    active ? theme.accent : theme.background};
`;

const initialData = Array.apply(null, {
  length: PIXEL_COUNT * PIXEL_COUNT,
}).map(() => ({color: 'none'}));

const Editor = ({route}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const draftsStore = useContext(Drafts);

  const [canvasData, setCanvasData] = useState(initialData);
  const [selectedTool, setSelectedTool] = useState(TOOLS.PENCIL);
  const [displayDrawTab, setDisplayDrawTab] = useState(true);
  const [displayGrid, setdisplayGrid] = useState(true);
  const [currentColor, setCurrentColor] = useState(
    DEFAULT_EDITOR_COLOR_PALETTE[0],
  );
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_EDITOR_BACKGROUND_COLOR,
  );

  useEffect(() => {
    setCanvasData(route.params?.data?.pixels || initialData);
    setBackgroundColor(
      route.params?.data?.backgroundColor || DEFAULT_EDITOR_BACKGROUND_COLOR,
    );
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <CustomHeader
        action={() =>
          navigation.navigate('Publish', {canvasData, backgroundColor})
        }
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              if (canvasData.some((item) => item.color !== 'none')) {
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
        <Row style={{justifyContent: 'space-around'}}>
          {displayDrawTab ? (
            <>
              <IconWrapper
                active={selectedTool === TOOLS.PENCIL}
                onPress={() => setSelectedTool(TOOLS.PENCIL)}>
                <Icon
                  name="Pencil"
                  size={24}
                  color={selectedTool === TOOLS.PENCIL ? '#fff' : '#000'}
                />
              </IconWrapper>
              <IconWrapper
                active={selectedTool === TOOLS.BUCKET}
                onPress={() => setSelectedTool(TOOLS.BUCKET)}>
                <Icon
                  name="Bucket"
                  size={24}
                  color={selectedTool === TOOLS.BUCKET ? '#fff' : '#000'}
                />
              </IconWrapper>
              <IconWrapper
                active={selectedTool === TOOLS.ERASER}
                onPress={() => setSelectedTool(TOOLS.ERASER)}>
                <Icon
                  name="Eraser"
                  size={24}
                  color={selectedTool === TOOLS.ERASER ? '#fff' : '#000'}
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
                color={displayGrid ? '#fff' : '#000'}
              />
            </IconWrapper>
          )}
        </Row>
        <ScrollView horizontal style={{maxHeight: 80}}>
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
        <Row>
          <Button
            title="Change color palette"
            onPress={() => {}}
            fill={false}
          />
        </Row>
      </Wrapper>
    </>
  );
};

export default Editor;
