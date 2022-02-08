import React from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

interface Props {
  onPress?: () => void;
  testID?: string;
  height?: string;
  width?: string;
}

export const BackChevronIcon: React.FC<Props> = ({ onPress, testID, height = '20', width = '15' }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={width} height={height} viewBox="0 0 19 34" fill="none" testID={testID}>
        <Path
          d="M16.875 2L1.875 17L16.875 32"
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
