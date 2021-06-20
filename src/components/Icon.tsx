import React from 'react';

import * as Svg from '../../assets/icons';

interface Props {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const Icon: React.FC<Props> = ({ name, size = 22, color = 'white', style }) => {
  const SvgIcon = (Svg as any)[name];
  return <SvgIcon style={style} width={size} height={size} color={color} />;
};

export default Icon;
