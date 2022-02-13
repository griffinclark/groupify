import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const ContactIcon: React.FC = () => {
  return (
    <Svg style={{ alignSelf: 'center' }} width="33" height="25" viewBox="0 0 26 20" fill="none">
      <G clipPath="url(#clip0_1049_7690)">
        <Path
          d="M9.30069 11.9505C11.0403 11.9505 12.4505 10.5403 12.4505 8.80069C12.4505 7.0611 11.0403 5.65088 9.30069 5.65088C7.5611 5.65088 6.15088 7.0611 6.15088 8.80069C6.15088 10.5403 7.5611 11.9505 9.30069 11.9505Z"
          stroke="white"
          strokeWidth="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        />
        <Path
          d="M18.2254 9.85076C19.6751 9.85076 20.8503 8.67557 20.8503 7.22591C20.8503 5.77626 19.6751 4.60107 18.2254 4.60107C16.7758 4.60107 15.6006 5.77626 15.6006 7.22591C15.6006 8.67557 16.7758 9.85076 18.2254 9.85076Z"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        />
        <Path
          d="M9.30059 15.1001C7.62983 15.1001 6.0275 15.7638 4.84609 16.9452C3.66468 18.1266 3.00098 19.729 3.00098 21.3997H15.6002C15.6002 19.729 14.9365 18.1266 13.7551 16.9452C12.5737 15.7638 10.9714 15.1001 9.30059 15.1001Z"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        />
        <Path
          d="M18.7504 18.2509H24.0001C23.914 17.3087 23.5978 16.4021 23.0792 15.6108C22.5606 14.8195 21.8555 14.1677 21.026 13.7128C20.1964 13.2579 19.2678 13.0138 18.3218 13.0019C17.3757 12.9901 16.4413 13.2108 15.6006 13.6448"
          stroke="white"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1049_7690">
          <Rect width="25" height="25" fill="white" transform="translate(0.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
