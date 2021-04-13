import { Formik, validateYupSchema } from "formik";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from "react-native";
import SingleLineTextInput from "../atoms/SingleLineTextInput";
import EventTile from "../molecules/EventTile";
import { globalStyles } from './../res/styles/GlobalStyles';
import { Event } from "./../res/dataModels";
import { LIGHT } from '../res/styles/Colors';
import { useIsFocused } from "@react-navigation/core";
import Navbar from "../organisms/Navbar";
// import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from 'uuid';


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

  const onFormSubmit = (values) => {
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
      "placeholder":"e.g. Hiking at Eagle Rock"
    },
    "eventDate":
    {
      "title": "Event Date",
      "placeholder": "e.g. e.g. 03/21/2021"
    },
    "eventTime":
    {
      "title": "Event Time",
      "placeholder": "e.g. 3:45 PM"
    },
    "eventLocation":
    {
      "title": "Event Location",
      "placeholder": "e.g. 5499 Eagle Rock View Dr, Los Angeles, CA 90041"
    },
    "eventDescription":
    {
      "title": "Event Description / Notes",
      "placeholder": "e.g. Meet at the parking lot near the inn."
    },
  };

  const listInputField = (handleChange, values, input: string) => {
    return (
      <View>
        <Text style={globalStyles.title}>{inputFields[input].title}</Text>
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
    <SafeAreaView>
      <Navbar navigation={navigation} />
      <Text style={globalStyles.superTitle}>New Custom Event</Text>
      <View style={globalStyles.miniSpacer} />
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
          <View>
            { listInputField(handleChange, values, "eventName") }
            { listInputField(handleChange, values, "eventDate") }
            { listInputField(handleChange, values, "eventTime") }
            { listInputField(handleChange, values, "eventLocation") }
            { listInputField(handleChange, values, "eventDescription") }
            <View style={{height: 250}} />
            <Button style={styles.button} title="Invite Friends" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  textInputBody: {
    fontSize: 20,
    backgroundColor: LIGHT,
    borderBottomWidth: 1,
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
})