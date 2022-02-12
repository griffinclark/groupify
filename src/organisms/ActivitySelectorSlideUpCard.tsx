import React, { useState, useEffect } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { NavigationProps, GoogleLocation, UserLocation } from './../res/dataModels';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { StyleSheet, View, ScrollView, Dimensions, Pressable } from 'react-native';
import { GREY_6, TEAL_0, WHITE } from '../res/styles/Colors';
import { LocationResults } from '../molecules/LocationResults';
import { LocationDetails } from '../molecules/LocationDetails';
import { AppText } from '../atoms/AppText';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  locations: GoogleLocation[];
  tempUserLocationQuery: string;
  userLocation: UserLocation;
  selectedLocation: GoogleLocation | undefined;
  onSelectLocation?: (location: GoogleLocation) => void;
}

export const ActivitySelectorSlideUpCard: React.FC<Props> = ({
  navigation,
  route,
  locations,
  tempUserLocationQuery,
  userLocation,
  selectedLocation,
  onSelectLocation,
}: Props) => {
  const slideUpMenuHeight = 650;
  const slideUpMenuBottom = 250;

  const [allowDragging, setAllowDragging] = useState(true);

  const [currentSelectedLocation, setCurrentSelectedLocation] = useState<GoogleLocation | undefined>(selectedLocation);

  const [showPlanDetails, setShowPlanDetails] = useState(false);

  useEffect(() => {
    selectLocation(selectedLocation);
  }, [selectedLocation]);

  const selectLocation = (location: GoogleLocation | undefined) => {
    if (location) {
      onSelectLocation && onSelectLocation(location);
      setCurrentSelectedLocation(location);
      setShowPlanDetails(true);
    }
  };

  const closeDetail = () => {
    setShowPlanDetails(false);
    setCurrentSelectedLocation(undefined);
  };

  return (
    <SlidingUpPanel
      height={slideUpMenuHeight}
      containerStyle={{ backgroundColor: WHITE, borderRadius: 30 }}
      snappingPoints={[slideUpMenuBottom, slideUpMenuHeight]}
      draggableRange={{ top: slideUpMenuHeight, bottom: slideUpMenuBottom }}
      backdropOpacity={0}
      allowDragging={allowDragging}
    >
      <View style={styles.slideUpMenuRootContainer}>
        <View style={styles.slideUpPanelIcon}></View>
        <ScrollView
          style={styles.slideBar}
          onTouchStart={() => setAllowDragging(false)}
          onTouchEnd={() => setAllowDragging(true)}
          onTouchCancel={() => setAllowDragging(true)}
        >
          {currentSelectedLocation && showPlanDetails ? (
            <LocationDetails
              location={currentSelectedLocation}
              userLocation={userLocation}
              closeLocationDetail={closeDetail}
            />
          ) : (
            <LocationResults
              navigation={navigation}
              route={route}
              userLocation={userLocation}
              locations={locations}
              tempUserLocationQuery={tempUserLocationQuery}
              onSelectLocation={selectLocation}
            />
          )}
        </ScrollView>
        {currentSelectedLocation && showPlanDetails && (
          <Pressable
            onPress={() => {
              navigation.navigate('PlanCreate', {
                currentUser: route.params.currentUser,
                navigation: navigation,
                data: {
                  planData: {
                    location: currentSelectedLocation.formatted_address,
                    locationName: currentSelectedLocation.name,
                    placeId: currentSelectedLocation.place_id,
                    imageURL: currentSelectedLocation.photos[0]
                      ? currentSelectedLocation.photos[0].photo_reference
                      : null,
                  },
                },
              });
            }}
          >
            <View style={styles.createPlanButton}>
              <AppText style={{ color: WHITE, fontSize: 13, fontWeight: '500', lineHeight: 19, paddingVertical: 12.5 }}>
                Groupify It
              </AppText>
            </View>
          </Pressable>
        )}
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  slideBar: {
    width: '100%',
    height: 5,
    backgroundColor: WHITE,
    borderRadius: 3,
    paddingBottom: 100,
  },
  slideUpPanelIcon: {
    height: 5,
    width: 64,
    backgroundColor: GREY_6,
    position: 'absolute',
    top: 16,
    left: Dimensions.get('screen').width / 2 - 32,
  },
  slideUpMenuRootContainer: {
    height: '100%',
    alignItems: 'center',
    paddingTop: 32,
    position: 'relative',
  },
  createPlanButton: {
    bottom: 0,
    right: 0,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    backgroundColor: TEAL_0,
    display: 'flex',
  },
});
