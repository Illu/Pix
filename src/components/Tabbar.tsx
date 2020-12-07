import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationProp, useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { TABBAR_HEIGHT } from '../constants';
import Icon from './Icon';

const Wrapper = styled.View<{ insetBottom: number }>`
  height: ${TABBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: ${({ insetBottom }) => insetBottom}px;
`;

const PressableWrapper = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const TabIndicatorWrapper = styled(Animated.View)<{ insetBottom: number }>`
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const TabIndicator = styled.View`
  height: 4px;
  width: 4px;
`;

interface Props {
  props: BottomTabBarProps;
}

const TabbarComponent = ({ props }: Props) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [switchAnim] = useState(new Animated.Value(0));

  const tabbarWidth = Dimensions.get('window').width - 32;
  const indicatorPosition = switchAnim.interpolate({
    inputRange: [0, props.state.routeNames.length - 1],
    outputRange: [16, tabbarWidth - tabbarWidth / 3 + 16]
  });

  useEffect(() => {
    Animated.spring(switchAnim, {
      toValue: props.state.index,
      duration: 250,
      useNativeDriver: false
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.index]);

  return (
    <View style={{ backgroundColor: colors.secondary }}>
      <Wrapper insetBottom={insets.bottom}>
        {props.state.routeNames.map((route, index) =>
          index !== 1 ? (
            <PressableWrapper
              key={route}
              onPress={() => {
                const isFocused = props.state.index === index;
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true
                });
                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route);
                }
              }}
            >
              <Icon name={route} size={24} color={colors.text} />
            </PressableWrapper>
          ) : (
            <PressableWrapper
              key={route}
              onPress={() => {
                props.navigation.navigate('EditorModal');
              }}
            >
              <Icon name="Add" size={40} color={colors.text} />
            </PressableWrapper>
          )
        )}
        <TabIndicatorWrapper
          style={{ left: indicatorPosition, width: tabbarWidth / 4 }}
          insetBottom={insets.bottom}
        >
          <TabIndicator style={{ backgroundColor: colors.accent }} />
        </TabIndicatorWrapper>
      </Wrapper>
    </View>
  );
};

const Tabbar: React.FC = (routeProps) => <TabbarComponent props={routeProps} />;

export default Tabbar;
