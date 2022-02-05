import React, { useState } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { NavigationProps, GoogleLocation } from './../res/dataModels';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { GREY_6, WHITE } from '../res/styles/Colors';
import { LocationResults } from '../molecules/LocationResults';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  locations: GoogleLocation[];
  tempUserLocationQuery: string
  onSelectLocation?: (location: GoogleLocation) => void
}

export const ActivitySelectorSlideUpCard: React.FC<Props> = ({ navigation, route, locations, tempUserLocationQuery, onSelectLocation  }: Props) => {
  const slideUpMenuHeight = 650;
  const slideUpMenuBottom = 250;

  const [allowDragging, setAllowDragging] = useState(true);

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
          <LocationResults navigation={navigation} route={route} locations={locations} tempUserLocationQuery={tempUserLocationQuery} onSelectLocation={onSelectLocation} />
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
    borderRadius: 3
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
    //marginTop: 15,
    paddingTop: 32,
    position: 'relative'
  },
});
