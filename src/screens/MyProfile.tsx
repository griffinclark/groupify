import { Formik, FormikProps } from "formik";
import React from "react";
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import SingleLineTextInput from "./../atoms/SingleLineTextInput";
import ImageSelector from "../molecules/ImageSelector";
import { TEST_HIGH_CONTRAST } from "../res/styles/Colors";
import MultiLineTextInput from "./../atoms/MultiLineTextInput";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PhoneNumber } from "expo-contacts";

// TODO @David add data here into FB

// TODO: type these
interface Props {
  navigation: any;
  route: any;
}

interface ProfileForm {
  // TODO split first / last name (localization: first/last is a bit western, works differently elsewhere)
  name: string,
  username: string,
  bio: string,
  imageURI: string,
}

export default function MyProfile({ navigation, route }: Props) {
  let init: ProfileForm = {
    name: "",
    username: "",
    bio: "",
    imageURI: "",
  };

  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <View style={{ padding: 24 }}>
        <Formik
          initialValues={init}
          onSubmit={() => console.log("not implemented")}
        >
          {(props) => {
            return (
              <View>
                <View style={globalStyles.miniSpacer} />
                {/* TODO See how we had to copy and paste SingleLineTextInput four times? We should have a factory/generator  */}
                <Text style={globalStyles.title}>My Profile</Text>
                <View style={globalStyles.miniSpacer} />
                <View>
                  <Text>Name/Nickname</Text>

                  <SingleLineTextInput
                    inputText={props.values.name}
                    placeholder={"Whinnie the Pooh"}
                    setText={props.handleChange("name")}
                  />

                  <View style={globalStyles.miniSpacer} />
                  <Text>Username:</Text>
                  <SingleLineTextInput
                    inputText={props.values.username}
                    placeholder={"Whinnie4Lyfe"}
                    setText={props.handleChange("username")}
                  />

                  <View style={globalStyles.miniSpacer} />
                  <Text>Bio:</Text>
                  <MultiLineTextInput
                    inputText={props.values.bio}
                    placeholder={"Things I like: \n1. 🍯 \n2. Hunting endangered animals and taking their 🍯"}
                    setText={props.handleChange("bio")}
                  />
                </View>

                <View style={styles.profileImageContainer}>
                  <View style={globalStyles.miniSpacer} />
                  <ImageSelector
                    imageURI={props.values.imageURI}
                    setImageURI={props.handleChange("imageURI")}
                  />
                </View>
                <View style={globalStyles.miniSpacer} />
                <Button title="Click me!" onPress={() => props.handleSubmit()} />
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  profileImageContainer: {
    width: "100%",
    // backgroundColor: TEST_HIGH_CONTRAST,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
