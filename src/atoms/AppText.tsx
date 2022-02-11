import React, { ReactNode } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, Text } from 'react-native';

interface Props {
  children: string | ReactNode;
  maxFontSizeMultiplier?: number;
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const AppText: React.FC<Props> = ({ children, maxFontSizeMultiplier = 1.5, onPress, style }: Props) => {
  return (
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      ellipsizeMode="tail"
      onPress={onPress}
      style={[{ fontFamily: 'Jost_400Regular' }, style]}
    >
      {children}
    </Text>
  );
};
