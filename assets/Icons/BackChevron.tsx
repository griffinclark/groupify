import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
  onPress?: () => void;
  testID?: string;
  height?: string;
  width?: string;
}

export const BackChevronIcon: React.FC<Props> = ({ onPress, testID, height = '34', width = '19' }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID} hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
      <View>
        <Svg style={{ alignSelf: 'center' }} width={width} height={height} viewBox="0 0 19 34" fill="none">
          <Path
            d="M16.875 2L1.875 17L16.875 32"
            stroke="black"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};
