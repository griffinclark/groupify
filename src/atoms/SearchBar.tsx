import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';

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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    width: '85%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#C5C5C5',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
    color: '#424242',
  },
});
