import AsyncStorage from '@react-native-community/async-storage';
import {makeObservable, observable, action} from 'mobx';
import {createContext} from 'react';

import {Pixel} from '../types';

class Drafts {
  constructor() {
    this.initStore();
    makeObservable(this, {
      drafts: observable,
      addDraft: action,
      saveData: action,
      removeDraft: action,
    });
  }

  drafts = [];

  addDraft = (data: Pixel[], backgroundColor: string) => {
    this.drafts.push({data: {pixels: data, backgroundColor}});
    this.saveData();
  };

  removeDraft = (index: number) => {
    this.drafts = [...this.drafts.splice(1, index)];
    this.saveData();
  };

  initStore = async () => {
    try {
      const value = await AsyncStorage.getItem('@Pix:drafts');
      if (value !== null) {
        const data = JSON.parse(value);
        this.drafts = data.drafts;
      }
    } catch (error) {}
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        '@Pix:drafts',
        JSON.stringify({
          drafts: this.drafts,
        }),
      );
    } catch (error) {}
  };
}

export default createContext(new Drafts());
