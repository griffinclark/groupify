import React, { ReactNode } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, Text } from 'react-native';
import { useFonts } from 'expo-font';

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
  const [fontsLoaded] = useFonts({
    'Brandon-Grotesque': require('../../assets/fonts/Brandon_reg.otf'),
  });

  if (!fontsLoaded) return null;
  return (
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[TextStyles, { fontFamily: 'Brandon-Grotesque' }, style]}
    >
      {children}
    </Text>
  );
};
