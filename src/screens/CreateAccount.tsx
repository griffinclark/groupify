import { Formik } from "formik";
import React from "react";
import { SafeAreaView, View, Button, Text } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import SingleLineTextInput from "./../atoms/SingleLineTextInput";
import NavigationButton from './../atoms/NavigationButton';
import { auth } from "../res/services/firebase";

interface Props {
  navigation: any;
}

interface AccountForm {
  phoneNumber: string,
  email: string,
  password: string,
  repeatPassword: string
}

export default function CreateAccount({ navigation }: Props) {
  const createAccountTrigger = (form: AccountForm) => {
    console.log("createAccountTrigger");

    if (form.password != form.repeatPassword) {
      console.log("@Griffin needs to hook this to the UI, passwords didn't match");
      // TODO: @Griffin hook this to the UI
      return;
    }

    auth.createUserWithEmailAndPassword(form.email, form.password)
      .then((creds) => console.log("Created user successfully!", creds));
    
    // TODO: @Griffin navigate elesewhere?
  };

  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Formik
        initialValues={{
          phoneNumber: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={createAccountTrigger}
      >
        {(props: any) => (
          <View>
            <View style={globalStyles.miniSpacer} />
            {/* TODO See how we had to copy and paste SingleLineTextInput four times? We should have a factory/generator  */}
            <SingleLineTextInput
              inputText={props.values.phoneNumer}
              placeholder={"Phone Number"}
              setText={props.handleChange("phoneNumber")}
            />

            <View style={globalStyles.miniSpacer} />

            <SingleLineTextInput
              inputText={props.values.email}
              placeholder={"Email"}
              setText={props.handleChange("email")}
            />

            <View style={globalStyles.miniSpacer} />

            <SingleLineTextInput
              inputText={props.values.password}
              placeholder={"Password"}
              setText={props.handleChange("password")}
            />

            <View style={globalStyles.miniSpacer} />

            <SingleLineTextInput
              inputText={props.values.repeatPassword}
              placeholder={"Repeat Password"}
              setText={props.handleChange("repeatPassword")}
            />

            <View style={globalStyles.megaSpacer} />

            {/* FIXME: button doesn't fire the form submit event */}
            <NavigationButton title="Continue" onNavButtonPressed={() => { props.handleSubmit }} destination={"Welcome"} navigation={navigation} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
