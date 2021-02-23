import React, {useState} from "react"
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { DARK, SECONDARY } from "../res/styles/Colors";
import { globalStyles } from './../res/styles/GlobalStyles';
import { LIGHT, PRIMARY } from '../res/styles/Colors';

interface Props {
    title: string,
    onPress: any // callback to parent
}

export default function Tag({title, onPress}:Props) {
    const [pressed, setPressed] = useState(false)

    const tagPressed = ()=>{
        // TODO test to make sure this works as intended
        setPressed(!pressed)
        onPress()
    }

    const getColor = ()=>{
        if(pressed){
            return 'black'
        } else {
            return 'green'
        }
    }

    return(

        <View>
            <Button 
            title={title}
            onPress={tagPressed}
            color={getColor()}
            // TODO change text color to make tags look like Tinder and Bumble
            />
        </View>
    )
}
