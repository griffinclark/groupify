import React, { useEffect, useState } from 'react';
import { AppText, BottomButton, MeepForm as GroupifyForm, Alert, Screen } from '../atoms/AtomsExports';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BackChevronIcon, MapLinkIcon } from '../../assets/Icons/IconExports';
import Constants from 'expo-constants';
import { TEAL } from '../res/styles/Colors';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { Plan } from '../models';
import {
  formatDatabaseDate,
  formatDatabaseTime,
  formatIosTimeInput,
  formatTime,
  roundDate,
} from '../res/utilFunctions';

interface Props {
  navigation: {
    push: (ev: string) => void;
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const EditPlan: React.FC<Props> = ({ navigation, route }: Props) => {
  const [name, setName] = useState<string>(route.params.currentUserPlan.title);
  const [date, setDate] = useState<string>(route.params.currentUserPlan.date ? route.params.currentUserPlan.date : '');
  const [time, setTime] = useState<string>(route.params.currentUserPlan.time ? route.params.currentUserPlan.time : '');
  const [description, setDescription] = useState<string>(
    route.params.currentUserPlan.description ? route.params.currentUserPlan.description : '',
  );
  const [location, setLocation] = useState<string>(
    route.params.currentUserPlan.location ? route.params.currentUserPlan.location : '',
  );
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const currentDate = roundDate(new Date());
  const [dateChanged, setDateChanged] = useState(false);

  // Check if required fields are full
  useEffect(() => {
    checkDisabled();
  }, [name]);

  useEffect(() => {
    date != route.params.currentUserPlan.date ? setDateChanged(true) : setDateChanged(false);
  }, [date]);

  // Update location or photo
  useEffect(() => {
    if (route.params.data && route.params.data.eventData.location) {
      setLocation(route.params.data.eventData.location);
    }
  }, [route.params.data]);
  //formatDatabaseDate(date)
  const onFormSubmit = async () => {
    if (!name) {
      setError('Please add a name to your plan');
      return;
    }
    const original = await DataStore.query(Plan, (plan) => plan.id('eq', route.params.currentUserPlan.id));
    await DataStore.save(
      Plan.copyOf(original[0], (updated) => {
        updated.title = name;
        updated.date = dateChanged ? formatDatabaseDate(date) : route.params.currentUserPlan.date;
        updated.time = formatDatabaseTime(
          time
            ? time
            : Platform.OS === 'android'
            ? formatTime(currentDate.toLocaleTimeString())
            : formatIosTimeInput(currentDate.toLocaleTimeString()),
        );
        updated.description = description;
        updated.location = location;
        updated.placeID = route.params.data
          ? route.params.data.eventData.placeId
          : route.params.currentUserPlan.placeID;
        updated.creatorID = route.params.currentUserPlan.creatorID;
      }),
    );
    navigation.push('Home');
  };

  const inputFields: {
    title: string;
    placeholder: string;
    settings: string;
    value: string;
    func: React.Dispatch<React.SetStateAction<string>>;
  }[] = [
    {
      title: 'Plan Name *',
      placeholder: '',
      settings: 'default',
      value: name,
      func: setName,
    },
    {
      title: 'Date *',
      placeholder: 'MM/DD/YYYY',
      settings: 'date',
      value: date,
      func: setDate,
    },
    {
      title: 'Time *',
      placeholder: 'H:MM PM',
      settings: 'time',
      value: time,
      func: setTime,
    },
    {
      title: 'Description',
      placeholder: '',
      settings: 'default',
      value: description,
      func: setDescription,
    },
    {
      title: 'Address',
      placeholder: '',
      settings: 'default',
      value: location,
      func: setLocation,
    },
  ];

  const checkDisabled = () => {
    if (name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Screen>
          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            <BackChevronIcon onPress={() => navigation.navigate('PlanDetails', {})} />
            <AppText style={styles.title}>Edit Plan</AppText>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              flexDirection: 'column',
              paddingTop: Constants.statusBarHeight - 340,
            }}
          >
            {/* <View>{loadPhoto(photo)}</View> */}
            <View style={{ flexGrow: 1 }}>
              <GroupifyForm inputList={inputFields}>
                <TouchableOpacity
                  style={styles.mapLink}
                  onPress={() => navigation.navigate('PlanMap', { option: 'edit' })}
                >
                  <MapLinkIcon />
                  <AppText style={styles.mapText}>Find address using the map</AppText>
                </TouchableOpacity>
              </GroupifyForm>
              {error && <Alert status="error" message={error} />}
            </View>
          </ScrollView>
        </Screen>
      </KeyboardAvoidingView>
      <BottomButton disabled={disabled} title="Save Plan" onPress={onFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  mapLink: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    paddingLeft: 20,
    width: '100%',
  },
  mapText: {
    color: TEAL,
    fontSize: 16,
    marginLeft: 10,
  },
  title: {
    paddingLeft: 15,
    fontSize: 30,
    color: TEAL,
  },
});
