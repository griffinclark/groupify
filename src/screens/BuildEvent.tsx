import React from 'react'
import { View, StyleSheet } from 'react-native'
import { globalStyles } from './../res/styles/GlobalStyles';
import Navbar from './../organisms/Navbar';
import TagSelector from '../organisms/TagSelector';

interface Props {
    navigation: any
}
export default function BuildEvent({navigation}: any){
    return(
        <View style={globalStyles.defaultRootContainer}>
            <Navbar />
            <View>
                <TagSelector  tags={null}/>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    
})