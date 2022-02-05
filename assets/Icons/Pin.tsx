import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TEAL_0 } from '../../src/res/styles/Colors';

export const PinIcon: React.FC = () => {
  return (   
    <Svg width="16" height="23" viewBox="0 0 16 23" fill="none" testID="PinIcon">
      <Path 
      d="M8 21L7.62895 21.3351L8 21.746L8.37105 21.3351L8 21ZM8 21C8.37105 21.3351 8.37113 21.3351 8.37124 21.3349L8.37159 21.3345L8.37277 21.3332L8.37702 21.3285L8.39294 21.3107C8.39862 21.3044 8.40539 21.2968 8.41321 21.288C8.42445 21.2754 8.43786 21.2602 8.45336 21.2427C8.50592 21.1832 8.58247 21.0958 8.67959 20.9831C8.8738 20.7577 9.15041 20.4307 9.48198 20.0221C10.1447 19.2056 11.0291 18.0607 11.9145 16.7484C12.7989 15.4375 13.6905 13.9506 14.3626 12.4505C15.0316 10.957 15.5 9.41367 15.5 8C15.5 3.85386 12.1461 0.5 8 0.5C3.85386 0.5 0.5 3.85386 0.5 8C0.5 9.41367 0.968364 10.957 1.63745 12.4505C2.30947 13.9506 3.20108 15.4375 4.08552 16.7484C4.97092 18.0607 5.85533 19.2056 6.51802 20.0221C6.84959 20.4307 7.1262 20.7577 7.32041 20.9831C7.41753 21.0958 7.49408 21.1832 7.54664 21.2427C7.57292 21.2724 7.5932 21.2952 7.60706 21.3107L7.62298 21.3285L7.62723 21.3332L7.62841 21.3345L7.62876 21.3349C7.62887 21.3351 7.62895 21.3351 8 21ZM8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10Z" 
      fill={TEAL_0}
      stroke="white"/>
    </Svg>
  );
};
