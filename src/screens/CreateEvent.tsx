import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import SingleLineTextInput from "../atoms/SingleLineTextInput";
import { globalStyles } from './../res/styles/GlobalStyles';

interface Props {
  navigation: any;
  endpointUID: string;
}

interface CreateEventForm {
  eventTitle: string;
  startTime?: string;
  eventLocation: string;
}

export default function CreateEvent({ navigation }: Props) {
  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    // TODO @David grab the endpoint using endpointUID
    setEndpoint("I'm an endpoint!");
  }, []);

  const onFormSubmit = () => {};
  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          eventTitle: endpoint.eventTitle,
          startTime: endpoint.startTime,
          eventLocation: endpoint.eventLocation,
        }}
        onSubmit={onFormSubmit}
      >
        {(props: any) => (
          <View>
            <Text>Full Name</Text>

            <SingleLineTextInput
              inputText={props.values.phoneNumber}
              placeholder={"Full Name"}
              setText={props.handleChange("name")}
            />
            <View style={globalStyles.miniSpacer} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
