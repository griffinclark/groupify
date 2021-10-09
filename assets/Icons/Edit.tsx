import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  onPress?: () => void;
}

export const Edit: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
        <Path
          d="M18.0066 2.77541L16.1811 0.949912C15.6405 0.408813 14.9209 0.110352 14.1552 0.110352C13.3895 0.110352 12.6699 0.408374 12.1293 0.949473L1.98027 11.0976C1.93851 11.1394 1.90422 11.1864 1.87433 11.2352C1.86554 11.2493 1.85895 11.2633 1.85104 11.2783C1.82994 11.3187 1.81236 11.3605 1.79917 11.4035C1.79609 11.4128 1.78994 11.4216 1.78774 11.4312L0.0259822 17.9482C-0.0439079 18.2066 0.0294985 18.4827 0.21851 18.6717C0.360488 18.8132 0.551257 18.8906 0.746861 18.8906C0.811916 18.8906 0.87741 18.8818 0.941586 18.8646L7.17851 17.1785C7.22818 17.1886 7.27917 17.1943 7.32972 17.1943C7.52137 17.1943 7.71214 17.1213 7.85807 16.9754L18.0066 6.82771C18.5477 6.28661 18.8462 5.56662 18.8458 4.80134C18.8462 4.03607 18.5482 3.3165 18.0066 2.77541ZM7.33016 15.3904L3.56576 11.626L11.5785 3.61321L15.3433 7.37716L7.33016 15.3904ZM1.80796 17.0827L2.89367 13.0673L5.82334 15.9969L1.80796 17.0827ZM16.9499 5.77101L16.4005 6.32046L12.6357 2.5565L13.186 2.00661C13.7038 1.48881 14.6066 1.48881 15.1244 2.00661L16.9499 3.83255C17.2088 4.09145 17.3517 4.43607 17.3517 4.80222C17.3517 5.16837 17.2093 5.51211 16.9499 5.77101Z"
          fill="#2C2C2C"
        />
      </Svg>
    </TouchableOpacity>
  );
};