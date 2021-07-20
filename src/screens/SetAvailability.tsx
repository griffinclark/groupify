import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataStore } from '@aws-amplify/datastore';
import { Availability, User } from '../models';
import { RoutePropParams } from '../res/root-navigation';
import { Screen, NavButton, Button, Title } from '../atoms/AtomsExports';
import { Navbar } from '../molecules/MoleculesExports';
import { globalStyles } from '../res/styles/GlobalStyles';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { user?: User }) => void;
  };
  route: RoutePropParams;
}

export const SetAvailability: React.FC<Props> = ({ navigation, route }: Props) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeToChange, setTimeToChange] = useState('');
  const [timeSunStart, setTimeSunStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeSunEnd, setTimeSunEnd] = useState(new Date('2021-01-01T00:00:00'));
  const [timeMonStart, setTimeMonStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeMonEnd, setTimeMonEnd] = useState(new Date('2021-01-01T00:00:00'));
  const [timeTuesStart, setTimeTuesStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeTuesEnd, setTimeTuesEnd] = useState(new Date('2021-01-01T00:00:00'));
  const [timeWedStart, setTimeWedStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeWedEnd, setTimeWedEnd] = useState(new Date('2021-01-01T00:00:00'));
  const [timeThursStart, setTimeThursStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeThursEnd, setTimeThursEnd] = useState(new Date('2021-01-01T00:00:00'));
  const [timeFriStart, setTimeFriStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeFriEnd, setTimeFriEnd] = useState(new Date('2021-01-01T00:00:00'));
  const [timeSatStart, setTimeSatStart] = useState(new Date('2021-01-01T00:00:00'));
  const [timeSatEnd, setTimeSatEnd] = useState(new Date('2021-01-01T00:00:00'));

  useEffect(() => {
    loadUserAvailability();
  }, []);

  const loadUserAvailability = async () => {
    const user = route.params.user;
    setUser(user);
    // console.log(user);
    if (user !== undefined && user.availability !== undefined) {
      console.log('Loading user availability');
      const availability = user.availability;
      if (availability.Sunday !== undefined && availability.Sunday.length === 2) {
        setTimeSunStart(new Date(`2021-01-01T${availability.Sunday[0]}`));
        setTimeSunEnd(new Date(`2021-01-01T${availability.Sunday[1]}`));
      }
      if (availability.Monday !== undefined && availability.Monday.length === 2) {
        setTimeMonStart(new Date(`2021-01-01T${availability.Monday[0]}`));
        setTimeMonEnd(new Date(`2021-01-01T${availability.Monday[1]}`));
      }
      if (availability.Tuesday !== undefined && availability.Tuesday.length === 2) {
        setTimeTuesStart(new Date(`2021-01-01T${availability.Tuesday[0]}`));
        setTimeTuesEnd(new Date(`2021-01-01T${availability.Tuesday[1]}`));
      }
      if (availability.Wednesday !== undefined && availability.Wednesday.length === 2) {
        setTimeWedStart(new Date(`2021-01-01T${availability.Wednesday[0]}`));
        setTimeWedEnd(new Date(`2021-01-01T${availability.Wednesday[1]}`));
      }
      if (availability.Thursday !== undefined && availability.Thursday.length === 2) {
        setTimeThursStart(new Date(`2021-01-01T${availability.Thursday[0]}`));
        setTimeThursEnd(new Date(`2021-01-01T${availability.Thursday[1]}`));
      }
      if (availability.Friday !== undefined && availability.Friday.length === 2) {
        setTimeFriStart(new Date(`2021-01-01T${availability.Friday[0]}`));
        setTimeFriEnd(new Date(`2021-01-01T${availability.Friday[1]}`));
      }
      if (availability.Saturday !== undefined && availability.Saturday.length === 2) {
        setTimeSatStart(new Date(`2021-01-01T${availability.Saturday[0]}`));
        setTimeSatEnd(new Date(`2021-01-01T${availability.Saturday[1]}`));
      }
      setLoading(false);
      console.log('Finished loading user availability');
    }
  };

  const timePicker = (time: Date, setTime: React.Dispatch<React.SetStateAction<Date>>) => {
    return (
      <DateTimePicker
        value={time}
        mode={'time'}
        display="default"
        onChange={(event: unknown, selectedTime: Date | undefined) => {
          setShowTimePicker(false);
          setTime(selectedTime || time);
        }}
      />
    );
  };

  const renderTimeString = (dayAndTime: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setTimeToChange(dayAndTime);
          setShowTimePicker(true);
        }}
      >
        <Text>{eval(`${dayAndTime}.toTimeString()`)}</Text>
      </TouchableOpacity>
    );
  };

  const dateToAWSTime = (date: Date) => {
    return date.toISOString().substring(11, 23);
  };

  const onSubmit = async () => {
    if (user !== undefined) {
      if (user.availability !== undefined) {
        console.log('Deleting user old availability');
        await DataStore.delete(user.availability);
        console.log('Successfully deleted old availability');
      }
      console.log('Updating user availability');
      const availability = await DataStore.save(
        new Availability({
          Sunday: [dateToAWSTime(timeSunStart), dateToAWSTime(timeSunEnd)],
          Monday: [dateToAWSTime(timeMonStart), dateToAWSTime(timeMonEnd)],
          Tuesday: [dateToAWSTime(timeTuesStart), dateToAWSTime(timeTuesEnd)],
          Wednesday: [dateToAWSTime(timeWedStart), dateToAWSTime(timeWedEnd)],
          Thursday: [dateToAWSTime(timeThursStart), dateToAWSTime(timeThursEnd)],
          Friday: [dateToAWSTime(timeFriStart), dateToAWSTime(timeFriEnd)],
          Saturday: [dateToAWSTime(timeSatStart), dateToAWSTime(timeSatEnd)],
        }),
      );
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.availability = availability;
        }),
      );
      console.log('Successfully updated user availability');
      // console.log(availability);
    }
    navigation.navigate('Home', { user: user });
  };

  return (
    <Screen>
      <Navbar>
        <NavButton
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </Navbar>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Title>My Availability</Title>
          <Text style={globalStyles.title}>Sunday:</Text>
          <Text>From: {renderTimeString('timeSunStart')}</Text>
          <Text>To: {renderTimeString('timeSunEnd')}</Text>
          <Text style={globalStyles.title}>Monday:</Text>
          <Text>From: {renderTimeString('timeMonStart')}</Text>
          <Text>To: {renderTimeString('timeMonEnd')}</Text>
          <Text style={globalStyles.title}>Tuesday:</Text>
          <Text>From: {renderTimeString('timeTuesStart')}</Text>
          <Text>To: {renderTimeString('timeTuesEnd')}</Text>
          <Text style={globalStyles.title}>Wednesday:</Text>
          <Text>From: {renderTimeString('timeWedStart')}</Text>
          <Text>To: {renderTimeString('timeWedEnd')}</Text>
          <Text style={globalStyles.title}>Thursday:</Text>
          <Text>From: {renderTimeString('timeThursStart')}</Text>
          <Text>To: {renderTimeString('timeThursEnd')}</Text>
          <Text style={globalStyles.title}>Friday:</Text>
          <Text>From: {renderTimeString('timeFriStart')}</Text>
          <Text>To: {renderTimeString('timeFriEnd')}</Text>
          <Text style={globalStyles.title}>Saturday:</Text>
          <Text>From: {renderTimeString('timeSatStart')}</Text>
          <Text>To: {renderTimeString('timeSatEnd')}</Text>
          {showTimePicker &&
            eval(`timePicker(${timeToChange}, set${timeToChange.charAt(0).toUpperCase() + timeToChange.slice(1)})`)}
          <Button title={'Save'} onPress={onSubmit} />
        </View>
      )}
    </Screen>
  );
};

// const styles = StyleSheet.create({
  
// });
