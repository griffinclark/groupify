import React from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREY_3, GREY_4, LT_PURPLE, WHITE } from '../res/styles/Colors';

interface ButtonProps {
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  title: string;
  disabled?: boolean;
}
export const FormButton: React.FC<ButtonProps> = ({ onPress, title, disabled = false }: ButtonProps) => {
  return (
    <View style={buttonStyles.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[buttonStyles.button, disabled ? buttonStyles.disabledButton : buttonStyles.enabledButton]}
      >
        <Text style={[buttonStyles.text, disabled ? buttonStyles.disabledButton : buttonStyles.enabledButton]}>
          {title}
        </Text>
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
    fontSize: 16,
  },
  enabledButton: {
    backgroundColor: LT_PURPLE,
    color: WHITE,
  },
  disabledButton: {
    backgroundColor: GREY_4,
    color: GREY_3,
  },
});
