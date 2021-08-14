import { DataStore, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Screen, Button } from '../atoms/AtomsExports';
import { formatTime, convertDateStringToDate, loadPhoto } from '../res/utilFunctions';
import { TEAL, WHITE, GREY_0, GREY_4, GOLD } from '../res/styles/Colors';
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

  const pressed = () => {
    console.warn('coming soon!');
  };

  return (
    <Screen>
      <View style={{ top: 38, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>{plan.title}</Text>
        <Icon name="close" type="fa" style={{ paddingVertical: 4 }} size={40} onPress={() => navigation.goBack()} />
      </View>
      {photoURI ? <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" /> : null}
      <View>
        <Text style={styles.hostName}>{hostName}</Text>
        <Text style={styles.hostNameTitle}>Host</Text>
      </View>

      <View style={{ left: 20, top: 150 }}>
        <Text>{convertDateStringToDate(plan.date).toDateString()}</Text>
        <Text>{formatTime(plan.time)}</Text>
        <Text style={styles.evText3}>Date</Text>
        <TouchableOpacity style={{ height: 25 }} onPress={pressed}>
          {/* <Text style={styles.evText4}>Add to calendar</Text> */}
        </TouchableOpacity>
      </View>

      <View style={{ left: 180, top: 70, width: 180 }}>
        <Text>{plan.location}</Text>
        <Text style={[styles.evText3]}>Location</Text>
        <TouchableOpacity style={{ height: 25 }} onPress={pressed}>
          {/* <Text style={{ color: '#31A59F' }}>View map</Text> */}
        </TouchableOpacity>
      </View>

      <View style={{ top: 100 }}>
        <Text style={styles.desc2}>{plan.description}</Text>
        <Text style={styles.desc1}>Description</Text>
      </View>
      <View style={{ top: 160 }}>
        <FlatList
          style={styles.inviteesList}
          data={invitees}
          renderItem={renderInvitee}
          ListEmptyComponent={() => (
            <View style={styles.title}>
              <Text>No Attendees Yet</Text>
            </View>
          )}
          horizontal={true}
        />
        <Text style={styles.desc3}>Attendees</Text>
        <TouchableOpacity onPress={() => navigation.navigate('InviteeList', { plan: plan })}>
          <Text style={styles.evText5}>View All</Text>
        </TouchableOpacity>
      </View>
      {showRespondOptions ? (
        <View style={styles.planResponse}>
          <Button
            containerStyle={styles.button}
            buttonStyle={styles.declineButton}
            title={userInvitee?.status === Status.DECLINED ? 'Declined' : 'Decline'}
            onPress={() => respondToPlan(false)}
            disabled={userInvitee?.status === Status.DECLINED}
          />
          <Button
            containerStyle={styles.button}
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
    fontSize: 25,
    color: TEAL,
    left: 20,
    width: '80%',
    fontWeight: 'bold',
  },
  inviteImg: {
    width: '100%',
    height: 200,
    top: 40,
  },
  hostName: {
    position: 'absolute',
    width: 300,
    top: 60,
    marginLeft: 18,
    fontSize: 25,
    color: '#31A59F',
  },
  hostNameTitle: {
    position: 'absolute',
    width: 150,
    top: 78,
    marginLeft: 20,
    marginTop: 10,
    color: '#616060',
  },
  image: {
    height: 200,
    width: '100%',
    top: 55,
  },
  evText3: {
    fontSize: 12,
    color: '#616060',
    width: 86,
    height: 16,
  },
  evText4: {
    fontSize: 12,
    color: '#31A59F',
  },
  evText5: {
    left: 20,
    fontSize: 12,
    color: TEAL,
    top: 15,
  },
  desc1: {
    fontSize: 12,
    color: '#616060',
    marginLeft: 20,
  },
  desc2: {
    left: 20,
  },
  desc3: {
    fontSize: 12,
    color: '#616060',
    top: 15,
    marginLeft: 20,
  },
  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 5,
    alignItems: 'center',
  },
  initial: {
    top: 5,
    fontSize: 20,
    color: WHITE,
  },
  inviteesList: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  planResponse: {
    maxWidth: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '2%',
  },
  button: {
    width: '50%',
  },
  declineButton: {
    backgroundColor: WHITE,
    color: GREY_0,
    borderWidth: 2,
    borderColor: TEAL,
  },
});
