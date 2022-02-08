import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { GREY_1 } from '../../src/res/styles/Colors';

interface Props {
  onPress?: () => void;
}

export const SettingsCogIcon: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg style={{ alignSelf: 'center' }} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke={GREY_1}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <Path
          d="M20 12C19.9988 11.4239 19.9358 10.8496 19.812 10.287L22.526 8.232L20.526 4.768L17.383 6.094C16.5319 5.3137 15.5217 4.72723 14.422 4.375L14 1H10L9.578 4.375C8.47834 4.72723 7.46814 5.3137 6.617 6.094L3.474 4.768L1.474 8.232L4.188 10.287C3.93739 11.4153 3.93739 12.5847 4.188 13.713L1.474 15.768L3.474 19.232L6.617 17.906C7.46814 18.6863 8.47834 19.2728 9.578 19.625L10 23H14L14.422 19.625C15.5217 19.2728 16.5319 18.6863 17.383 17.906L20.526 19.232L22.526 15.768L19.812 13.713C19.9358 13.1504 19.9988 12.5761 20 12V12Z"
          stroke={GREY_1}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </Svg>
    </TouchableOpacity>
  );
};
