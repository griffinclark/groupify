import { FormikValues } from 'formik';
import React from 'react';
import uuid from 'uuid';
import { Screen, NavButton, FormButton } from '../atoms/AtomsExports';
import { Navbar } from '../molecules/MoleculesExports';
import { MeepForm } from '../atoms/MeepForm';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  endpointUID: string;
}

export const CreateCustomEvent: React.FC<Props> = ({ navigation }: Props) => {
  const onFormSubmit = (values: listInputProps['values']) => {
    console.log('Submit');
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

  const inputFields: { title: string; placeholder: string }[] = [
    {
      title: 'Event Name',
      placeholder: '',
    },
    {
      title: 'Event Date',
      placeholder: 'MM/DD/YYYY',
    },
    {
      title: 'Event Time',
      placeholder: 'H:MM PM',
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

  interface listInputProps {
    handleChange: {
      (e: React.ChangeEvent<string>): void;
      <T = string | React.ChangeEvent<string>>(field: T): T extends React.ChangeEvent<string>
        ? void
        : (e: string | React.ChangeEvent<string>) => void;
    };
    values: FormikValues;
    input: string;
  }

  return (
    <Screen>
      <Navbar>
        <NavButton onPress={() => navigation.navigate('Home', {})} title="Back" />
      </Navbar>
      <MeepForm InputList={inputFields}>
        <FormButton title="Invite Friends" onPress={() => onFormSubmit()} />
      </MeepForm>
    </Screen>
  );
};
