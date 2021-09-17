import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREY_3, GREY_4, WHITE } from '../res/styles/Colors';
import { AppText } from './AppText';

interface Props {
  onPress: (ev?: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  disabled?: boolean;
}

export const FormButton: React.FC<Props> = ({ onPress, title, disabled = false }: Props) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <View style={buttonStyles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={[buttonStyles.button, disabled ? buttonStyles.disabledButton : buttonStyles.enabledButton]}
      >
        <AppText style={[buttonStyles.text, disabled ? buttonStyles.disabledButton : buttonStyles.enabledButton]}>
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
    fontSize: 16,
  },
  enabledButton: {
    backgroundColor: '#32A59F',
    color: WHITE,
  },
  disabledButton: {
    backgroundColor: GREY_4,
    color: GREY_3,
  },
});
