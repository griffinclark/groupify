import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { AppText, BottomButton, MeepForm, Alert, Navbar } from '../atoms/AtomsExports';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { formatIosTimeInput, formatTime, roundDate } from '../res/utilFunctions';
import { MapLinkIcon } from '../../assets/Icons/IconExports';
import Constants from 'expo-constants';
import { TEAL } from '../res/styles/Colors';
import { RoutePropParams } from '../res/root-navigation';
import * as Analytics from 'expo-firebase-analytics';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const PlanCreate: React.FC<Props> = ({ navigation, route }: Props) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const currentDate = roundDate(new Date());

  // Check if required fields are full
  useEffect(() => {
    checkDisabled();
  }, [name]);

  // Update state from params
  useEffect(() => {
    if (route.params.data) {
      const { data } = route.params;
      if (data.eventData.title && data.eventData.title != name) {
        setName(data.eventData.title);
      }
      if (data.eventData.date && data.eventData.date != date) {
        setDate(data.eventData.title);
      }
      if (data.eventData.time && data.eventData.time != time) {
        setTime(data.eventData.time);
      }
      if (data.eventData.description && data.eventData.description != description) {
        setDescription(data.eventData.description);
      }
      if (data.eventData.location && data.eventData.location != location) {
        setLocation(data.eventData.location);
      }
      if (data.eventData.imageURL && data.eventData.imageURL != photo) {
        setPhoto(data.eventData.imageURL);
      }
    }
  }, [route.params.data]);

  const resetFields = () => {
    setName('');
    setDate(currentDate.toLocaleDateString());
    setTime(
      Platform.OS === 'android'
        ? formatTime(currentDate.toLocaleTimeString())
        : formatIosTimeInput(currentDate.toLocaleTimeString()),
    );
    setDescription('');
    setLocation('');
    setPhoto('');
    setError(undefined);
    setDisabled(true);
  };

  const onFormSubmit = async () => {
    const id = uuid.v4();
    if (!name) {
      setError('Please add a name to your plan');
      return;
    }

    navigation.navigate('PlanInvite', {
      currentUser: route.params.currentUser,
      data: {
        eventData: {
          uuid: id,
          title: name,
          date: date ? date : currentDate.toLocaleDateString(),
          time: time
            ? time
            : Platform.OS === 'android'
            ? formatTime(currentDate.toLocaleTimeString())
            : formatIosTimeInput(currentDate.toLocaleTimeString()),
          location: location,
          description: description,
          imageURL: photo || '',
          placeId: route.params.data ? route.params.data.eventData.placeId : '',
        },
      },
    });
    resetFields();
    await Analytics.logEvent('submit_create_event_to_friends', { userId: id });
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
        {/* <Screen> */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <Navbar location={'Home'} navigation={navigation} title={'Create a Plan'} />
          {/* <View>{loadPhoto(photo)}</View> */}
          <View style={{ flexGrow: 1 }}>
            <MeepForm inputList={inputFields}>
              <TouchableOpacity
                style={styles.mapLink}
                onPress={() => navigation.navigate('PlanMap', { currentUser: route.params.currentUser })}
              >
                {/* <Icon color={TEAL} name="map-marker" type="font-awesome" size={24} /> */}
                <MapLinkIcon />
                <AppText style={styles.mapText}>Find address using the map</AppText>
              </TouchableOpacity>
            </MeepForm>
            {error && <Alert status="error" message={error} />}
          </View>
        </ScrollView>
        {/* </Screen> */}
      </KeyboardAvoidingView>
      <BottomButton disabled={disabled} title="Invite Friends" onPress={onFormSubmit} />
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
});
