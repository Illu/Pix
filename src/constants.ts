import {Dimensions} from 'react-native';

export enum STATES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export enum SORT {
  TRENDING,
  NEW,
}

export enum TOOLS {
  PENCIL,
  BUCKET,
  ERASER,
}

export const TABBAR_HEIGHT = 70;
export const HEADER_HEIGHT = 40;
export const BUTTON_WIDTH = 275;

export const PIXEL_COUNT = 16;

export const EDITOR_BORDER_SIZE = 10;
export const PIXEL_SIZE =
  (Dimensions.get('window').width - EDITOR_BORDER_SIZE * 2) / PIXEL_COUNT;
