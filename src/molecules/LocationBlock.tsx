import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../atoms/AppText';
import { TEAL } from '../res/styles/Colors';
import { formatDayOfWeekDate } from '../res/utilFunctions';

interface Props {
    locationName: String;
    locationAddress: String;
    planName?: String,
    date?: String,
    time?: String
}

export const LocationBlock: React.FC<Props> = ({ locationName, locationAddress, planName, date, time }: Props) => {
    const locationAddressArr = locationAddress.split(",");
    return (
        <View style={styles.locationBlock}>
            {locationName ? <AppText style={[styles.text, styles.locationName]}>{locationName}</AppText> : null}
            {planName ? <AppText style={styles.text}>{planName}</AppText> : null}
            <AppText style={styles.text}>{locationAddressArr[0]} , {locationAddressArr[1]}</AppText>
            {(date && time) ? <AppText style={styles.text}>{formatDayOfWeekDate(date)} at {time}</AppText> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    locationBlock: {
        alignItems: 'center',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    text: {
        fontSize: 16,
        marginBottom: 3
    },
    locationName: {
        color: TEAL
    }
});