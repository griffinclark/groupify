import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

interface Props {
  onPress?: () => void;
}

export const BackChevronIcon: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg style={{ alignSelf: 'center' }} width="19" height="34" viewBox="0 0 19 34" fill="none">
        <Path
          d="M16.875 2L1.875 17L16.875 32"
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
