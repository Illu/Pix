import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components/native';

import {TABBAR_HEIGHT} from '../constants';

const Wrapper = styled.View`
  height: ${TABBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: ${({insetBottom}) => insetBottom}px;
`;

const PressableWrapper = styled.Pressable`
  flex: 1;
  align-items: center;
`;

const TabbarComponent = ({props}) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.card}}>
      <Wrapper insetBottom={insets.bottom}>
        {props.state.routeNames.map((route, index) =>
          index !== 1 ? (
            // <Pushable
            //   key={route}
            //   onPress={() => {
            //     const isFocused = props.state.index === index;
            //     const event = props.navigation.emit({
            //       type: "tabPress",
            //       target: route.key,
            //       canPreventDefault: true,
            //     });
            //     if (!isFocused && !event.defaultPrevented) {
            //       props.navigation.navigate(route);
            //     }
            //   }}
            // >
            //   <IconWrapper style={{ width: tabbarWidth / 4 }}>
            //     <Icon color={colors.text} name={route} />
            //   </IconWrapper>
            // </Pushable>
            <PressableWrapper
              key={route}
              onPress={() => {
                const isFocused = props.state.index === index;
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route);
                }
              }}>
              <Text>{route}</Text>
            </PressableWrapper>
          ) : (
            <PressableWrapper
              key={route}
              onPress={() => {
                props.navigation.navigate('EditorModal');
              }}>
              <Text>+</Text>
            </PressableWrapper>
          ),
        )}
      </Wrapper>
    </View>
  );
};

const Tabbar: React.FC = (routeProps) => <TabbarComponent props={routeProps} />;

export default Tabbar;
