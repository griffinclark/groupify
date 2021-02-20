import React, { useState } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import NavigationButton from "../atoms/NavigationButton";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "./../res/styles/Colors";
import { Formik } from "formik";
import SingleLineTextInput from "../atoms/SingleLineTextInput";

interface Props {
  navigation: any;
}

export default function Login({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Formik
        initialValues={{ phoneNumber: "", password: "" }}
        onSubmit={(values) => {
          console.log(
            "@David is going to handle logging users in any day now...."
          );
        }}
      >
        {(props) => (
          <View>
            <View style={globalStyles.miniSpacer} />
            <SingleLineTextInput
              inputText={props.values.phoneNumber}
              placeholder={"Phone number"}
              setText={props.handleChange("phoneNumber")}
            />
            <View style={globalStyles.miniSpacer} />
            <SingleLineTextInput
              inputText={props.values.password}
              placeholder={"Password"}
              setText={props.handleChange("password")}
            />
            <View style={globalStyles.megaSpacer} />

            <Button title="Continue" onPress={props.handleSubmit}></Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
