import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { globalStyles } from './../res/styles/GlobalStyles';
import { DK_PURPLE, GREY_5, WHITE } from '../res/styles/Colors';
import uuid from 'uuid';
import { Button, Title, Screen, NavButton } from '../atoms/AtomsExports'
import { Navbar } from '../molecules/MoleculesExports'


interface Props {
  navigation: any;
  endpointUID: string;
}

interface FormTextField {
  variable: string;
  title: string;
  placeholder: string;
}

export default function CreateCustomEvent({ navigation }: Props) {

  const onFormSubmit = (values: any) => {
    // console.log(values)
    navigation.navigate("SelectFriends", {
      data: {
        eventData: {
          uuid: uuid.v4(),
          showImage: false,
          title: values.eventName,
          date: values.eventDate,
          time: values.eventTime,
          location: values.eventLocation,
          description: values.eventDescription,
        }
      }
    })
  };

  const inputFields = {
    "eventName":
    {
      "title": "Event Name",
      "placeholder":""
    },
    "eventDate":
    {
      "title": "Event Date",
      "placeholder": "MM/DD/YYYY"
    },
    "eventTime":
    {
      "title": "Event Time",
      "placeholder": "H:MM PM"
    },
    "eventLocation":
    {
      "title": "Event Location",
      "placeholder": "address"
    },
    "eventDescription":
    {
      "title": "Event Description",
      "placeholder": ""
    },
  };

  interface listInputProps {
    handleChange: {
      (e: React.ChangeEvent<any>): void;
      <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }, 
    values: any,
    input: string
  }

  const listInputField = (handleChange: listInputProps["handleChange"], values: listInputProps["values"], input: listInputProps["input"]) => {
    return (
      <View>
        <Text style={[globalStyles.title, {color: DK_PURPLE}]}>{inputFields[input].title}</Text>
        <TextInput
          style={styles.textInputBody}
          onChangeText={handleChange(input)}
          placeholder={inputFields[input].placeholder}
          value={values[input]}
        />
        <View style={{height: 15}} />
      </View>
    );
  }

  return (
    <Screen>
      <Navbar>
        <NavButton
          onPress={() => navigation.navigate("Home")}
          title='Back'
        />
      </Navbar>
      <Formik
        initialValues={{
          eventName: "",
          eventDate: "",
          eventTime: "",
          eventLocation: "",
          eventDescription: "",
        }}
        onSubmit={onFormSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
          <View style={styles.formContainer}>
            <Title>New Event</Title>
            { listInputField(handleChange, values, "eventName") }
            { listInputField(handleChange, values, "eventDate") }
            { listInputField(handleChange, values, "eventTime") }
            { listInputField(handleChange, values, "eventLocation") }
            { listInputField(handleChange, values, "eventDescription") }
            {/*idk how to fix this freaking onPress type error but it works so whatever */}
          </View>
          <Button title="Invite Friends" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Screen>
  );
}

let styles = StyleSheet.create({
  textInputBody: {
    fontSize: 16,
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 7,
    marginTop: 5
  },
  formContainer: {
    backgroundColor: GREY_5,
    borderRadius: 10,
    margin: 10,
    padding: 20,
  }
})