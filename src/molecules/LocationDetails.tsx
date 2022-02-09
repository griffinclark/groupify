import React, { useState, useEffect, useMemo } from 'react';
import { GoogleLocation, UserLocation } from '../res/dataModels';
import { ActivityImage } from '../molecules/ActivityImage';
import { LocationRating } from '../molecules/LocationRating';
import { LocationAddress } from '../molecules/LocationAddress';
import { Dimensions, View, StyleSheet } from 'react-native';
import { durationCalculation } from '../res/utilGoogle';
import { AppText } from '../atoms/AppText';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { loadPlaceDetails } from '../res/utilFunctions';

interface Props {
  location: GoogleLocation;
  userLocation: UserLocation;
  closeLocationDetail?: () => void;
}

export const LocationDetails: React.FC<Props> = ({ location, userLocation, closeLocationDetail }: Props) => {
  const [placeDetails, setPlaceDetails] = useState<GoogleLocation>();
  const [duration, setDuration] = useState('No Data');

  useEffect(() => {
    (async () => {
      setPlaceDetails(await loadPlaceDetails(location.place_id));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setDuration(
        await durationCalculation(
          { lat: userLocation.latitude, lng: userLocation.longitude },
          location.geometry.location,
        ),
      );
    })();
  }, [userLocation]);


  const imageGallery: JSX.Element[] = [];
  if (placeDetails && placeDetails.photos) {
    placeDetails.photos.slice(0, Math.min(4, placeDetails.photos.length)).map((photo) => {
      imageGallery.push(
        <ActivityImage
          containerStyle={{ marginBottom: 5 }}
          referenceId={photo.photo_reference}
          height={Dimensions.get('window').width / 2 - 25}
          width={Dimensions.get('window').width / 2 - 25}
          key={photo.photo_reference}
        />,
      );
    });
  }

  const reviewsRow: JSX.Element[] = [];
  if (placeDetails && placeDetails.reviews) {
    placeDetails.reviews.slice(0, Math.min(5, placeDetails.reviews.length)).map((review, index) => {
      reviewsRow.push(
        <View style={styles.reviewSingle} key={index}>
          <LocationRating containerStyle={styles.paddingBottomTen} rating={review.rating} />

          <AppText style={styles.reviewText}>{review.text}</AppText>
        </View>,
      );
    });
  }

  return (
    <View style={styles.locationDetailsContainer}>
      <View style={styles.header}>
        <BackChevronIcon onPress={closeLocationDetail} />
        <AppText style={styles.name}>{location.name}</AppText>
      </View>

      {location.photos && (
        <ActivityImage
          containerStyle={styles.paddingBottomTen}
          referenceId={location.photos[0].photo_reference}
          height={150}
          width={Dimensions.get('window').width - 40}
        />
      )}

      <LocationRating
        containerStyle={styles.paddingBottomTen}
        rating={location.rating}
        ratingTotal={location.user_ratings_total}
      />

      <LocationAddress formattedAddress={location.formatted_address} />

      <AppText style={styles.driveTime}>Drive Time: {duration}</AppText>

      {imageGallery.length ? <View style={styles.galleryContainer}>{imageGallery}</View> : null}

      {reviewsRow.length ? (
        <View style={styles.reivewsRow}>
          <AppText style={styles.reviewTitle}>Reviews</AppText>
          {reviewsRow}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  locationDetailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  name: {
    fontSize: 20,
    paddingLeft: 15,
  },
  paddingBottomTen: {
    paddingBottom: 10,
  },
  driveTime: {
    fontSize: 16,
    marginTop: 5,
  },
  galleryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  reivewsRow: {
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  reviewSingle: {
    marginTop: 24,
  },
  reviewText: {
    fontSize: 16,
  },
});
