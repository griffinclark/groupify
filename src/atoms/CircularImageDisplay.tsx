import React from "react";
import { Image, StyleSheet } from "react-native";

// XXX should this be a TouchableOpacity?

interface Props {
    imageURI: string;
    size ?: number
  }0

  export default function CircularImageDisplay({imageURI, size}: Props) {
      return(
          <Image
          style={styles.imagePreviewContainer}
          source={{
              uri: imageURI
          }}
          />
      )
  }

  let styles = StyleSheet.create({
    imagePreviewContainer: {
        height: "100%",
        width: "100%",
        borderRadius: 150,
      },
  })