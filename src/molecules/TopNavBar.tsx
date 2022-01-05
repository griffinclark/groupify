import React from 'react';
import { StyleSheet, View, Image, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { AppText } from '../atoms/AppText';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { GREY_1, GREY_4, WHITE } from '../res/styles/Colors';

interface Props {
  title?: string;
  navigation: NavigationProps;
  displayGroupify: boolean;
  route: RoutePropParams;
  targetScreen: string;
  placesUserWantsToGoQuery?: string;
  tempUserLocationQuery?: string;
}

export const TopNavBar: React.FC<Props> = ({
  title,
  navigation,
  displayGroupify,
  route,
  targetScreen,
  placesUserWantsToGoQuery,
  tempUserLocationQuery,
}: Props) => {
  return (
    <View style={styles.topNavBarRoot}>
      <TouchableOpacity
        onPress={() => {
          // console.log('navigating ' + targetScreen);
          navigation.navigate(targetScreen, { route, placesUserWantsToGoQuery, tempUserLocationQuery });
        }}
      >
        <BackChevronIcon />
      </TouchableOpacity>
      {displayGroupify ? (
        <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
      ) : (
        <AppText style={styles.navbarLogo}>{title}</AppText>
      )}
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  navbarLogo: {
    height: 45,
    width: 160,
    // position: 'absolute',
    // alignSelf: 'center',
  },
  topNavBarRoot: {
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
});
