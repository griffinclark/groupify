import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DK_PURPLE } from '../res/styles/Colors';

export const Title: React.FC = (props) => {
    return (
        <Text style={styles.title}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 45,
        color: DK_PURPLE,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 40
    }
})