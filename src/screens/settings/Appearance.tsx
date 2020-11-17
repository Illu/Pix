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
        icon:
          appStateStore.theme === Themes.automatic ? 'CheckCircle' : 'Circle',
        action: () => switchTheme(Themes.automatic),
        thumbIcon: "ArrowRight",
        thumbColor: colors.text
      },
      {
        title: 'Light',
        icon: appStateStore.theme === Themes.light ? 'CheckCircle' : 'Circle',
        action: () => switchTheme(Themes.light),
        thumbIcon: "ArrowRight",
        thumbColor: colors.text
      },
      {
        title: 'Dark',
        icon: appStateStore.theme === Themes.dark ? 'CheckCircle' : 'Circle',
        action: () => switchTheme(Themes.dark),
        thumbIcon: "ArrowRight",
        thumbColor: colors.text
      },
    ],
  ];

  return (
    <ScrollView>
      <ActionMenu items={items} />
    </ScrollView>
  );
});

export default Appearance;
