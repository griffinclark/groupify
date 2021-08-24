import { DataStore, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Linking, Platform } from 'react-native';
import { Screen, Button } from '../atoms/AtomsExports';
import { formatTime, convertDateStringToDate, loadPhoto } from '../res/utilFunctions';
import { TEAL, GREY_4, GOLD, GREY_8 } from '../res/styles/Colors';
import { Plan, User, Invitee, Status } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { sendPushNotification } from '../res/notifications';

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
        <Text style={styles.initial}>{item.name.slice(0, 1)}</Text>
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
        <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{plan.title}</Text>
      </View>
      {photoURI ? <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" /> : null}
      <View style={styles.container}>
        <View style={styles.hostContainer}>
          <Text style={styles.hostName}>{hostName}</Text>
          <Text style={styles.descTitle}>Host</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            {plan.date && <Text>{convertDateStringToDate(plan.date).toDateString()}</Text>}
            {plan.time && <Text>{formatTime(plan.time)}</Text>}
            <Text style={styles.descTitle}>Date</Text>
            <TouchableOpacity>{/* <Text style={styles.evText4}>Add to calendar</Text> */}</TouchableOpacity>
          </View>
          <View>
            <Text style={{ maxWidth: 150, flexWrap: 'wrap' }}>{plan.title}</Text>
            <Text style={[styles.descTitle]}>Location</Text>
            <TouchableOpacity onPress={() => plan.location && linkToMaps(plan.location)}>
              <Text style={{ color: TEAL }}>View map</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.description}>
          <Text>{plan.description}</Text>
          <Text style={styles.descTitle}>Description</Text>
        </View>

        <View style={styles.inviteeList}>
          <FlatList
            data={invitees}
            renderItem={renderInvitee}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.title}>No Attendees Yet</Text>
              </View>
            )}
            horizontal={true}
          />
          <Text style={styles.descTitle}>Attendees</Text>
          <TouchableOpacity onPress={() => navigation.navigate('InviteeList', { plan: plan })}>
            <Text style={styles.viewAll}>View All</Text>
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
  image: {
    height: 200,
    width: '100%',
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
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: TEAL,
    flexWrap: 'wrap',
    maxWidth: 250,
    textAlign: 'right',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
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
  // boxShadow: {
  //   elevation: 5,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 1, height: 1 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 2,
  //   padding: 8,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   maxHeight: 80,
  // },
});
