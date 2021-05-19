import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { CircularImageDisplay } from '../atoms/AtomsExports';
import { SECONDARY } from '../res/styles/Colors';

interface Props {
  imageURI: string;
  setImageURI: (ev: string) => void;
}

export const ImageSelector: React.FC<Props> = ({ imageURI, setImageURI }: Props) => {
  // TODO rebuild this to use atomic design
  const [localImageURI, setLocalImageURI] = useState('');

  useEffect(() => {
    if (imageURI) {
      setLocalImageURI(imageURI);
    } else {
      setLocalImageURI(
        'https://static.wikia.nocookie.net/disney/images/0/03/Profile_-_Winnie_the_Pooh.png/revision/latest?cb=20200510194837',
      );
    }
  });

  const selectPhoto = async () => {
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
    <View>
      {/* IMAGE */}
      <View style={styles.imagePreviewContainer}>
        <CircularImageDisplay imageURI={localImageURI} />
      </View>
      {/* BUTTON */}
      <View style={styles.chooseImageButtonContainer}>
        <Button title={'Select Photo'} color={SECONDARY} onPress={selectPhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreviewContainer: {
    height: 200,
    width: 200,
  },
  chooseImageButtonContainer: {
    marginTop: 10,
  },
});
