import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { Divider } from 'react-native-elements';
import { Checkbox } from 'react-native-paper';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { AvailabilityItem } from './AvailabilityItem';
import Dots from 'react-native-dots-pagination';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';
import { AvailabilityTime } from '../models';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  // selected: boolean;
}
enum Day {
  Mon = 'Mon',
  Tues = 'Tues',
  Wed = 'Wed',
  Thur = 'Thur',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun',
}

export const AvailablityScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [selected, setSelected] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(Day.Mon);
  const [dayCard, setDayCard] = useState<JSX.Element[]>([]);
  const [activeState, setActiveState] = useState(2);
  const [user, SetUser] = useState<User>();
  const [availableTime, setAvailableTime] = useState<any>({
    Mon: [],
    Tues: [],
    Wed: [],
    Thur: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });

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
    const dayTab: JSX.Element[] = [];

    for (const dayType in Day) {
      const dayTypeEnum: Day = Day[dayType as keyof typeof Day];
      dayTab.push(
        <TouchableOpacity
          onPress={() => {
            setSelectedDay(dayTypeEnum);
          }}
          key={dayTypeEnum}
          style={{
            borderRadius: 4,
            width: 48,
            height: 47,
            alignItems: 'center',
            backgroundColor: selectedDay === dayTypeEnum ? '#3F8A8D' : '#FFFFFF',
          }}
        >
          <Text
            style={{
              lineHeight: 23.12,
              fontSize: 16,
              fontFamily: JOST['400'],
              marginHorizontal: 8,
              marginVertical: 12,
              color: selectedDay === dayTypeEnum ? WHITE : '#006862',
            }}
          >
            {dayTypeEnum}
          </Text>
        </TouchableOpacity>,
      );
      setDayCard(dayTab);
    }
  }, [selectedDay]);

  const handlePress = () => {
    setSelected(!selected);
  };

  const handleNext = async () => {
    // setActiveState(activeState + 1);
    const availability = await DataStore.save(
      new AvailabilityTime({
        Sun: availableTime.Sun,
        Mon: availableTime.Mon,
        Tues: availableTime.Tues,
        Wed: availableTime.Wed,
        Thur: availableTime.Thur,
        Fri: availableTime.Fri,
        Sat: availableTime.Sat,
      }),
    );
    await DataStore.save(
      User.copyOf(user, (updated) => {
        updated.availability = availability;
      }),
    );
    navigation.navigate('Hobby', {});
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={true}
        route={route}
        targetScreen={'Gender'}
      />
      <View style={{ backgroundColor: WHITE }}>
        <LinearGradient colors={['#fff', '#ccc']} style={styles.gradientStyle} />
        <Text style={{ marginTop: 34, marginLeft: 20, fontSize: 20, fontFamily: JOST['400'] }}>
          When are you usually free to hang out?
        </Text>

        <View style={{ backgroundColor: WHITE, borderRadius: 12, marginTop: 34 }}>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: WHITE,
            }}
          >
            {dayCard}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 20 }}>
        <Checkbox.Android
          status={selected ? 'checked' : 'unchecked'}
          onPress={handlePress}
          color="#3F8A8D"
          uncheckedColor="#3F8A8D"
        />
        <Text style={{ fontSize: 12, fontFamily: JOST['500'], lineHeight: 17.34 }}>
          Apply Same Times To Every Week Day
        </Text>
      </View>
      <Divider color="#8B8B8B" style={{ width: 360, alignSelf: 'center', marginTop: 15 }} orientation="horizontal" />
      <View>
        <AvailabilityItem
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
          allSelected={selected}
          day={selectedDay}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 68, alignSelf: 'center' }}>
        <Dots activeColor="#3F8A8D" length={4} active={activeState} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity style={{ marginHorizontal: 21, alignItems: 'center' }}>
          <Text style={{ fontFamily: JOST['500'], fontSize: 20, lineHeight: 28.9, color: '#3F8A8D' }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: '#3F8A8D',
            width: 222,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontFamily: JOST['500'], fontSize: 20, lineHeight: 28.9, color: WHITE }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    height: 80,
  },
});
