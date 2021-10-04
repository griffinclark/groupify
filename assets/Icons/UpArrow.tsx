import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  onPress?: () => void;
}

export const UpArrow: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width="22" height="21" viewBox="0 0 22 21" fill="none">
        <Path
          d="M18.875 11.4844L11 3.60937L3.125 11.4844"
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
