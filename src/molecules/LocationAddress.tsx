import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../atoms/AtomsExports';

interface Props {
    formattedAddress: string | null;
}

export const LocationAddress: React.FC<Props> = ({ formattedAddress }: Props) => {
    if (!formattedAddress) return null;

    const addressArr = formattedAddress.split(',');
    const firstLine = addressArr.slice(0, -2);
    const lastLine = addressArr.slice(-2);

    return (
        <View>
            <View>
                <AppText style={styles.address}>{firstLine.join(',')}</AppText>
            </View>
            <View>
                <AppText style={styles.address}>{lastLine.join(',')}</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    address: {
        fontSize: 12,
        lineHeight: 14,
    },
});