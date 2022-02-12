import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../atoms/AppText';
import { TEAL_8, GREY_3 } from '../res/styles/Colors';

interface Props {
  locationName: string;
  locationAddress: string;
  planName?: string;
  date?: Date;
  time?: string;
}

export const LocationBlock: React.FC<Props> = ({ locationName, locationAddress, planName, date, time }: Props) => {
  const locationAddressArr = locationAddress.split(',');
  
  return (
    <View style={styles.locationBlock}>
      {locationName ? <AppText style={[styles.text, styles.locationName]}>{locationName}</AppText> : null}
      {planName && planName !== locationName ? <AppText style={styles.text}>{planName}</AppText> : null}
      <AppText style={styles.text}>
        {locationAddressArr[0]}, {locationAddressArr[1]}
      </AppText>
      {date && time ? (
        <AppText style={styles.text}>
          {date} at {time}
        </AppText>): null}

    </View>
  );
};

const styles = StyleSheet.create({
  locationBlock: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  text: {
    fontSize: 16,
    marginTop: 3,
    color: GREY_3,
  },
  locationName: {
    color: TEAL_8,
    fontSize: 20,
    textAlign: 'center',
  },
});
