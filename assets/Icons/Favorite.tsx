import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import { GREY_8, YELLOW_0 as YELLOW } from '../../src/res/styles/Colors';
import { GREY_4, TEAL_0 } from './../../src/res/styles/Colors';

interface Props {
  favorited: boolean;
  onPress?: () => void;
}

export const FavoriteIcon: React.FC<Props> = ({ favorited, onPress }: Props) => {
  const starColor = favorited ? YELLOW : GREY_4;
  const ringColor = favorited ? TEAL_0 : GREY_8;
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg style={{ alignSelf: 'center' }} width="35" height="35" viewBox="0 0 35 35" fill="none">
        <Path
          d="M33.75 17.5C33.75 26.4746 26.4746 33.75 17.5 33.75C8.52537 33.75 1.25 26.4746 1.25 17.5C1.25 8.52537 8.52537 1.25 17.5 1.25C26.4746 1.25 33.75 8.52537 33.75 17.5Z"
          stroke={ringColor}
          stroke-width="2.5"
        />
        <Path
          d="M16.2636 6.80517C16.6528 5.60746 18.3472 5.60746 18.7364 6.80517L20.4636 12.121C20.6376 12.6566 21.1368 13.0193 21.7 13.0193L27.2893 13.0193C28.5487 13.0193 29.0723 14.6308 28.0535 15.371L23.5316 18.6563C23.0759 18.9874 22.8853 19.5741 23.0593 20.1098L24.7865 25.4256C25.1757 26.6233 23.8048 27.6192 22.786 26.879L18.2641 23.5937C17.8085 23.2626 17.1915 23.2626 16.7359 23.5937L12.214 26.879C11.1952 27.6192 9.82433 26.6233 10.2135 25.4256L11.9407 20.1098C12.1147 19.5741 11.9241 18.9874 11.4684 18.6563L6.94654 15.371C5.92772 14.6308 6.45133 13.0193 7.71067 13.0193L13.3 13.0193C13.8632 13.0193 14.3624 12.6566 14.5364 12.121L16.2636 6.80517Z"
          fill={starColor}
        />
      </Svg>
    </TouchableOpacity>
  );
};
