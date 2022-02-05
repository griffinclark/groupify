import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

interface Props {
  onPress?: () => void;
  height?: number;
  width?: number;
}

export const CloseIcon: React.FC<Props> = ({ onPress, height = 20, width = 20 }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M18.4375 1.5625L1.5625 18.4375"
          stroke="black"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.4375 18.4375L1.5625 1.5625"
          stroke="black"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};
