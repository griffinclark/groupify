import React, { ReactNode } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, Text } from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
  children: string | ReactNode;
  maxFontSizeMultiplier?: number;
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const AppText: React.FC<Props> = ({ children, maxFontSizeMultiplier = 1.5, onPress, style }: Props) => {
  const [fontsLoaded] = useFonts({
    'Brandon-Grotesque': require('../../assets/fonts/Brandon_reg.otf'),
  });

  if (!fontsLoaded) return null;
  return (
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      ellipsizeMode="tail"
      onPress={onPress}
      style={[{ fontFamily: 'Brandon-Grotesque' }, style]}
    >
      {children}
    </Text>
  );
};
