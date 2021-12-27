import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { AppText } from '../atoms/AppText';
import { GoogleLocation } from '../res/dataModels';
import { GREY_3 } from '../res/styles/Colors';
import { ActivityImage } from './ActivityImage';

interface Props {
  location: GoogleLocation;
  onPress: () => void;
  image: boolean;
}

export const SearchSuggestionTile: React.FC<Props> = ({ location, onPress, image }: Props) => {
  try {
    return (
      <TouchableOpacity style={styles.searchTile} onPress={onPress}>
        <View style={styles.imageContainer}>
          {image == true ? (
            <ActivityImage referenceId={location.photos[0].photo_reference} width={30} height={30} />
          ) : (
            <MagnifyingGlassIcon />
          )}
        </View>
        <AppText>{location.name}</AppText>
      </TouchableOpacity>
    );
  } catch {
    return (
      <TouchableOpacity style={styles.searchTile} onPress={onPress}>
        <View style={styles.imageContainer}>
          <MagnifyingGlassIcon />
        </View>
        <AppText>{location.name}</AppText>
      </TouchableOpacity>
    );
  }
};
const styles = StyleSheet.create({
  searchTile: {
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: GREY_3,
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 13,
  },
});
