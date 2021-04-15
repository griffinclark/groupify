import React from "react";
import { 
    Button as ReactButton,
    NativeSyntheticEvent, 
    NativeTouchEvent,
    StyleSheet,
    Text,
    View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GREY_3, GREY_4, LT_PURPLE, WHITE } from "../res/styles/Colors";

interface ButtonProps {
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
    title: string,
    disabled?: boolean
}
export const Button = ({onPress, title, disabled = false}: ButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                style={[styles.button, 
                    disabled ? styles.disabledButton: styles.enabledButton]}
            >
                <Text style={[styles.text, 
                disabled ? styles.disabledButton : styles.enabledButton]}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
};

const disabledStyles = StyleSheet.create({
});
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        // borderColor: 'red',
        // borderWidth: 2,
        // borderStyle: 'solid'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 'auto',
        width: 150,
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold'
    },
    enabledButton: {
        backgroundColor: LT_PURPLE,
        color: WHITE,
    },
    disabledButton: {
        backgroundColor: GREY_4,
        color: GREY_3
    }
})