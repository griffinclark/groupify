import React, { useState, useEffect } from 'react';
import Qs from 'qs';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { GREY_1 } from '../res/styles/Colors';
import { Button } from '../atoms/AtomsExports';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface PlaceCardProps {
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

const GOOGLE_PLACES_API_KEY = 'AIzaSyBr9OxC0pDU3nICMQDfSjnJ777vnZfsNww'; // replace with MunchkinLabs API key
// Also add API key to app.json config before building

export const PlaceCard: React.FC<PlaceCardProps> = (props: PlaceCardProps) => {
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
        <Text style={styles.placeName}>{props.name}</Text>
        <Text style={styles.placeAddress}>{props.address}</Text>
        <View style={styles.bottomTextContainer}>
          {props.openHours ? (
            <ScrollView style={styles.openHoursContainer}>
              <Text style={styles.openHoursTitle}>Opening Hours</Text>
              <Text style={styles.openHoursText}>{props.openHours?.map((value) => value + '\n')}</Text>
            </ScrollView>
          ) : null}
          <View style={styles.detailsContainer}>
            <View>
              {props.rating ? (
                <Text style={styles.placeDetails}>
                  {props.rating ? `${props.rating} / 5 stars\n` : null}
                  {props.userRatings ? `${props.userRatings} ratings` : null}
                </Text>
              ) : null}
              <Text style={styles.placeDetails}>
                {props.priceLevel ? `${'$'.repeat(props.priceLevel)}   |   ` : ''}
                {`${props.distance} away`}
              </Text>
              <Text>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Purple-car.svg/1221px-Purple-car.svg.png',
                  }}
                  style={{ height: 10, width: 14 }}
                />
                <Text> {`${props.duration} drive`}</Text>
              </Text>
              {props.openNow !== undefined ? (
                <Text>
                  {props.openNow ? (
                    <Text style={{ color: 'green' }}>Open</Text>
                  ) : (
                    <Text style={{ color: 'red' }}>Closed</Text>
                  )}
                </Text>
              ) : null}
            </View>
            <Button onPress={props.onButtonPress} title={'Confirm'} />
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
