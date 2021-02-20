// Author: Griffin Clark
// Init date: 1/21/2021
// Last updated: 1/21/2021

import { StyleSheet } from 'react-native';
import { PRIMARY, DARK, LIGHT } from './Colors'

export const globalStyles = StyleSheet.create({
    defaultRootContainer: {
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: LIGHT,
        flexDirection: "column",
        padding: 5
    }, 
    navbar_container: {
        // whenever you create a navbar, put it one of these 
        height: 80,
        width: "100%",
        position: "absolute",
        bottom: 0
    },
    defaultRowContainer:{
        display: "flex",
        flexDirection: "row"
    },
    defaultColumnContainer:{
        display: "flex",
        flexDirection: "column",
    },
    centerViewContainer:{
        alignSelf: "center"
    },
    spacer: {
        height: 75,
        // backgroundColor: "#f0f"
    },
    megaSpacer: {
        height: 250,
        // backgroundColor: "#f0f"
    },
    miniSpacer: {
        height:25
    }
})