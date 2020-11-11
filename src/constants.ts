import { Dimensions } from 'react-native';

export enum STATES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export const TABBAR_HEIGHT = 70;
export const HEADER_HEIGHT = 50;

export const PIXEL_COUNT = 16;

export const EDITOR_BORDER_SIZE = 10;
export const PIXEL_SIZE =
  (Dimensions.get('window').width - EDITOR_BORDER_SIZE * 2) / PIXEL_COUNT;