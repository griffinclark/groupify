import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  children: any;
}

export const MapIcon: React.FC<Props> = ({ children }: Props) => {
  return (
    <Svg style={{ alignSelf: 'center' }} width="60" height="75" viewBox="0 0 60 75" fill="none">
      <G>
        <Path
          d="M30 10C21.1616 10 14 17.1691 14 26.0493C14 41.4039 30 55 30 55C30 55 46 41.4007 46 26.0493C46 17.1723 38.8384 10 30 10Z"
          fill="white"
        />
        <Path
          d="M30 55L28.7049 56.5241L30.0002 57.6247L31.2953 56.5239L30 55ZM30 55C31.2953 56.5239 31.2957 56.5235 31.2963 56.523L31.2977 56.5219L31.3015 56.5186L31.3136 56.5083L31.3547 56.4728C31.3896 56.4426 31.4392 56.3994 31.5026 56.3435C31.6293 56.2317 31.8112 56.0691 32.0404 55.8586C32.4986 55.4378 33.1466 54.8247 33.9211 54.0425C35.4681 52.4803 37.5314 50.232 39.5984 47.4835C43.6879 42.0458 48 34.3762 48 26.0493C48 16.0727 39.9479 8 30 8C20.0524 8 12 16.0692 12 26.0493C12 34.3777 16.3121 42.0474 20.4016 47.4848C22.4687 50.2331 24.532 52.4811 26.079 54.0431C26.8536 54.8252 27.5016 55.4382 27.9597 55.8589C28.1889 56.0694 28.3708 56.2319 28.4976 56.3437C28.561 56.3996 28.6106 56.4428 28.6455 56.473L28.6866 56.5084L28.6987 56.5187L28.7025 56.522L28.7039 56.5232C28.7044 56.5237 28.7049 56.5241 30 55Z"
          stroke="#31A59F"
          stroke-width="4"
        />
        {children}
      </G>
    </Svg>
  );
};
{
  /* <defs>
<filter id="filter0_d_238:48162" x="0" y="0" width="60" height="74.2495" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_238:48162"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_238:48162" result="shape"/>
</filter>
</defs>
</svg> */
}
