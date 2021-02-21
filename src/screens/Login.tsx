import React, { useState } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import NavigationButton from "../atoms/NavigationButton";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "./../res/styles/Colors";
import { Formik } from "formik";
import SingleLineTextInput from "../atoms/SingleLineTextInput";
import { auth } from "../res/services/firebase";

interface Props {
  navigation: any;
}

interface LoginForm {
  email: string,
  password: string
}

// FIXME: @Griffin get your typed ducks in a row!
export default function Login({ navigation }: Props) {
  const loginTrigger = (values: LoginForm) => {
    auth.signInWithEmailAndPassword(values.email.trim(), values.password)
      .then(() => console.log("Signed In"));
  }

  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={loginTrigger}
      >
        {(props) => (
          <View>
            <View style={globalStyles.megaSpacer} />
            <Text>Username:</Text>

            <SingleLineTextInput
              inputText={props.values.email}
              placeholder={"Email"}
              setText={props.handleChange("email")}
            />
            <View style={globalStyles.miniSpacer} />
            <Text>Password:</Text>

            <SingleLineTextInput
              inputText={props.values.password}
              placeholder={"Password"}
              setText={props.handleChange("password")}
            />
            <View style={globalStyles.megaSpacer} />

            <Button title="Continue" onPress={(event) => {props.handleSubmit();}}></Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
