import {Pixel, Themes} from './types';
import {darkTheme, lightTheme} from './theme';
import {ColorSchemeName} from 'react-native-appearance';
import {PIXEL_COUNT} from './constants';

export const getColorScheme = (theme: Themes, scheme: ColorSchemeName) => {
  if (theme === Themes.automatic) {
    if (scheme === 'dark') {
      return {theme: darkTheme, statusBarStyle: 'light-content'};
    } else {
      return {theme: lightTheme, statusBarStyle: 'dark-content'};
    }
  } else if (theme === Themes.light) {
    return {theme: lightTheme, statusBarStyle: 'dark-content'};
  } else if (theme === Themes.dark) {
    return {theme: darkTheme, statusBarStyle: 'light-content'};
  }
};

export const getInitialCanvasData = () =>
  Array.apply(null, {
    length: PIXEL_COUNT * PIXEL_COUNT,
  }).map(() => ({color: 'none'}));

export const dropBucket = (
  data: Pixel[],
  dropIndex: number,
  color: string,
  initialColor: string,
  initialData: Pixel[],
) => {
  let newData = [...data];

  const topIndex = dropIndex - PIXEL_COUNT;
  const bottomIndex = dropIndex + PIXEL_COUNT;
  const leftIndex = dropIndex - 1;
  const rightIndex = dropIndex + 1;

  newData[dropIndex] = {color};

  if (
    topIndex >= 0 &&
    newData[topIndex].color === initialColor &&
    newData[topIndex].color !== color
  ) {
    newData = dropBucket(newData, topIndex, color, initialColor, initialData);
  }

  if (
    bottomIndex < PIXEL_COUNT * PIXEL_COUNT &&
    newData[bottomIndex].color === initialColor &&
    newData[bottomIndex].color !== color
  ) {
    newData = dropBucket(
      newData,
      bottomIndex,
      color,
      initialColor,
      initialData,
    );
  }

  if (
    (leftIndex + 1) % PIXEL_COUNT !== 0 &&
    newData[leftIndex].color === initialColor
  ) {
    newData = dropBucket(newData, leftIndex, color, initialColor, initialData);
  }

  if (
    rightIndex % PIXEL_COUNT !== 0 &&
    newData[rightIndex].color === initialColor &&
    newData[rightIndex].color !== color
  ) {
    newData = dropBucket(newData, rightIndex, color, initialColor, initialData);
  }

  return newData;
};
