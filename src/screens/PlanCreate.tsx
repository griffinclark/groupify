import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { AppText, Screen, BottomButton, MeepForm, Alert, Navbar } from '../atoms/AtomsExports';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { User } from '../models';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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
  //   const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
  //   const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';

  const [planTitle, setPlanTitle] = useState('');
  const [planAddress, setPlanAddress] = useState('');
  //   const [photo, setPhoto] = useState('');
  const [updatedValues, setUpdatedValues] = useState<{
    eventName: string | undefined;
    eventDate: string | undefined;
    eventTime: string | undefined;
    eventLocation: string | undefined;
    eventDescription: string | undefined;
  }>({ eventName: planTitle, eventDate: '', eventTime: '', eventLocation: planAddress, eventDescription: 'hey' });
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (route.params.data) {
      setPlanTitle(route.params.data.eventData.title);
      setPlanAddress(route.params.data.eventData.location);
      //   setPhoto(route.params.data.eventData.imageURL);
    }
  }, []);

  const onFormSubmit = (values: {
    eventName: string | undefined;
    eventDate: string | undefined;
    eventTime: string | undefined;
    eventLocation: string | undefined;
    eventDescription: string | undefined;
  }) => {
    // const image: string = photo ? loadPhoto(photo)?.props.source.uri : '';
    const id = uuid.v4();
    if (!values.eventName) {
      setError('Please add a name to your plan');
      return;
    }
    if (!values.eventLocation) {
      setError('Please add a location to your plan');
      return;
    }
    if (!values.eventDescription) {
      setError('Please add a description to your plan');
      return;
    }

    navigation.navigate('SelectFriends', {
      currentUser: route.params.currentUser,
      data: {
        eventData: {
          uuid: id,
          title: values.eventName,
          date: values.eventDate,
          time: values.eventTime,
          location: values.eventLocation,
          description: values.eventDescription,
          //   imageURL: image || '',
          placeId: route.params.data ? route.params.data.eventData.placeId : '',
        },
      },
    });
  };

  const inputFields: { title: string; placeholder: string; settings?: string; value?: string }[] = [
    {
      title: 'Plan Name *',
      placeholder: '',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.title : '',
    },
    {
      title: 'Date *',
      placeholder: 'MM/DD/YYYY',
      settings: 'date',
      value: '',
    },
    {
      title: 'Time *',
      placeholder: 'H:MM PM',
      settings: 'time',
      value: '',
    },
    {
      title: 'Description *',
      placeholder: '',
      settings: 'default',
      value: '',
    },
    {
      title: 'Address',
      placeholder: '',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.location : '',
    },
  ];

  const setValues = (value: { title: string; value: string | undefined }[]) => {
    const values = {
      eventName: value[0].value,
      eventDate: value[1].value,
      eventTime: value[2].value,
      eventDescription: value[3].value,
      eventLocation: value[4].value,
    };
    setUpdatedValues(values);
    // checkDisabled();
  };

  // const checkDisabled = () => {
  //   console.log(updatedValues);
  // };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
          <Navbar location={'Home'} navigation={navigation} title={'Create a Plan'} />

          {/* <View>{loadPhoto(photo)}</View> */}
          <MeepForm InputList={inputFields} updatedValues={(value) => setValues(value)}>
            <TouchableOpacity style={styles.mapLink} onPress={() => navigation.navigate('SearchPlace', {})}>
              <Icon color={TEAL} name="map-marker" type="font-awesome" size={24} />
              <AppText style={styles.mapText}>Find address using the map</AppText>
            </TouchableOpacity>
          </MeepForm>
          {error && <Alert status="error" message={error} />}
          <BottomButton title="Invite Friends" onPress={() => onFormSubmit(updatedValues)} />
        </ScrollView>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mapLink: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    width: '100%',
  },
  mapText: {
    color: TEAL,
    fontSize: 16,
    marginLeft: 10,
  },
});
