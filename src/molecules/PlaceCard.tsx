import React, { useState, useEffect } from 'react';
import Qs from 'qs';
import { StyleSheet, View, Image, FlatList, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { GREY_1 } from '../res/styles/Colors';
import { AppText, Button } from '../atoms/AtomsExports';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  address: string;
  distance?: string;
  duration?: string;
  rating?: number;
  userRatings?: number;
  priceLevel?: number;
  openNow?: boolean;
  openHours?: string[];
  photos?: string[]; // Array of Google's photo references
  onButtonPress: () => void;
  onCloseButtonPress: () => void;
}

const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
// Also add API key to app.json config before building

export const PlaceCard: React.FC<Props> = (props: Props) => {
  const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';
  const [photos, setPhotos] = useState<JSX.Element>();

  useEffect(() => {
    if (props.photos) {
      loadImages();
    } else {
      setPhotos(undefined);
    }
  }, [props.photos]);

  const loadPhoto = (photoReference: string) => {
    const photoRequetsParams = {
      key: GOOGLE_PLACES_API_KEY,
      maxwidth: 200,
      maxheight: 200,
      photoreference: photoReference,
    };
    const completeUri = photoRequestURL + Qs.stringify(photoRequetsParams);
    return <Image source={{ uri: completeUri }} style={styles.image} resizeMode="cover" />;
  };

  const loadImages = () => {
    if (props.photos) {
      setPhotos(
        <FlatList
          style={styles.imageContainer}
          data={props.photos}
          renderItem={({ item }) => loadPhoto(item)}
          keyExtractor={(photo) => photo}
          horizontal={true}
        />,
      );
    }
  };

  return (
    <View style={[styles.defaultContainer, props.style]}>
      <View style={{ alignSelf: 'flex-start' }}>
        <Icon
          name="close-o"
          type="evilicon"
          style={{ paddingVertical: 4 }}
          size={40}
          onPress={() => props.onCloseButtonPress()}
        />
      </View>
      {photos ? photos : null}
      <View style={styles.wholeTextContainer}>
        <AppText style={styles.placeName}>{props.name}</AppText>
        <AppText style={styles.placeAddress}>{props.address}</AppText>
        <View style={styles.bottomTextContainer}>
          {props.openHours ? (
            <ScrollView style={styles.openHoursContainer}>
              <AppText style={styles.openHoursTitle}>Opening Hours</AppText>
              <AppText style={styles.openHoursText}>{props.openHours?.map((value) => value + '\n')}</AppText>
            </ScrollView>
          ) : null}
          <View style={styles.detailsContainer}>
            <View>
              {props.rating ? (
                <AppText style={styles.placeDetails}>
                  {props.rating ? `${props.rating} / 5 stars\n` : null}
                  {props.userRatings ? `${props.userRatings} ratings` : null}
                </AppText>
              ) : null}
              <AppText style={styles.placeDetails}>
                {props.priceLevel ? `${'$'.repeat(props.priceLevel)}   |   ` : ''}
                {`${props.distance} away`}
              </AppText>
              <AppText>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Purple-car.svg/1221px-Purple-car.svg.png',
                  }}
                  style={{ height: 10, width: 14 }}
                />
                <AppText> {`${props.duration} drive`}</AppText>
              </AppText>
              {props.openNow !== undefined ? (
                <AppText>
                  {props.openNow ? (
                    <AppText style={{ color: 'green' }}>Open</AppText>
                  ) : (
                    <AppText style={{ color: 'red' }}>Closed</AppText>
                  )}
                </AppText>
              ) : null}
            </View>
            <Button onPress={props.onButtonPress} title={'Select Location'} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  imageContainer: {
    flex: 1,
    height: 10,
  },
  image: {
    height: 100,
    width: 150,
  },
  wholeTextContainer: {
    flex: 2.5,
    margin: 10,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  placeAddress: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '200',
  },
  bottomTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  openHoursContainer: {
    flex: 1,
    marginRight: 20,
  },
  openHoursTitle: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: GREY_1,
    marginBottom: 5,
  },
  openHoursText: {
    fontSize: 12,
    color: GREY_1,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  placeDetails: {
    fontSize: 14,
    color: GREY_1,
  },
});
