import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { Screen, FormButton, MeepForm } from '../atoms/AtomsExports';
import { Text } from 'react-native-elements';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Qs from 'qs';
import { User } from '../models';
import { ScrollView } from 'react-native-gesture-handler';

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

export const CreateCustomEvent: React.FC<Props> = ({ navigation, route }: Props) => {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
  const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';

  const [planTitle, setPlanTitle] = useState('');
  const [planAddress, setPlanAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [updatedValues, setUpdatedValues] = useState<{
    eventName: string | undefined;
    eventDate: string | undefined;
    eventTime: string | undefined;
    eventLocation: string | undefined;
    eventDescription: string | undefined;
  }>({ eventName: planTitle, eventDate: '', eventTime: '', eventLocation: planAddress, eventDescription: 'hey' });

  useEffect(() => {
    if (route.params.data) {
      setPlanTitle(route.params.data.eventData.title);
      setPlanAddress(route.params.data.eventData.location);
      setPhoto(route.params.data.eventData.imageURL);
    }
  }, []);

  const onFormSubmit = (values: {
    eventName: string | undefined;
    eventDate: string | undefined;
    eventTime: string | undefined;
    eventLocation: string | undefined;
    eventDescription: string | undefined;
  }) => {
    const image: string = photo ? loadPhoto(photo)?.props.source.uri : '';
    const id = uuid.v4();
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
          imageURL: image || '',
          placeId: route.params.data ? route.params.data.eventData.placeId : '',
        },
      },
    });
  };

  const loadPhoto = (photoReference: string) => {
    if (photoReference) {
      const photoRequetsParams = {
        key: GOOGLE_PLACES_API_KEY,
        maxwidth: 500,
        maxheight: 500,
        photoreference: photoReference,
      };
      const completeUri = photoRequestURL + Qs.stringify(photoRequetsParams);
      return <Image source={{ uri: completeUri }} style={styles.image} resizeMode="cover" />;
    }
    return;
  };

  const inputFields: { title: string; placeholder: string; settings?: string; value?: string }[] = [
    {
      title: 'Name',
      placeholder: '',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.title : '',
    },
    {
      title: 'Date',
      placeholder: 'MM/DD/YYYY',
      settings: 'date',
      value: '',
    },
    {
      title: 'Time',
      placeholder: 'H:MM PM',
      settings: 'time',
      value: '',
    },
    {
      title: 'Location',
      placeholder: 'address',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.location : '',
    },
    {
      title: 'Description',
      placeholder: '',
      settings: 'default',
      value: '',
    },
  ];

  const setValues = (value: { title: string; value: string | undefined }[]) => {
    const values = {
      eventName: value[0].value,
      eventDate: value[1].value,
      eventTime: value[2].value,
      eventLocation: value[3].value,
      eventDescription: value[4].value,
    };
    setUpdatedValues(values);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <ScrollView>
          <View style={styles.navbar}>
            <Icon
              name="arrow-left"
              type="font-awesome"
              size={30}
              onPress={() => navigation.navigate('SearchPlace', {})}
              style={styles.back}
            />
            <Text style={styles.title}>New Plan</Text>
          </View>
          <View>{loadPhoto(photo)}</View>
          <MeepForm InputList={inputFields} updatedValues={(value) => setValues(value)}>
            <FormButton title="Next" onPress={() => onFormSubmit(updatedValues)} />
          </MeepForm>
        </ScrollView>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#32A59F',
    textAlign: 'center',
    fontWeight: '400',
  },
  navbar: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    top: 10,
  },
  back: {
    marginRight: 10,
  },
  image: {
    height: 200,
    width: '100%',
  },
});
