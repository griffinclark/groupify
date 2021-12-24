import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { GREY_3, GREY_4, GREY_6 } from '../res/styles/Colors';

interface Props {
  onInputChange: (input: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({ onInputChange, placeholder = 'search' }: Props) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    onInputChange(input);
  }, [input]);

  return (
    <View>
      <View style={styles.searchSection}>
        <MagnifyingGlassIcon />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(e) => setInput(e)}
          underlineColorAndroid="transparent"
          testID="SearchBar"
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
    color: GREY_3,
  },
});
