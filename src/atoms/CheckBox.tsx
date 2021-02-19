import React from "react"
import { View, StyleSheet, TextInput } from 'react-native';
import {CheckBox as RNCheckBox} from 'react-native'  // Technically this is depreciated but... like... do I have to care?
import { DARK } from "../res/styles/Colors";
import { globalStyles } from './../res/styles/GlobalStyles';
import { LIGHT } from './../res/styles/Colors';

interface Props{
    isSelected: boolean,
    onValueChange: any
}

export default function CheckBox({isSelected, onValueChange}: Props){
    return(
        <View>
            <RNCheckBox 
            value={isSelected}
            onValueChange={onValueChange}
            style={styles.checkbox}
            />
        </View>
    )
}

let styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center"
        // TODO style
    }
})