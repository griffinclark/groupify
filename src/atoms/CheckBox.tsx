import React from "react"
import { View, StyleSheet, TextInput } from 'react-native';
// import {CheckBox as RNCheckBox} from 'react-native'  // Technically this is depreciated but... like... do I have to care?
import RNCheckBox from "react-native-check-box";
import { DARK } from "../res/styles/Colors";
import { globalStyles } from './../res/styles/GlobalStyles';
import { LIGHT } from '../res/styles/Colors';

interface Props{
  isSelected: boolean,
  onValueChange: any
}

export default function CheckBox({isSelected, onValueChange}: Props){
  return(
    <View>
      <RNCheckBox
      isChecked={isSelected}
      onClick={onValueChange}
      style={styles.checkbox}
      />
    </View>
  )
}

let styles = StyleSheet.create({
  checkbox: {
    flex: 1,
    padding: 10
    // TODO style
  }
})