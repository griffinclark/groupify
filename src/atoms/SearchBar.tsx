import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TEAL } from '../res/styles/Colors';

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
        <Icon style={styles.searchIcon} name="search" type="material" size={20} color={TEAL} />
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
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,
    color: '#424242',
  },
});
