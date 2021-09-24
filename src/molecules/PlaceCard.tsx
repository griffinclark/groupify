import React, { useState, useEffect, useRef } from 'react';
import Qs from 'qs';
import { Animated, StyleSheet, View, Image, FlatList, StyleProp, ViewStyle, useWindowDimensions } from 'react-native';
import { WHITE, YELLOW } from '../res/styles/Colors';
import { Button } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  address: string;
  // distance?: string;
  // duration?: string;
  rating?: number;
  userRatings?: number;
  priceLevel?: number;
  // openNow?: boolean;
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
  const draggableRange = {
    top: props.openHours ? 400 : 275,
    bottom: 275,
  };

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

  const renderStars = () => {
    if (!props.rating) return null;

    const arr = Array(5).fill('#c4c4c4');
    const star = Math.floor(props.rating);
    let i = 0;
    while (i < star) {
      arr[i] = YELLOW;
      i++;
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        {arr.map((ele, idx) => (
          <Icon color={ele} key={idx} name="star" type="font-awesome" size={16} />
        ))}
      </View>
    );
  };

  const displayHour = (str: string) => {
    const arr = str.split(/:00|:| /);
    const day = arr.shift();

    return `${day} ${arr.join('')}`;
  };

  return (
    <View style={[styles.defaultContainer, props.style]}>
      <SlidingUpPanel draggableRange={draggableRange}>
        <View style={styles.slideContainer}>
          {photos ? photos : null}
          <View style={styles.wholeTextContainer}>
            <AppText maxFontSizeMultiplier={1} numberOfLines={1} style={styles.placeName}>
              {props.name}
            </AppText>
            <View style={styles.midDetails}>
              {props.rating && renderStars()}
              <AppText style={{ fontSize: 12 }}>{props.userRatings && `${props.userRatings} Reviews`}</AppText>
              <AppText style={{ fontSize: 12 }}>{props.priceLevel && `${'$'.repeat(props.priceLevel)}`}</AppText>
            </View>
            <AppText maxFontSizeMultiplier={1} style={styles.placeAddress}>
              {props.address}
            </AppText>
            {props.openHours ? (
              <View style={styles.openHoursContainer}>
                <AppText maxFontSizeMultiplier={1} style={styles.openHoursTitle}>
                  Hours:
                </AppText>

                <View style={styles.openHours}>
                  <View style={{ marginRight: 28 }}>
                    {props.openHours.slice(0, 5).map((value, idx) => (
                      <AppText key={idx} maxFontSizeMultiplier={1} style={styles.openHoursText}>
                        {displayHour(value)}
                      </AppText>
                    ))}
                  </View>
                  <View>
                    {props.openHours.slice(5, 7).map((value, idx) => (
                      <AppText key={idx} maxFontSizeMultiplier={1} style={styles.openHoursText}>
                        {displayHour(value)}
                      </AppText>
                    ))}
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </SlidingUpPanel>
      {/* <View style={styles.buttonContainer}> */}
      <Button containerStyle={styles.button} onPress={props.onButtonPress} title={'Add Location'} />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    // flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  imageContainer: {
    height: 120,
  },
  image: {
    height: 120,
    width: 150,
  },
  slideContainer: {
    backgroundColor: WHITE,
  },
  wholeTextContainer: {
    // marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
  },
  midDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    width: 210,
  },
  placeAddress: {
    fontSize: 12,
    marginBottom: 20,
    fontWeight: '300',
  },
  openHoursContainer: {},
  openHoursTitle: {
    fontSize: 12,
    marginBottom: 7,
  },
  openHours: {
    flexDirection: 'row',
  },
  openHoursText: {
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    alignItems: 'flex-end',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    width: '100%',
  },
});
