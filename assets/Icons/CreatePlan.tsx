import Svg, { Circle, Path } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  onPress?: () => void;
}

export const CreatePlanIcon: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg style={{ alignSelf: 'center' }} width="30" height="30" viewBox="0 0 32 32" fill="none">
        <Path
          d="M16 25V7"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M25 16H7"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Circle
          cx="16"
          cy="16"
          r="15"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};
