import React from "react"
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';

interface Props {
    imageURI: string,
    username: string,
    isCheckbox: boolean // does this user tile need to be selectable?
}

export default function UserDisplayTile({imageURI, username, isCheckbox}: Props){
    return(
        <View>
            <View style={styles.rowContainer}>
                <View style={styles.rowContainer} >
                    <Text>{username}</Text>
                </View>
                <View style={styles.rowContainer} >
                    <Text> Hello world</Text>
                </View>
                {isCheckbox}
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    rowContainer: {
        // container used to hold row
        flexDirection: "row"
    },
    column: {
        // a container put inside fo rowContainer
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
    }
})