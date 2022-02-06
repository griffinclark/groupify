import React, { useState, useEffect } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { NavigationProps, GoogleLocation, UserLocation } from './../res/dataModels';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { GREY_6, WHITE } from '../res/styles/Colors';
import { LocationResults } from '../molecules/LocationResults';
import { LocationDetails } from '../molecules/LocationDetails';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  locations: GoogleLocation[];
  tempUserLocationQuery: string;
  userLocation: UserLocation;
  selectedLocation: GoogleLocation | undefined;
  onSelectLocation?: (location: GoogleLocation) => void
}

export const ActivitySelectorSlideUpCard: React.FC<Props> = ({ navigation, route, locations, tempUserLocationQuery, userLocation, selectedLocation, onSelectLocation = () => {}  }: Props) => {

  const slideUpMenuHeight = 650;
  const slideUpMenuBottom = 250;

  const [allowDragging, setAllowDragging] = useState(true);

  const [currentSelectedLocation, setCurrentSelectedLocation] = useState<GoogleLocation | undefined>(selectedLocation);

  const [showPlanDetails, setShowPlanDetails] = useState(false);

  // useEffect(() => {
  //   const shouldShowDetail = selectedLocation !== undefined;

  //   setShowPlanDetails(shouldShowDetail);

  //   if(shouldShowDetail) {
  //     selectLocation(locations[0]);
  //   }
  // }, []);


  useEffect(() => {
    selectLocation(selectedLocation);
  }, [selectedLocation]);


  const selectLocation = (location: GoogleLocation | undefined) => {
    if(location) {
      onSelectLocation(location);
      setCurrentSelectedLocation(location);
      setShowPlanDetails(true);
    }
    
  }

  const closeDetail = () => {
    setShowPlanDetails(false);
    setCurrentSelectedLocation(undefined);
  }
  
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
          {currentSelectedLocation && showPlanDetails ? 
            <LocationDetails location={currentSelectedLocation} userLocation={userLocation} closeLocationDetail={closeDetail}  />
            :
            <LocationResults navigation={navigation} route={route} userLocation={userLocation} locations={locations} tempUserLocationQuery={tempUserLocationQuery} onSelectLocation={selectLocation} />
          }
        </ScrollView>
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
    paddingBottom: 200
  },
  slideUpPanelIcon: {
    height: 5,
    width: 64,
    backgroundColor: GREY_6,
    position: 'absolute',
    top: 16,
    left: Dimensions.get('screen').width / 2 - 32
  },
  slideUpMenuRootContainer: {
    height: '100%',
    alignItems: 'center',
    paddingTop: 32,
    position: 'relative',
  },
});
