import React, {useState} from "react"
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { DARK, SECONDARY } from "../res/styles/Colors";
import { globalStyles } from './../res/styles/GlobalStyles';
import { LIGHT, PRIMARY } from '../res/styles/Colors';

interface Props {
    title: string,
    setSelectedTags: any // callback to parent
}

export default function Tag({title, setSelectedTags}:Props) {
    const [pressed, setPressed] = useState(false)

    const tagPressed = ()=>{
        // TODO test to make sure this works as intended
        setPressed(!pressed)
        setSelectedTags(title)
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
