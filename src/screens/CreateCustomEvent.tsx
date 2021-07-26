import React, { useState } from 'react';
import uuid from 'uuid';
import { Screen, NavButton, FormButton, Title } from '../atoms/AtomsExports';
import { Navbar } from '../molecules/MoleculesExports';
import { MeepForm } from '../atoms/MeepForm';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: { params: { title: string; address: string } };
}

export const CreateCustomEvent: React.FC<Props> = ({ navigation }: Props) => {
  const [updatedValues, setUpdatedValues] = useState<{
    eventName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventDescription: string;
  }>({ eventName: '', eventDate: '', eventTime: '', eventLocation: '', eventDescription: '' });
  const onFormSubmit = (values: {
    eventName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventDescription: string;
  }) => {
    navigation.navigate('SelectFriends', {
      data: {
        eventData: {
          uuid: uuid.v4(),
          showImage: false,
          title: values.eventName,
          date: values.eventDate,
          time: values.eventTime,
          location: values.eventLocation,
          description: values.eventDescription,
        },
      },
    });
  };

  const inputFields: { title: string; placeholder: string; settings?: string }[] = [
    {
      title: 'Event Name',
      placeholder: '',
    },
    {
      title: 'Event Date',
      placeholder: 'MM/DD/YYYY',
      settings: 'date',
    },
    {
      title: 'Event Time',
      placeholder: 'H:MM PM',
      settings: 'time',
    },
    {
      title: 'Event Location',
      placeholder: 'address',
    },
    {
      title: 'Event Description',
      placeholder: '',
    },
  ];

  const setValues = (value: { title: string; value: string }[]) => {
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
    <Screen>
      <Navbar>
        <NavButton onPress={() => navigation.navigate('SearchPlace', {})} title="Back" />
      </Navbar>
      <Title>Create Event</Title>
      <MeepForm InputList={inputFields} updatedValues={(value) => setValues(value)}>
        <FormButton title="Invite Friends" onPress={() => onFormSubmit(updatedValues)} />
      </MeepForm>
    </Screen>
  );
};
