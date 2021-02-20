import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { SECONDARY } from "../res/styles/Colors";

interface Props {
  imageURI: string;
  setImageURI: any;
}

export default function ImageSelector({ imageURI, setImageURI }: Props) {
  // TODO rebuild this to use atomic design
  const [localImageURI, setLocalImageURI] = useState("");

  useEffect(() => {
    if (imageURI) {
      setLocalImageURI(imageURI);
    } else {
      setLocalImageURI("https://thumbs-prod.si-cdn.com/GQOrNeGTZKiIO-yl2XzJwSUMmUQ=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/49/38/4938f123-986a-478c-8402-4c538201ebc4/gettyimages-1150889841.jpg")
    }
  });

  let selectPhoto = async () => {
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    const { uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (!selectPhoto.cancelled) {
      setLocalImageURI(uri);
      setImageURI(uri);
    }
  };

  return (
    <View style={styles.rootContainer}>
      {/* IMAGE */}
      <View style={styles.imagePreviewContainer}>
        <CircularImageDisplay imageURI={localImageURI} />
      </View>
      {/* BUTTON */}
      <View style={styles.chooseImageButtonContainer}>
        <Button title={"Select Photo"} color={SECONDARY} onPress={selectPhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  imagePreviewContainer: {
    height: 200,
    width: 200,
  },
  chooseImageButtonContainer: {
    marginTop: 10,
  },
});
