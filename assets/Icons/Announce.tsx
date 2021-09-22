import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface Props {
  onPress?: () => void;
}

export const AnnounceIcon: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg style={{ alignSelf: 'center' }} width="30" height="30" viewBox="0 0 30 30" fill="none">
        <G clipPath="url(#clip0)">
          <Path
            d="M13.8537 19.4526L18.2756 25.4964C18.629 25.981 18.7849 26.5872 18.7091 27.1818C18.6332 27.7764 18.3318 28.3108 17.8711 28.6677V28.6677C17.4096 29.0238 16.8269 29.173 16.2508 29.0827C15.6746 28.9924 15.152 28.6699 14.7977 28.186L8.06851 19.04"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M24.203 20.072C26.6098 19.4271 27.4729 14.8437 26.1307 9.83472C24.7886 4.82574 21.7494 1.28797 19.3426 1.93288C16.9358 2.57778 16.0727 7.16116 17.4148 12.1701C18.757 17.1791 21.7961 20.7169 24.203 20.072Z"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M19.9214 8.84717C20.5519 8.67824 21.2263 8.77684 21.7964 9.12126C22.3665 9.46569 22.7855 10.0277 22.9613 10.6838C23.1371 11.3398 23.0552 12.036 22.7337 12.6193C22.4122 13.2027 21.8774 13.6253 21.247 13.7942"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M18.528 2.34113L3.85347 12.2691C3.20037 12.6366 2.69481 13.2293 2.42259 13.9466C2.15038 14.6638 2.1283 15.4615 2.36011 16.204C2.53065 16.963 2.94858 17.6427 3.54296 18.1278C4.13733 18.6129 4.87152 18.8734 5.62087 18.8651L23.2934 20.1257"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="30" height="30" fill="white" transform="translate(0 0.666504)" />
          </ClipPath>
        </Defs>
      </Svg>
    </TouchableOpacity>
  );
};
