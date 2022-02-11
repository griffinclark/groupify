import React, { useEffect, useState, createRef } from 'react';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import { BLACK, GREY_6 } from '../res/styles/Colors';
import { CloseIcon } from '../../assets/Icons/Close';

interface Props {
  onChangeText: (input: string) => void;
  placeholder?: string;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onSubmitEditing?: () => void;
  defaultValue?: string;
  autoFocus?: boolean;
  selectTextOnFoucs?: boolean;
  selectTextOnFocus?: boolean;
  testID: string;
}

type SearchFieldProps = TextInputProps & {
  leftIcon?: JSX.Element;
  hideClose?: boolean;
};

export const SearchBar: React.FC<SearchFieldProps> = ({
  leftIcon,
  hideClose = false,
  ...props
}: SearchFieldProps) => {
  const [input, setInput] = useState<string>('');

  const localOnChangeText = (t: string) => {
    setInput(t);
    props.onChangeText && props.onChangeText(t);
  }

  return (
    <View>
      <View style={styles.searchSection}>
        {leftIcon}
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={(t:string) => localOnChangeText(t)}
          underlineColorAndroid="transparent"
          value={input}
        />

        {!hideClose && <CloseIcon onPress={() => localOnChangeText('')} height={15} width={15} />}
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
