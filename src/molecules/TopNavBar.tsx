import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { AppText } from '../atoms/AppText';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { GREY_4, WHITE } from '../res/styles/Colors';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { JOST } from '../res/styles/Fonts';
import { GroupifyLogo } from '../../assets/Icons/GroupifyLogo';

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
  displaySettings?: boolean;
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
  displaySettings = true,
}: Props) => {
  return (
    <View style={[styles.topNavBarRoot, stickyHeader && styles.topNavBarSticky]}>
      {displayBackButton && (
        <View style={[styles.sideIcon, styles.leftIcon]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(targetScreen, { route, placesUserWantsToGoQuery, tempUserLocationQuery });
            }}
          >
            <BackChevronIcon />
          </TouchableOpacity>
        </View>
      )}

      {displayGroupify ? (
        <View style={{ marginTop: -10 }}>
          <GroupifyLogo />
        </View>
      ) : (
        <AppText style={styles.title}>{title}</AppText>
      )}

      {displaySettings && (
        <View style={[styles.sideIcon, styles.rightIcon]}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', {})}>
            <Ionicons name="md-settings-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 99,
    position: 'relative',
    padding: 10,
  },
  topNavBarSticky: {
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontFamily: JOST[500],
    textTransform: 'uppercase',
    fontSize: 16,
  },
  sideIcon: {
    position: 'absolute',
    top: 10,
  },
  leftIcon: {
    left: 10,
  },
  rightIcon: {
    right: 10,
    top: 5,
  },
});
