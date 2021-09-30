import { DataStore, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Linking, Platform } from 'react-native';
import { Screen, Button } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { formatTime, convertDateStringToDate, loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';
import { TEAL, GREY_4, GOLD, GREY_8, GRAY_LIGHT } from '../res/styles/Colors';
import { Plan, User, Invitee, Status } from '../models';
import { sendPushNotification } from '../res/notifications';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { Image } from 'react-native-elements';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (ev: string, {}) => void;
  };
  route: {
    params: {
      plan: Plan;
    };
  };
}

export const PlanDetails: React.FC<Props> = ({ navigation, route }: Props) => {
  const plan = route.params.plan;
  const [hostName, setHostName] = useState('');
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [userInvitee, setUserInvitee] = useState<Invitee>();
  const [photoURI, setPhotoURI] = useState('');
  const [showRespondOptions, setShowRespondOptions] = useState(false);
  const [refreshAttendeeList, setRefreshAttendeeList] = useState(false);

  useEffect(() => {
    setPlanHost(plan.creatorID);
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, []);

  useEffect(() => {
    loadInvitees();
  }, [refreshAttendeeList]);

  const setPlanHost = async (id: string) => {
    const user = await DataStore.query(User, id);
    if (user) {
      setHostName(user.name);
    }
  };

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
    setInvitees(invitees);
    const userInfo = await Auth.currentUserInfo();
    for (const invitee of invitees) {
      if (invitee.phoneNumber === userInfo.attributes.phone_number) {
        setUserInvitee(invitee);
        setShowRespondOptions(true);
        break;
      }
    }
  };

  const renderInvitee = ({ item }: { item: Invitee }) => {
    let backgroundColor = GOLD;
    if (item.status === Status.ACCEPTED) {
      backgroundColor = TEAL;
    } else if (item.status === Status.DECLINED) {
      backgroundColor = GREY_4;
    }
    return (
      <View style={[styles.sphere, { backgroundColor: backgroundColor }]}>
        <AppText style={styles.initial}>{item.name.slice(0, 1)}</AppText>
      </View>
    );
  };

  const respondToPlan = async (accept: boolean) => {
    const phoneNumber = (await Auth.currentUserInfo()).attributes.phone_number;
    const invitee = invitees.filter((invitee) => invitee.phoneNumber === phoneNumber)[0];
    if (accept) {
      await DataStore.save(
        Invitee.copyOf(invitee, (updated) => {
          updated.status = Status.ACCEPTED;
        }),
      );
      const host = await DataStore.query(User, plan.creatorID);
      if (host) {
        const userName = (await Auth.currentUserInfo()).attributes.name;
        sendPushNotification(host.pushToken, `${userName} has accepted your invite!`, 'Tap to open the app', {});
      }
    } else {
      await DataStore.save(
        Invitee.copyOf(invitee, (updated) => {
          updated.status = Status.DECLINED;
        }),
      );
    }
    setRefreshAttendeeList(!refreshAttendeeList);
  };

  const linkToMaps = (location: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${location}`,
      android: `geo:0,0?q=${location}`,
    });

    try {
      if (url) {
        Linking.openURL(url);
      }
    } catch (error) {
      console.log('No location found');
    }
  };

  return (
    <Screen>
      <View style={styles.titleContainer}>
        <BackChevronIcon onPress={() => navigation.goBack()} />
        <AppText style={styles.title}>Plan Details</AppText>
      </View>
      <View style={styles.bodyContainer}>
        {photoURI ? (
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover">
            <View style={styles.imageDetailContainer}>
              <AppText style={styles.imageDetail}>
                {formatDayOfWeekDate(plan.date).toString().substring(formatDayOfWeekDate(plan.date).toString().indexOf(' ') + 1)}
              </AppText>
            </View>
            <View style={styles.imageDetailContainer}>
              <AppText style={styles.imageDetail}>{formatTime(plan.time)}</AppText>
            </View>
            <View style={styles.imageDetailContainer}>
              <AppText style={styles.imageDetail}>{plan.title}</AppText>
            </View>
          </Image>
        ) : null}
        {plan.description ? <AppText>{plan.description}</AppText> : null}
      </View>
      <View style={styles.container}>
        <View style={styles.hostContainer}>
          <AppText style={styles.hostName}>{hostName}</AppText>
          <AppText style={styles.descTitle}>Host</AppText>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            {plan.date && <AppText>{convertDateStringToDate(plan.date).toDateString()}</AppText>}
            {plan.time && <AppText>{formatTime(plan.time)}</AppText>}
            <AppText style={styles.descTitle}>Date</AppText>
            <TouchableOpacity>{/* <AppText style={styles.evText4}>Add to calendar</AppText> */}</TouchableOpacity>
          </View>
          <View>
            <AppText style={{ maxWidth: 150, flexWrap: 'wrap' }}>{plan.title}</AppText>
            <AppText style={styles.descTitle}>Location</AppText>
            <TouchableOpacity onPress={() => plan.location && linkToMaps(plan.location)}>
              <AppText style={{ color: TEAL }}>View map</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.description}>
          <AppText>{plan.description}</AppText>
          <AppText style={styles.descTitle}>Description</AppText>
        </View>

        <View style={styles.inviteeList}>
          <FlatList
            data={invitees}
            renderItem={renderInvitee}
            ListEmptyComponent={() => (
              <View>
                <AppText style={styles.title}>No Attendees Yet</AppText>
              </View>
            )}
            horizontal={true}
          />
          <AppText style={styles.descTitle}>Attendees</AppText>
          <TouchableOpacity onPress={() => navigation.navigate('InviteeList', { plan: plan })}>
            <AppText style={styles.viewAll}>View All</AppText>
          </TouchableOpacity>
        </View>
      </View>
      {showRespondOptions ? (
        <View style={styles.planResponse}>
          <Button
            title={userInvitee?.status === Status.DECLINED ? 'Declined' : 'Decline'}
            onPress={() => respondToPlan(false)}
            disabled={userInvitee?.status === Status.DECLINED}
          />
          <Button
            title={userInvitee?.status === Status.ACCEPTED ? 'Accepted' : 'Accept'}
            onPress={() => respondToPlan(true)}
            disabled={userInvitee?.status === Status.ACCEPTED}
          />
        </View>
      ) : (
        <View></View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingLeft: 15,
    fontSize: 30,
    fontWeight: '400',
    color: TEAL,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: GRAY_LIGHT,
  },
  image: {
    height: 182,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    paddingRight: 6,
    alignItems: 'flex-end',
  },
  bodyContainer: {
    marginTop: 30,
    width: '85%',
    alignSelf: 'center',
  },
  imageDetail: {
    fontSize: 20,
    textAlign: 'right',
  },
  imageDetailContainer: {
    backgroundColor: TEAL,
    padding: 10,
    margin: 6,
    borderRadius: 5,
  },


  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostName: {
    fontSize: 20,
    fontWeight: '400',
  },
  descTitle: {
    fontWeight: '400',
    fontSize: 12,
    color: GREY_8,
    marginVertical: 5,
  },
  hostContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  details: {
    flexDirection: 'column',
  },
  description: {
    flex: 1,
  },
  container: {
    flex: 5,
    marginHorizontal: 25,
    marginVertical: 20,
  },
  inviteeList: {
    flex: 1,
  },
  viewAll: {
    color: TEAL,
  },
  planResponse: {
    flexDirection: 'row',
    width: '50%',
    flex: 1,
    alignItems: 'flex-end',
  },
  initial: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
});
