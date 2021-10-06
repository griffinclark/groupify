import React, { useEffect, useState } from 'react';
import { AppText, BottomButton, MeepForm, Alert, Navbar } from '../atoms/AtomsExports';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MapLinkIcon } from '../../assets/Icons/IconExports';
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

  // Check if required fields are full
  useEffect(() => {
    checkDisabled();
  }, [name]);

  // Update location or photo
  useEffect(() => {
    if (route.params.data && route.params.data.eventData.location) {
      setLocation(route.params.data.eventData.location);
    }
  }, [route.params.data]);

  const onFormSubmit = async () => {
    if (!name) {
      setError('Please add a name to your plan');
      return;
    }
    const original = await DataStore.query(Plan, (plan) => plan.id('eq', route.params.currentUserPlan.id));
    await DataStore.save(
      Plan.copyOf(original[0], (updated) => {
        updated.title = name;
        updated.date = formatDatabaseDate(date ? date : currentDate.toLocaleDateString());
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
    navigation.navigate('PlanDetails', { plan: route.params.currentUserPlan });
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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <Screen> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <Navbar location={'PlanDetails'} navigation={navigation} title={'Edit Plan'} />
        {/* <View>{loadPhoto(photo)}</View> */}
        <View style={{ flexGrow: 1 }}>
          <MeepForm inputList={inputFields}>
            <TouchableOpacity style={styles.mapLink} onPress={() => navigation.navigate('PlanMap', { option: 'edit' })}>
              <MapLinkIcon />
              <AppText style={styles.mapText}>Find address using the map</AppText>
            </TouchableOpacity>
          </MeepForm>
          {error && <Alert status="error" message={error} />}
        </View>
        <BottomButton disabled={disabled} title="Save Plan" onPress={onFormSubmit} />
      </ScrollView>
      {/* </Screen> */}
    </KeyboardAvoidingView>
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
});
