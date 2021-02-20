import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";

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
    }
  });

  let selectPhoto = async () => {
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    const { uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: [125, 100],
      allowsEditing: true,
    });
    if (!selectPhoto.cancelled) {
      setLocalImageURI(uri);
      setImageURI(uri);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imagePreviewContainer}>
        {/* <Image
          style={styles.imagePreview}
          source={{
            uri: localImageURI,
          }}
        /> */}
        <CircularImageDisplay imageURI={localImageURI} />
      </View>
      <View style={styles.chooseImageButtonContainer}>
        <Button title={"Select Photo"} color="#F3AD33" onPress={selectPhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: 305,
    width: 305,
  },
  imagePreview: {
    height: "95%",
    width: "95%",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  imagePreviewContainer: {
    height: 305,
    width: 305,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 5,
  },
  topContainer: {
    position: "absolute",
    top: 5,
    backgroundColor: "#fff",
    width: "20%",
    alignSelf: "flex-end",
  },
  chooseImageButtonContainer: {
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
  },
});
