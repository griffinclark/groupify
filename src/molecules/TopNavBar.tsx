import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { AppText } from '../atoms/AppText';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { GREY_4, WHITE } from '../res/styles/Colors';
import Constants from 'expo-constants';

interface Props {
  title?: string;
  navigation: NavigationProps;
  displayGroupify: boolean;
  displayBackButton?: boolean;
  route: RoutePropParams;
  targetScreen: string;
  placesUserWantsToGoQuery?: string;
  tempUserLocationQuery?: string;
  stickyHeader?: boolean;
}

export const TopNavBar: React.FC<Props> = ({
  title,
  navigation,
  displayGroupify,
  displayBackButton = true,
  route,
  targetScreen,
  placesUserWantsToGoQuery,
  tempUserLocationQuery,
  stickyHeader = true,
}: Props) => {
  return (
    <View style={[styles.topNavBarRoot, stickyHeader && styles.topNavBarSticky]}>
      <TouchableOpacity
        onPress={() => {
          // console.log('navigating ' + targetScreen);
          navigation.navigate(targetScreen, { route, placesUserWantsToGoQuery, tempUserLocationQuery });
        }}
      >
        {displayBackButton ? <BackChevronIcon /> : null}
      </TouchableOpacity>
      {displayGroupify ? (
        <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
      ) : (
        <AppText>{title}</AppText>
      )}
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  navbarLogo: {
    height: 24,
    width: 108,
  },
  topNavBarRoot: {
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: Constants.statusBarHeight + 50,
    zIndex: 99,
    position: 'absolute',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topNavBarSticky: {
    marginTop: Constants.statusBarHeight,
  },
});
