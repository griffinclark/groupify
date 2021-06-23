import React, { ReactChild, useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { DK_PURPLE, GREY_5, WHITE } from '../res/styles/Colors'
import { globalStyles } from '../res/styles/GlobalStyles';

interface Props {
    children: ReactChild;
    InputList: { title: string; placeholder: string }[];
    updatedValues: (e: { title: string, value: string }[]) => void;
}

export const MeepForm: React.FC<Props> = ({children, InputList, updatedValues }: Props) => {
    const [values, setValues] = useState<{ title: string, value: string }[]>([])

    useEffect(() => {
        const itemsArray = []
        for (let i = 0; i < InputList.length; i++) {
            const element = InputList[i];
            itemsArray.push({
                title: element.title,
                value: '',
            })  
        }
        setValues(itemsArray);
    }, [])

    const setValue = (e: string, item: { title: string; placeholder: string }) => {
        for (let i = 0; i < values.length; i++) {
            const element = values[i];
            if ( element.title == item.title ) {
                element.value = e;
                updatedValues(values);
                return;
            }
        }
    }

    const ListItems = InputList.map(item => {

        return (
            <View key={item.title}>
                <Text style={[globalStyles.title, { color: DK_PURPLE }]}>{item.title}</Text>
                <TextInput
                style={styles.textInputBody}
                onChangeText={(e) => setValue(e, item)}
                placeholder={item.placeholder}
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