import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { BLACK, GREY_6 } from '../res/styles/Colors';
import { CloseIcon } from '../../assets/Icons/Close';

interface Props {
  onChangeText: (input: string) => void;
  placeholder?: string;
  onPressIn?: () => void;
  onPressOut?: () => void;
  leftIcon?: JSX.Element;
  onSubmitEditing?: () => void;
  defaultValue?: string;
  autoFocus?: boolean;
  selectTextOnFoucs?: boolean;
  selectTextOnFocus?: boolean;
  testID: string;
  hideClose?: boolean;
}

export const SearchBar: React.FC<Props> = ({
  placeholder,
  onPressIn,
  onPressOut,
  onChangeText,
  leftIcon,
  onSubmitEditing,
  autoFocus,
  defaultValue,
  selectTextOnFocus,
  testID,
  hideClose = false,
}: Props) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    onChangeText(input);
  }, [input]);

  return (
    <View>
      <View style={styles.searchSection}>
        {leftIcon}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(e) => setInput(e)}
          underlineColorAndroid="transparent"
          testID={testID}
          onPressIn={onPressIn}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          selectTextOnFocus={selectTextOnFocus}
          // TODO selectTextOnFocus not working
          onPressOut={onPressOut}
          defaultValue={defaultValue}
        />

        {!hideClose && <CloseIcon onPress={() => setInput('')} height={15} width={15} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: GREY_6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
    color: BLACK,
  },
});
