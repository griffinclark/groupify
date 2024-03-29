import React, { useState, useEffect } from 'react';
import Qs from 'qs';
import { StyleSheet, View, Image, FlatList, StyleProp, ViewStyle } from 'react-native';
import { GREY_4, WHITE, YELLOW } from '../res/styles/Colors';
import { Button } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { GOOGLE_PLACES_API_KEY } from '../res/utilGoogle';
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

//const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
// Also add API key to app.json config before building

export const PlaceCard: React.FC<Props> = (props: Props) => {
  const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';
  const [photos, setPhotos] = useState<JSX.Element>();
  const [top, setTop] = useState<number>(465);
  const [bottom, setBottom] = useState<number>(285);

  const draggableRange = {
    top: top,
    bottom: bottom,
  };

  useEffect(() => {
    if (props.photos) {
      loadImages();
      const newBottom = 285;
      setBottom(newBottom);
      const newTop = props.openHours ? 465 : 285;
      setTop(newTop);
    } else {
      setPhotos(undefined);
      const newBottom = props.openHours ? 170 : 155;
      setBottom(newBottom);
      const newTop = props.openHours ? 325 : 155;
      setTop(newTop);
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

    const arr = Array(5).fill(GREY_4);
    const star = Math.round(props.rating);
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
      <View style={styles.buttonContainer}>
        <Button containerStyle={styles.button} onPress={props.onButtonPress} title={'Add Location'} />
      </View>
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
  buttonContainer: {
    backgroundColor: WHITE,
    paddingBottom: 10,
    paddingTop: 1,
  },
  button: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    width: '100%',
  },
});
