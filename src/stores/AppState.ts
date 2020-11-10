import AsyncStorage from '@react-native-community/async-storage';
import {makeObservable, observable, action} from 'mobx';
import {createContext} from 'react';

import {Themes} from '../types';

class AppState {
  constructor() {
    this.initStore();
    makeObservable(this, {
      theme: observable,
      appIcon: observable,
      setTheme: action,
      setAppIcon: action,
    });
  }

  theme = Themes.automatic;
  appIcon = 'Default';

  setTheme = (newTheme: Themes) => {
    this.theme = newTheme;
    this.saveData();
  };

  setAppIcon = (newIcon: string) => {
    this.appIcon = newIcon;
    this.saveData();
  };

  initStore = async () => {
    try {
      const value = await AsyncStorage.getItem('@Moonwalk:settings');
      if (value !== null) {
        const data = JSON.parse(value);
        this.theme = data.theme;
        this.appIcon = data.appIcon || 'Default';
      }
    } catch (error) {}
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        '@Moonwalk:settings',
        JSON.stringify({
          theme: this.theme,
          appIcon: this.appIcon,
        }),
      );
    } catch (error) {}
  };
}

export default createContext(new AppState());
