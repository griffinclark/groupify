import { Formik } from "formik";
import React from "react";
import { SafeAreaView, View, Button, StyleSheet, Text } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import SingleLineTextInput from "./../atoms/SingleLineTextInput";
import NavigationButton from "./../atoms/NavigationButton";
import ImageSelector from "../molecules/ImageSelector";
import { TEST_HIGH_CONTRAST } from './../res/styles/Colors';

interface Props {
  navigation: any;
  lastScreen: any; // This screen can be accessed form multiple places. We want the user to return to where they came from when they're done
}

export default function CreateAccount({ navigation, lastScreen }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Formik
        initialValues={{
          phoneNumber: "",
          imageURI: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={(values) => {
          // TODO don't let users leave this screen until all profile information is filled in
          console.log(
            "@David is going to handle adding profile information any day now...."
          );
        }}
      >
        {(props) => (
          <View>
            <View style={globalStyles.miniSpacer} />
            {/* TODO See how we had to copy and paste SingleLineTextInput four times? We should have a factory/generator  */}
            <View style={styles.profileImageContainer}>
                <Text style={globalStyles.title}>Profile Photo</Text>
                <View style={globalStyles.miniSpacer} />
            <ImageSelector
                imageURI={props.values.imageURI}
                setImageURI={props.handleChange("imageURI")}
              />
            </View>
            <View>
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
            </View>

            <View style={globalStyles.megaSpacer} />

            <NavigationButton
              title="Continue"
              onNavButtonPressed={() => {
                props.handleSubmit;
              }}
              destination={"Welcome"}
              navigation={navigation}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  profileImageContainer: {
    width: "100%",
    // backgroundColor: TEST_HIGH_CONTRAST,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
