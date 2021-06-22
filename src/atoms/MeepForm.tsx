import React, { ReactChild } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { DK_PURPLE, GREY_5, WHITE } from '../res/styles/Colors'
import { globalStyles } from '../res/styles/GlobalStyles';

interface Props {
    children: ReactChild;
    InputList: { title: string; placeholder: string }[];
}

export const MeepForm: React.FC<Props> = ({children, InputList }: Props) => {

    const ListItems = InputList.map(item => {
        return (
            <View>
                <Text style={[globalStyles.title, { color: DK_PURPLE }]}>{item.title}</Text>
                <TextInput
                style={styles.textInputBody}
                // onChangeText={handleChange(input)}
                placeholder={item.placeholder}
                // value={}
                />
                <View style={{ height: 15 }} />
            </View>
        );
    })

    return (
        <View style={styles.formContainer}>
            {ListItems}
            {children}  
        </View>
    );
};

const styles = StyleSheet.create({
    textInputBody: {
        fontSize: 16,
        backgroundColor: WHITE,
        borderRadius: 10,
        padding: 7,
        marginTop: 5,
      },
    formContainer: {
        backgroundColor: GREY_5,
        borderRadius: 10,
        margin: 10,
        padding: 20,
      },
})