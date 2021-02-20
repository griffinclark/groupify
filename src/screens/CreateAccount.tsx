import { Formik } from "formik";
import React from "react";
import { SafeAreaView, View, Button, Text } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import SingleLineTextInput from "./../atoms/SingleLineTextInput";
import NavigationButton from './../atoms/NavigationButton';

interface Props {
  navigation: any;
}

export default function CreateAccount({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Formik
        initialValues={{
          phoneNumber: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={(values) => {
            // TODO remember to check password and repeatPassword to make sure they're the same
          console.log(
            "@David is going to handle creating user accounts any day now...."
          );
        }}
      >
        {(props) => (
          <View>
                 <View style={globalStyles.miniSpacer} />
                  {/* TODO See how we had to copy and paste SingleLineTextInput four times? We should have a factory/generator  */}
                <SingleLineTextInput
                    inputText={props.values.phoneNumber}
                    placeholder={"Phone Number"}
                    setText={props.handleChange("phoneNumber")}
                  />
      
                  <View style={globalStyles.miniSpacer} />
      
                  <SingleLineTextInput
                    inputText={props.values.phoneNumber}
                    placeholder={"Email"}
                    setText={props.handleChange("email")}
                  />
      
                  <View style={globalStyles.miniSpacer} />
      
                  <SingleLineTextInput
                    inputText={props.values.phoneNumber}
                    placeholder={"Password"}
                    setText={props.handleChange("password")}
                  />
      
                  <View style={globalStyles.miniSpacer} />
      
                  <SingleLineTextInput
                    inputText={props.values.phoneNumber}
                    placeholder={"Repeat Password"}
                    setText={props.handleChange("repeatPassword")}
                  />
      
                  <View style={globalStyles.megaSpacer} />
      
                  <NavigationButton title="Continue" onNavButtonPressed={()=>{props.handleSubmit}} destination={"MyProfile"} navigation={navigation} />
                </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
