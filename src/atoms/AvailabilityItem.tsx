import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { JOST } from '../res/styles/Fonts';
import { TimeBox } from './TimeBox';

const data1 = ['6.00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];
const data2 = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30'];
export const AvailabilityItem: React.FC = () => {
  return (
    <ScrollView style={{ marginHorizontal: 20, marginTop: 24, height: 400 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.text}>Early</Text>
          {data1.map((item, index) => (
            <TimeBox item={item} key={index} />
          ))}
        </View>
        <View>
          <Text style={styles.text}>Mid Day</Text>
          {data2.map((item, index) => (
            <TimeBox item={item} key={index} />
          ))}
        </View>
        <View>
          <Text style={styles.text}>Evening</Text>
          {data1.map((item, index) => (
            <TimeBox item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: JOST['500'],
    fontSize: 12,
    lineHeight: 17.34,
  },
});
