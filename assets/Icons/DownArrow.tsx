import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  onPress?: () => void;
}

export const DownArrow: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width="22" height="21" viewBox="0 0 22 21" fill="none">
        <Path
          d="M3.125 9.51563L11 17.3906L18.875 9.51563"
          stroke="black"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};
