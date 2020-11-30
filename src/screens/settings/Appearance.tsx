import { useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

import ActionMenu from '../../components/ActionMenu';
import AppState from '../../stores/AppState';
import { Themes } from '../../types';

const Appearance = observer(() => {
  const appStateStore = useContext(AppState);
  const { colors } = useTheme();

  const switchTheme = (newTheme: Themes) => {
    appStateStore.setTheme(newTheme);
  };

  const items = [
    [
      {
        title: 'Automatic',
        action: () => switchTheme(Themes.automatic),
        thumbIcon:
          appStateStore.theme === Themes.automatic ? 'CheckCircle' : 'Circle',
        thumbColor: colors.text
      },
      {
        title: 'Light',
        action: () => switchTheme(Themes.light),
        thumbIcon:
          appStateStore.theme === Themes.light ? 'CheckCircle' : 'Circle',
        thumbColor: colors.text
      },
      {
        title: 'Dark',
        action: () => switchTheme(Themes.dark),
        thumbIcon:
          appStateStore.theme === Themes.dark ? 'CheckCircle' : 'Circle',
        thumbColor: colors.text
      }
    ]
  ];

  return (
    <ScrollView>
      <ActionMenu items={items} />
    </ScrollView>
  );
});

export default Appearance;
