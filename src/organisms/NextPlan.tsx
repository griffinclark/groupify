import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Plan } from '../models';
import { Invitee, Status, User } from '../models';
import { GOLD, GREY_0, GREY_4, TEAL } from '../res/styles/Colors';
import { formatDayOfWeekDate, formatTime, loadPhoto } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';

interface Props {
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  reload: boolean;
}

export const NextPlan: React.FC<Props> = ({ plan, navigation, reload }: Props) => {
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');
  const [acceptedInvitees, setAcceptedInvitees] = useState<Invitee[]>([]);
  const [pendingInvitees, setPendingInvitees] = useState<Invitee[]>([]);

  useEffect(() => {
    getHost(plan.creatorID);
    loadInvitees();
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, [reload]);

  const getHost = async (id: string) => {
    const user = await DataStore.query(User, id);
    if (user) {
      setHostName(user.name);
      return user.name;
    }
  };

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
    const accepted = [];
    const pending = [];
    for (let i = 0; i < invitees.length; i++) {
      const invitee = invitees[i];
      if (invitee.status === 'ACCEPTED') {
        accepted.push(invitee);
      }
      if (invitee.status === 'PENDING') {
        pending.push(invitee);
      }
    }
    setAcceptedInvitees(accepted);
    setPendingInvitees(pending);
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

  return (
    <TouchableOpacity
      style={{ paddingVertical: 10 }}
      onPress={() => navigation.navigate('PlanDetails', { plan: plan })}
    >
      <View style={styles.planContainer}>
        {photoURI ? (
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover">
            <View style={styles.dateContainer}>
              <AppText style={styles.date}>{plan.date && formatDayOfWeekDate(plan.date, true)}</AppText>
            </View>
          </Image>
        ) : null}
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <AppText style={{ fontWeight: '400', fontSize: 12, marginVertical: 12 }}>Host: {hostName}</AppText>
          <AppText style={{ fontWeight: '400', fontSize: 20 }}>{plan.description ? plan.description : null}</AppText>
          <View style={{ marginVertical: 20 }}>
            <AppText style={{ fontWeight: '700', fontSize: 12 }}>DETAILS</AppText>
            <AppText style={{ fontSize: 12, fontWeight: '400', marginVertical: 4 }}>
              Date: {plan.date && formatDayOfWeekDate(plan.date)} Time: {plan.time && formatTime(plan.time)}
            </AppText>
            <AppText style={{ fontSize: 12, fontWeight: '400' }}>Where: {plan.title}</AppText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View>
              <AppText style={{ fontSize: 12, fontWeight: '700' }}>ACCEPTED INVITES</AppText>
              <FlatList
                data={acceptedInvitees}
                renderItem={renderInvitee}
                ListEmptyComponent={() => (
                  <View>
                    <AppText style={styles.title}>No accepted invitees</AppText>
                  </View>
                )}
                horizontal={true}
              />
            </View>
            <View>
              <AppText style={{ fontSize: 12, fontWeight: '700', marginRight: '20%' }}>PENDING INVITES</AppText>
              <FlatList
                data={pendingInvitees}
                renderItem={renderInvitee}
                ListEmptyComponent={() => (
                  <View>
                    <AppText style={styles.title}>No pending invitees</AppText>
                  </View>
                )}
                horizontal={true}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
    color: GREY_0,
  },
  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: TEAL,
    flexWrap: 'wrap',
    maxWidth: 250,
    textAlign: 'left',
  },
  date: {
    fontWeight: '400',
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-end',
  },
  dateContainer: {
    backgroundColor: TEAL,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 10,
  },
});
