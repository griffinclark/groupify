import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { AppText, Screen, BottomButton, MeepForm, Alert, Navbar } from '../atoms/AtomsExports';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { User } from '../models';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { formatIosTimeInput, formatTime, roundDate } from '../res/utilFunctions';

import { TEAL } from '../res/styles/Colors';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: {
    params: {
      currentUser: User;
      data: { eventData: { title: string; location: string; imageURL: string; placeId: string } };
    };
  };
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

  // Update location or photo
  useEffect(() => {
    if (route.params.data && route.params.data.eventData.location) {
      setLocation(route.params.data.eventData.location);
    }
    if (route.params.data && route.params.data.eventData.imageURL) {
      setPhoto(route.params.data.eventData.imageURL);
    }
  }, [route.params.data]);

  const onFormSubmit = () => {
    const id = uuid.v4();
    if (!name) {
      setError('Please add a name to your plan');
      return;
    }

    navigation.navigate('SelectFriends', {
      currentUser: route.params.currentUser,
      data: {
        eventData: {
          uuid: id,
          title: name,
          // date: date || currentDate.toLocaleDateString(),
          // time:
          //   time || Platform.OS === 'android'
          //     ? formatTime(currentDate.toLocaleTimeString())
          //     : formatIosTimeInput(currentDate.toLocaleTimeString()),
          date: date,
          time: time,
          location: location,
          description: description,
          imageURL: photo || '',
          placeId: route.params.data ? route.params.data.eventData.placeId : '',
        },
      },
    });
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
          <Navbar location={'Home'} navigation={navigation} title={'Create a Plan'} />
          {/* <View>{loadPhoto(photo)}</View> */}
          <View style={{ flexGrow: 1 }}>
            <MeepForm inputList={inputFields}>
              <TouchableOpacity style={styles.mapLink} onPress={() => navigation.navigate('PlanMap', {})}>
                <Icon color={TEAL} name="map-marker" type="font-awesome" size={24} />
                <AppText style={styles.mapText}>Find address using the map</AppText>
              </TouchableOpacity>
            </MeepForm>
            {error && <Alert status="error" message={error} />}
          </View>
          <BottomButton disabled={disabled} title="Invite Friends" onPress={onFormSubmit} />
        </ScrollView>
      </Screen>
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
