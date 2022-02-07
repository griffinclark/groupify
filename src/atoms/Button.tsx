import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREY_3, GREY_4, WHITE, TEAL_0 } from '../res/styles/Colors';
import { AppText } from './AppText';

interface Props {
  onPress?: () => void;
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
        style={[
          buttonStyles.button,
          buttonStyles.enabledButton,
          buttonStyle,
          disabled ? buttonStyles.disabledButton : {},
        ]}
        onPress={onPress}
        disabled={disabled}
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
    backgroundColor: TEAL_0,
    color: WHITE,
  },
  disabledButton: {
    backgroundColor: GREY_4,
    color: GREY_3,
    borderColor: GREY_4,
  },
});