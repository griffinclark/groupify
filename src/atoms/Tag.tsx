import React, {useState} from "react"
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { DARK, SECONDARY } from "../res/styles/Colors";
import { globalStyles } from './../res/styles/GlobalStyles';
import { LIGHT, PRIMARY } from '../res/styles/Colors';

interface Props {
    title: string,
    setSelectedTags: any // callback to parent
    selectedTags: string[]
}

export default function Tag({title, setSelectedTags, selectedTags}:Props) {
    const [pressed, setPressed] = useState(false)

    const tagPressed = ()=>{
        // TODO test to make sure this works as intended
        setPressed(!pressed) // change whether the tag is pressed or not
        if(!pressed){
            // add to array
            setSelectedTags((selectedTags: string[]) => [...selectedTags, title]);
        } else {
            // remove from array
            selectedTags.filter(
                (item, pos) => {
                    if(item == title){
                        selectedTags.splice(pos, 1)
                        setSelectedTags(selectedTags)
                    }
                }
            )
        }
    }

    const getColor = ()=>{
        if(pressed){
            return 'green'
        } else {
            return 'gray'
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
