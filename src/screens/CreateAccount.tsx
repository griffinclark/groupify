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
  const createAccountTrigger = async (form: AccountForm) => {
    console.log("createAccountTrigger");

    if (form.password != form.repeatPassword) {
      console.log("@Griffin needs to hook this to the UI, passwords didn't match");
      // TODO: @Griffin hook this to the UI
      return;
    }

    // TODO: sanity-check password
    try {
      await auth.createUserWithEmailAndPassword(form.email.trim(), form.password)
        .then((creds) => console.log("Created user successfully!"));
    }
    catch(err) {
      console.log(err);
      return;
    }

    navigation.navigate("MyProfile");
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
            <View style={globalStyles.spacer} />
            <Text style={globalStyles.title}>Become a Meepster!</Text>
            <View style={globalStyles.miniSpacer} />
              {/* TODO See how we had to copy and paste SingleLineTextInput four times? We should have a factory/generator  */}
              <Text>Phone Number:</Text>

              <SingleLineTextInput
                inputText={props.values.phoneNumber}
                placeholder={"Phone Number"}
                setText={props.handleChange("phoneNumber")}
              />
    
              <View style={globalStyles.miniSpacer} />
              <Text>Email:</Text>

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
  
              <View style={globalStyles.miniSpacer} />
              <Text>Repeat Password:</Text>

              <SingleLineTextInput
                inputText={props.values.repeatPassword}
                placeholder={"Repeat Password"}
                setText={props.handleChange("repeatPassword")}
              />
  
              <View style={globalStyles.miniSpacer} />
  
              <Button title="Continue" onPress={props.handleSubmit}/>
            </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
