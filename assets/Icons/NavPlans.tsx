import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const NavPlans: React.FC = () => {
  return (
    <Svg style={{ alignSelf: 'center' }} width="25" height="25" viewBox="0 0 25 25">
      <Path d="M1.0415 9.375H23.9582" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
      <Path
        d="M21.8748 3.125H3.12484C1.97424 3.125 1.0415 4.05774 1.0415 5.20833V21.875C1.0415 23.0256 1.97424 23.9583 3.12484 23.9583H21.8748C23.0254 23.9583 23.9582 23.0256 23.9582 21.875V5.20833C23.9582 4.05774 23.0254 3.125 21.8748 3.125Z"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <Path
        d="M6.25006 1.0415L6.24902 5.20817"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <Path
        d="M18.7501 1.0415L18.749 5.20817"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
    </Svg>
  );
};
