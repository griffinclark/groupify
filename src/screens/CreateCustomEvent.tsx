import { Formik, validateYupSchema } from "formik";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from "react-native";
import SingleLineTextInput from "../atoms/SingleLineTextInput";
import EventTile from "../molecules/EventTile";
import { globalStyles } from './../res/styles/GlobalStyles';
import { Event } from "./../res/dataModels";
import { LIGHT } from '../res/styles/Colors';


interface Props {
  navigation: any;
  endpointUID: string;
}

interface CustomEvent {
  title: string;
  startTime: string;
  location: string;
}

export default function CreateCustomEvent({ navigation }: Props) {

  useEffect(() => {}, []);

  const onFormSubmit = (values) => {
    console.log(values)
    navigation.navigate("SelectFriends", 
      {data: 
        {eventData:
          {
            title: "Example Title",
            date: "03/04/2021",
            time: "3:00 pm",
            location: "1000 Park Place",
          }
        }
      }
    )
  };

  return (
    <SafeAreaView>
      <View style={globalStyles.miniSpacer} />
      <Text style={globalStyles.superTitle}>New Custom Event</Text>
      <View style={globalStyles.miniSpacer} />
      <Formik
        initialValues={{
          eventName: "",
          eventDate: "",
          eventTime: "",
          eventLocation: "",
        }}
        onSubmit={onFormSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text style={globalStyles.title}>Event Name</Text>
            <TextInput
              style={styles.textInputBody}
              onChangeText={handleChange("eventName")}
              placeholder={"e.g. Huntington Beach"}
              value={values.eventName}
            />
            <View style={globalStyles.miniSpacer} />
            <Text style={globalStyles.title}>Event Date</Text>
            <TextInput
              style={styles.textInputBody}
              onChangeText={handleChange("eventDate")}
              placeholder={"e.g. 03/21/2021"}
              value={values.eventDate}
            />
            <View style={globalStyles.miniSpacer} />
            <Button title="Invite Friends" onPress={handleSubmit} />
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
  }
})