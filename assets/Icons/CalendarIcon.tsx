import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  height?: number;
  width?: number;
  onPress?: () => void;
}

export const CalendarIcon: React.FC<Props> = ({ onPress, height = 21, width = 21 }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={width} height={height} viewBox="0 0 23 23" fill="none">
        <Path
          d="M0.999268 8.63623H21.9999"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <Path
          d="M20.0908 2.90869H2.90842C1.85402 2.90869 0.999268 3.76345 0.999268 4.81784V20.091C0.999268 21.1454 1.85402 22.0002 2.90842 22.0002H20.0908C21.1452 22.0002 21.9999 21.1454 21.9999 20.091V4.81784C21.9999 3.76345 21.1452 2.90869 20.0908 2.90869Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <Path
          d="M5.77219 0.999512L5.77124 4.81757"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <Path
          d="M17.227 0.999512L17.2261 4.81757"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </Svg>
    </TouchableOpacity>
  );
};
