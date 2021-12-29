import React, { JSXElementConstructor, useEffect, useState } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { BLACK, GREY_3, GREY_4, GREY_6 } from '../res/styles/Colors';

interface Props {
  onInputChange: (input: string) => void;
  placeholder?: string;
  onPressIn?: () => void;
  onPressOut?: () => void;
  leftIcon: JSX.Element;
  defaultValue?: string;
  selectTextOnFoucs?: boolean;
}

export const SearchBar: React.FC<Props> = ({
  placeholder,
  onPressIn,
  onPressOut,
  onInputChange,
  leftIcon,
  defaultValue,
}: Props) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    onInputChange(input);
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
          testID="SearchBar"
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          defaultValue={defaultValue}
        />
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
