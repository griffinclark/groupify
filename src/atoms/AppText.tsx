import React, { ReactNode } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, Text } from 'react-native';

import { TextStyles } from '../res/styles/TextStyles';

interface Props {
  children: string | ReactNode;
  maxFontSizeMultiplier?: number;
  numberOfLines?: number;
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const AppText: React.FC<Props> = ({
  children,
  maxFontSizeMultiplier = 1.5,
  numberOfLines,
  onPress,
  style,
}: Props) => {
  console.log(typeof children);
  return (
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[TextStyles, style]}
    >
      {children}
    </Text>
  );
};
