import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { DataStore } from 'aws-amplify';
import { Availability, User } from '../models';
import { RoutePropParams } from '../res/root-navigation';
import { Screen, Button, Title } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { globalStyles } from '../res/styles/GlobalStyles';
import { GOLD, TEAL, GREY_0 } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { formatTime } from '../res/utilFunctions';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { currentUser: User }) => void;
    goBack: () => void;
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
    const user = await DataStore.query(User, route.params.userID);
    setUser(user);
    // console.log(user);
    if (user && user.availability) {
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
    } else {
      console.log('No previous availability');
      setLoading(false);
    }
  };

  // const timePicker = (time: Date, setTime: React.Dispatch<React.SetStateAction<Date>>) => {
  //   return (
  //     <DateTimePicker
  //       value={time}
  //       mode={'time'}
  //       display="default"
  //       onChange={(event: unknown, selectedTime: Date | undefined) => {
  //         setShowTimePicker(false);
  //         setTime(selectedTime || time);
  //       }}
  //     />
  //   );
  // };

  const renderTimeString = (dayAndTime: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setTimeToChange(dayAndTime);
          setShowTimePicker(true);
        }}
      >
        <AppText style={styles.time}>
          {dayAndTime.endsWith('End') ? <AppText style={{ color: GREY_0 }}>{'  to  '}</AppText> : null}
          {formatTime(eval(dayAndTime))}
        </AppText>
      </TouchableOpacity>
    );
  };

  const dateToAWSTime = (date: Date) => {
    return date.toISOString().substring(11, 23);
  };

  const onSubmit = async () => {
    if (user !== undefined) {
      if (user.availability) {
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
      const updatedUser = await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.availability = availability;
        }),
      );
      console.log('Successfully updated user availability');
      // console.log(availability);
      navigation.navigate('Profile', { currentUser: updatedUser });
    }
  };

  return (
    <Screen>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#bad555" />
        </View>
      ) : (
        <View style={globalStyles.defaultRootContainer}>
          <View style={styles.iconContainer}>
            <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.goBack()} />
          </View>
          <View style={globalStyles.miniSpacer} />
          <Title>Availability</Title>
          <View style={styles.availabilityContainer}>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Sunday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeSunStart')} </AppText>
                <AppText>{renderTimeString('timeSunEnd')}</AppText>
              </View>
            </View>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Monday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeMonStart')}</AppText>
                <AppText>{renderTimeString('timeMonEnd')}</AppText>
              </View>
            </View>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Tuesday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeTuesStart')}</AppText>
                <AppText>{renderTimeString('timeTuesEnd')}</AppText>
              </View>
            </View>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Wednesday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeWedStart')}</AppText>
                <AppText>{renderTimeString('timeWedEnd')}</AppText>
              </View>
            </View>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Thursday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeThursStart')}</AppText>
                <AppText>{renderTimeString('timeThursEnd')}</AppText>
              </View>
            </View>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Friday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeFriStart')}</AppText>
                <AppText>{renderTimeString('timeFriEnd')}</AppText>
              </View>
            </View>
            <View style={styles.dayContainer}>
              <AppText style={styles.day}>Saturday</AppText>
              <View style={styles.timeSlot}>
                <AppText>{renderTimeString('timeSatStart')}</AppText>
                <AppText>{renderTimeString('timeSatEnd')}</AppText>
              </View>
            </View>
          </View>
          <View style={globalStyles.spacer} />
          {showTimePicker &&
            eval(`timePicker(${timeToChange}, set${timeToChange.charAt(0).toUpperCase() + timeToChange.slice(1)})`)}
          <Button title={'Confirm'} onPress={onSubmit} containerStyle={styles.button} />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 5,
    left: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    top: 5,
  },
  time: {
    color: TEAL,
    fontWeight: 'bold',
    fontSize: 15,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GREY_0,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 10,
  },
  availabilityContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 25,
    padding: 25,
    marginHorizontal: '4%',
  },
  button: {
    flex: 1,
  },
});
