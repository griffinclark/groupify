import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GREY_1, WHITE } from '../res/styles/Colors';
import { User } from '../models';
import { AppText } from '../atoms/AppText';
import { CreatePlanIcon } from '../../assets/Icons/IconExports';
import { copy } from '../res/groupifyCopy';
import { NavButtonEnum, UserLocation, NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { CalendarIcon } from './../../assets/Icons/CalendarIcon';

interface Props {
  route: RoutePropParams;
  user: User;
  style?: Record<string, unknown>;
  navigation: NavigationProps;
  userLocation: UserLocation;
}

export const HomeNavBar: React.FC<Props> = ({ route, user, style, navigation, userLocation }: Props) => {
  const buttons = [
    {
      id: NavButtonEnum.GroupifyIt,
      name: copy.groupifyItButton,
    },
    {
      id: NavButtonEnum.Plans,
      name: copy.plansButton,
    },
    // {
    //   id: NavButtonEnum.Friends,
    //   name: copy.friendsButton,
    // },
    // {
    //   id: NavButtonEnum.Notifications,
    //   name: copy.notificationsButton,
    // },
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
        // case copy.friendsButton:
        //   screen = 'ImportContacts';
        //   break;
        // case copy.notificationsButton:
        //   screen = 'Profile';
        //   break;
      }
      navigation.navigate(screen, {
        navigation: navigation,
        route: route,
        currentUser: user,
        UserLocation: userLocation,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getIcon = (id: NavButtonEnum) => {
    switch (id) {
      case copy.groupifyItButton:
        return <CreatePlanIcon />;
      default:
        return <CalendarIcon />;
    }
  };

  return (
    <View style={styles.navbar}>
      <View style={[styles.nav, style]}>
        {buttons.map((button: { id: NavButtonEnum; name: string }) => (
          <TouchableOpacity
            onPress={async () => {
              console.log(user);
              navigateToScreen(button.id);
            }}
            testId={button.id}
            key={button.id}
          >
            {getIcon(button.id)}
            <AppText style={{ color: WHITE }}>{button.name}</AppText>
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('ViewPlans', {});
          }}
        >
          <AnnounceIcon />
          <AppText style={styles.text}>{copy.leftNavButton}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          // onPress={() => {
          //   navigation.push('ActivitySelector', { currentUser: user });
          // }}
          onPress={() => {
            navigation.navigate('SelectorMenu', {
              currentUser: user,
              locations: locations, // TODO is this needed?
              userLocation: route.params.userLocation,
              data: {
                activitySearchData: { tempUserLocation: route.params.userLocation },
              },
            });
          }}
        >
          <CreatePlanIcon />
          <AppText style={styles.text}>{copy.centerNavButton}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('Profile', {
              currentUser: user,
              currentUserPlan: userPlans[0] ? userPlans[0] : invitedPlans[0],
            });
          }}
        >
          <SettingsIcon />
          <AppText style={styles.text}>{copy.rightNavButton}</AppText>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: GREY_1,
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
