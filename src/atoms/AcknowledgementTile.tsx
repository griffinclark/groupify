import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { TEAL_8 } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';

interface Props {
  name: string;
  title?: string;
  country: string;
  linkedIn: string;
}

export const AcknowledgementTile: React.FC<Props> = ({ name, title, country, linkedIn }: Props) => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <TouchableOpacity onPress={() => Linking.openURL(linkedIn)} style={styles.staff}>
        <CountryFlag isoCode={country} size={15} />
        <Text numberOfLines={2} style={styles.text2}>
          {name}
        </Text>
        {title && (
          <Text style={styles.text1}>
            {' '}
            {'- '} {title}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  staff: {
    flexDirection: 'row',
    fontSize: 16,
    fontFamily: JOST['500'],
    marginHorizontal: 10,
    marginBottom: 40,
    alignItems: 'center',
  },
  text1: {
    fontFamily: JOST['500'],
    fontSize: 16,
  },
  text2: {
    marginHorizontal: 20,
    fontFamily: JOST['500'],
    fontSize: 16,
    color: TEAL_8,
  },
});
