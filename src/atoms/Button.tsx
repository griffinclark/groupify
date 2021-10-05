import React from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREY_3, GREY_4, WHITE, TEAL } from '../res/styles/Colors';
import { AppText } from './AppText';

interface Props {
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  title: string;
  disabled?: boolean;
  containerStyle?: Record<string, unknown>;
  buttonStyle?: Record<string, unknown>;
  textStyle?: Record<string, unknown>;
  testID?: string;
}
export const Button: React.FC<Props> = ({
  onPress,
  title,
  disabled = false,
  containerStyle,
  buttonStyle,
  textStyle,
  testID,
}: Props) => {
  return (
    <View style={[buttonStyles.container, containerStyle]} testID={testID}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          buttonStyles.button,
          buttonStyles.enabledButton,
          buttonStyle,
          disabled ? buttonStyles.disabledButton : {},
        ]}
      >
        <AppText
          style={[
            buttonStyles.enabledButton,
            textStyle ? textStyle : { fontSize: 16 },
            buttonStyles.text,
            disabled ? buttonStyles.disabledButton : {},
          ]}
        >
          {title}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export const buttonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 'auto',
    minWidth: 150,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    borderWidth: 0,
  },
  enabledButton: {
    backgroundColor: TEAL,
    color: WHITE,
  },
  disabledButton: {
    backgroundColor: GREY_4,
    color: GREY_3,
    borderColor: GREY_4,
  },
});
