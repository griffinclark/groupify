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
import NavigationButton from "./../atoms/NavigationButton";
import ImageSelector from "../molecules/ImageSelector";
import { TEST_HIGH_CONTRAST } from "./../res/styles/Colors";
import MultiLineTextInput from "./../atoms/MultiLineTextInput";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { firestore, auth } from "../res/services/firebase";
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

// TODO: number canonicalization
async function updateProfile(
  name: string,
  username: string,
  bio: string,
  imageURI: string,
  phone: string | undefined
): Promise<boolean> {
  // TODO don't let users leave this screen until all profile information is filled in
  if (!auth.currentUser) {
    console.log("How did we get here? Tried to submit profile for no user!");
    return false;
    // TODO: ??? What do we do here? (fatal: never happens in expected flow)
  }

  const ref = firestore.collection("profiles").doc(auth.currentUser.uid);
  let doc = {
    name: name,
    username: username,
    bio: bio,
    imageURI: imageURI,
    version: 0
  };

  if (phone) {
    await ref.set({...doc, phone});
  }
  else {
    await ref.set(doc);
  }

  console.log("Created Profile!");

  return true;
}

async function loadProfile(props: FormikProps<ProfileForm>): Promise<void> {
  try {
    console.log("Attempting load");
    if (auth.currentUser) {
      const ref = firestore.collection("profiles").doc(auth.currentUser.uid);
      const data = (await ref.get()).data();
      if (!data) {
        console.log("No profile existed");
        return;
      };

      console.log(data);
      props.handleChange("name")(data.name);
      props.handleChange("username")(data.username);
      props.handleChange("bio")(data.bio);
      props.handleChange("imageURI")(data.imageURI);
      console.log("Loaded profile data");
    }
  }
  catch (err) {
    console.log("Load faile");
    console.log(err);
  }
};

export default function MyProfile({ navigation, route }: Props) {
  const profileTrigger = async ({ name, username, bio, imageURI }: ProfileForm) => {
    if (await updateProfile(name, username, bio, imageURI, route.params)) {
      navigation.goBack();
    }
  }

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
          onSubmit={profileTrigger}
        >
          {(props) => {
            return (
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
                <Button title="Click me!" onPress={() => props.handleSubmit()} />
                <Button title="Load!" onPress={() => loadProfile(props)} />
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
