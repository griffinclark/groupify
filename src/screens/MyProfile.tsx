import { Formik } from "formik";
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
import NavigationButton from "./../atoms/NavigationButton";
import ImageSelector from "../molecules/ImageSelector";
import { TEST_HIGH_CONTRAST } from "./../res/styles/Colors";
import MultiLineTextInput from "./../atoms/MultiLineTextInput";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  navigation: any;
  lastScreen: any; // This screen can be accessed form multiple places. We want the user to return to where they came from when they're done
}

export default function CreateAccount({ navigation, lastScreen }: Props) {
  return (
      <SafeAreaView style={globalStyles.defaultRootContainer}>
          <View style={{ padding: 24 }}>
            <Formik
              initialValues={{
                name: "", // TODO split into first and last name
                username: "",
                bio: "",
                imageURI: "",
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
                  <Text style={globalStyles.title}>My Profile</Text>
                  <View style={globalStyles.miniSpacer} />
                  <View>
                  <Text>First and last name:</Text>

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
                  <NavigationButton
                    title="Continue"
                    onNavButtonPressed={() => {
                      props.handleSubmit;
                    }}
                    destination={"AddFriends"}
                    navigation={navigation}
                  />
                </View>
              )}
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
