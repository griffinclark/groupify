import { Formik, validateYupSchema } from "formik";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from "react-native";
import SingleLineTextInput from "../atoms/SingleLineTextInput";
import EventTile from "../molecules/EventTile";
import { globalStyles } from './../res/styles/GlobalStyles';
import { Event } from "./../res/dataModels";
import { LIGHT } from '../res/styles/Colors';
import { useIsFocused } from "@react-navigation/core";
// import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from 'uuid';


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

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
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
            <Text style={globalStyles.title}>Event Name</Text>
            <TextInput
              style={styles.textInputBody}
              onChangeText={handleChange("eventName")}
              placeholder={"e.g. Hiking at Eagle Rock"}
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
            <Text style={globalStyles.title}>Event Time</Text>
            <TextInput
              style={styles.textInputBody}
              onChangeText={handleChange("eventTime")}
              placeholder={"e.g. 3:45 PM"}
              value={values.eventTime}
            />
            <View style={globalStyles.miniSpacer} />
            <Text style={globalStyles.title}>Event Location</Text>
            <TextInput
              style={styles.textInputBody}
              onChangeText={handleChange("eventLocation")}
              placeholder={"e.g. 5499 Eagle Rock View Dr, Los Angeles, CA 90041"}
              value={values.eventLocation}
            />
            <View style={globalStyles.miniSpacer} />
            <Text style={globalStyles.title}>Description/Notes</Text>
            <TextInput
              style={styles.textInputBody}
              onChangeText={handleChange("eventDescription")}
              placeholder={"e.g. Meet at the parking lot near the inn."}
              value={values.eventDescription}
            />
            <View style={{height: 220}} />
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