import React, { ReactNode } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, Text } from 'react-native';
import { useFonts } from 'expo-font';

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
  const [fontsLoaded] = useFonts({
    'Brandon-Grotesque': require('../../assets/fonts/Brandon_reg.otf'),
    'Jost-700': require('../../assets/fonts/Jost-Bold.ttf'),
    'Jost-500': require('../../assets/fonts/Jost-Medium.ttf'),
    'Jost-400': require('../../assets/fonts/Jost-Regular.ttf'),
    'Jost-600': require('../../assets/fonts/Jost-SemiBold.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[{ fontFamily: 'Jost-400' }, style]}
    >
      {children}
    </Text>
  );
};
