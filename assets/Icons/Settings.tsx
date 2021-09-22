import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface Props {
  onPress?: () => void;
}

export const SettingsIcon: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg style={{ alignSelf: 'center' }} width="30" height="30" viewBox="0 0 30 30" fill="none">
        <G clip-path="url(#clip0)">
          <Path
            d="M4.6875 14.0625V0.9375"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M4.6875 29.0625V25.3125"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M15 3.75V0.9375"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M15 29.0625V15"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M4.6875 25.3125C6.75857 25.3125 8.4375 23.6336 8.4375 21.5625C8.4375 19.4914 6.75857 17.8125 4.6875 17.8125C2.61643 17.8125 0.9375 19.4914 0.9375 21.5625C0.9375 23.6336 2.61643 25.3125 4.6875 25.3125Z"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M25.3125 14.0625V0.9375"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M25.3125 29.0625V25.3125"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M25.3125 25.3125C27.3836 25.3125 29.0625 23.6336 29.0625 21.5625C29.0625 19.4914 27.3836 17.8125 25.3125 17.8125C23.2414 17.8125 21.5625 19.4914 21.5625 21.5625C21.5625 23.6336 23.2414 25.3125 25.3125 25.3125Z"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M15 15C17.0711 15 18.75 13.3211 18.75 11.25C18.75 9.17893 17.0711 7.5 15 7.5C12.9289 7.5 11.25 9.17893 11.25 11.25C11.25 13.3211 12.9289 15 15 15Z"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="30" height="30" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </TouchableOpacity>
  );
};
