import React, { JSXElementConstructor, useEffect, useState } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { BLACK, GREY_3, GREY_4, GREY_6 } from '../res/styles/Colors';

interface Props {
  onChangeText: (input: string) => void;
  placeholder?: string;
  onPressIn?: () => void;
  onPressOut?: () => void;
  leftIcon: JSX.Element;
  defaultValue?: string;
  autoFocus?: boolean;
  selectTextOnFoucs?: boolean;
  selectTextOnFocus?: boolean;
  testID: string;
}

export const SearchBar: React.FC<Props> = ({
  placeholder,
  onPressIn,
  onPressOut,
  onChangeText,
  leftIcon,
  autoFocus,
  defaultValue,
  selectTextOnFocus,
  testID,
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
          autoFocus={autoFocus}
          selectTextOnFocus={selectTextOnFocus}
          // TODO selectTextOnFocus not working
          onPressOut={onPressOut}
          defaultValue={defaultValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    width: 334,
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
