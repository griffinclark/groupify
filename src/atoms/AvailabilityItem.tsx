import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { JOST } from '../res/styles/Fonts';
import { TimeBox } from './TimeBox';
import { User } from '../models';
import { Auth } from 'aws-amplify';
import { AvailabilityTime } from '../models';

interface Props {
  day: string;
  allSelected: boolean;
  availableTime: any;
  setAvailableTime: (availableTime: AvailabilityTime) => void;
}

const data1 = ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];
const data2 = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30'];

export const AvailabilityItem: React.FC<Props> = ({ day, allSelected, setAvailableTime, availableTime }: Props) => {
  const [user, SetUser] = useState<User>();

  const handlePress = async (item: string, removed: boolean) => {
    if (removed) {
      for (let i = 0; i < availableTime[day].length; i++) {
        if (availableTime[day][i] === item) {
          availableTime[day].splice(i, 1);
        }
      }
    } else {
      for (const key in availableTime) {
        if (allSelected) {
          if (key) {
            availableTime[key].push(item);
          }
        } else {
          if (key === day) {
            availableTime[key].push(item);
          }
        }
      }
    }

    setAvailableTime({ ...availableTime });
  };

  useEffect(() => {
    const loadDatastore = async () => {
      const userInfo = await Auth.currentUserInfo();
      const users = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number), {
        limit: 1,
      });
      console.log('users', users);
      if (users.length === 1) {
        SetUser(users[0]);
      }
    };
    loadDatastore();
  }, []);

  return (
    <ScrollView style={{ marginHorizontal: 20, marginTop: 24, height: 400 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.text}>Early</Text>
          {data1.map((item, index) => (
            <TimeBox day={day} item={item} key={index} onPress={handlePress} />
          ))}
        </View>
        <View>
          <Text style={styles.text}>Mid Day</Text>
          {data2.map((item, index) => (
            <TimeBox day={day} item={item} key={index} onPress={handlePress} />
          ))}
        </View>
        <View>
          <Text style={styles.text}>Evening</Text>
          {data1.map((item, index) => (
            <TimeBox day={day} item={item} key={index} onPress={handlePress} />
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
