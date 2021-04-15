import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native"
import { WHITE } from "../res/styles/Colors";

interface ScreenProps {
    style?: object //TODO: more specific type?
}

export const Screen: React.FC<ScreenProps> = (props) => {
    return (
        <SafeAreaView style={[styles.screen, props.style]}>
            {props.children}
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    screen: {
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: WHITE,
        flexDirection: "column",
        padding: 5
    }
});