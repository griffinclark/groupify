import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GREY_1, WHITE } from '../res/styles/Colors';
import { User } from '../models';
import { AppText } from '../atoms/AppText';
import { CreatePlanIcon, CalendarIcon, ContactIcon, AnnounceIcon } from '../../assets/Icons/IconExports';
import { copy } from '../res/groupifyCopy';
import { NavButtonEnum, UserLocation, NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { JOST } from '../res/styles/Fonts';

interface Props {
  route: RoutePropParams;
  user?: User;
  style?: Record<string, unknown>;
  navigation: NavigationProps;
  userLocation: UserLocation;
}


export const HomeNavBar: React.FC<Props> = ({ route, user, style, navigation, userLocation }: Props) => {  
  console.log(route.name);
  const buttons = [
    {
      id: NavButtonEnum.GroupifyIt,
      name: copy.groupifyItButton,
      screen: 'SelectorMenu'
    },
    {
      id: NavButtonEnum.Plans,
      name: copy.plansButton,
      screen: 'Home'
    },
    {
      id: NavButtonEnum.Contacts,
      name: copy.friendsButton,
      screen: 'ContactList'
    },
    // {
    //   id: NavButtonEnum.Friends,
    //   name: copy.friendsButton,
    // },
    {
      id: NavButtonEnum.Notifications,
      name: copy.notificationsButton,
      screen: 'Notifications'
    },
  ];

  const navigateToScreen = async (target: string): Promise<void> => {
    try {
      let screen = '';
      switch (target) {
        case copy.groupifyItButton:
          screen = 'SelectorMenu';
          break;
        case copy.plansButton:
          screen = 'Home';
          break;
        case copy.contactButton:
          screen = 'ContactList';
          break;
        // case copy.friendsButton:
        //   screen = 'ImportContacts';
        //   break;
        case copy.notificationsButton:
          screen = 'Notifications';
          break;
      }
      navigation.navigate(screen, {
        navigation: navigation,
        route: route,
        currentUser: user,
        userLocation: userLocation,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getIcon = (id: NavButtonEnum) => {
    switch (id) {
      case copy.groupifyItButton:
        return <CreatePlanIcon width={21} height={21} />;
      case copy.contactButton:
        return <ContactIcon />;
      case copy.notificationsButton: 
        return <AnnounceIcon width={21} height={21} />;
      default:
        return <CalendarIcon width={21} height={21} />;
    }
  };

  const handleClick = (screen: string) => {
    navigation.navigate(screen, {
      navigation: navigation,
      route: route,
      currentUser: user,
      userLocation: userLocation,
    });
  }

  return (
    <View style={styles.navbar}>
      <View style={[styles.nav, style]}>
        {buttons.map((button: { id: NavButtonEnum; name: string; screen: string }) => (
          <TouchableOpacity
            onPress={() => handleClick(button.screen)}
            testID={button.id}
            key={button.id}
            style={[{ alignItems: 'center' }, route.name == button.screen ? {opacity: 1} : { opacity: 0.6}]}
          >
            {getIcon(button.id)}

            <AppText
              style={{
                color: WHITE,
                fontFamily: JOST['700'],
                fontSize: 11,
                lineHeight: 16,
                marginTop: 5,
                textAlign: 'center',
              }}
            >
              {button.name}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    // height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GREY_1,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 10,
    color: WHITE,
    textAlign: 'center',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
});
