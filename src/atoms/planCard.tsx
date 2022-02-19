/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Invitee, Plan } from '../models';
import { loadPhoto, formatDayOfWeekDate, getHost, getCurrentUser } from '../res/utilFunctions';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { WHITE, GREY_3, GREY_9, TEAL_0, GOLD_6, TEAL_7 } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { RoutePropParams } from '../res/root-navigation';

export interface Props {
  title: string;
  date?: string;
  location?: string;
  planId?: string;
  placeId?: string;
  creator?: boolean;
  invited?: boolean;
  creatorId: string;
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}
export const PlanCard = ({
  title,
  date,
  location,
  planId,
  placeId,
  creator,
  invited,
  creatorId,
  navigation,
  route,
  plan,
}: Props) => {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState<string | undefined>('');
  const [userIsInvited, setUserIsInvited] = useState<boolean>(false);
  const [acceptedInvite, setAcceptedInvite] = useState<boolean>(false);

  useEffect(() => {
    const loadCard = async () => {
      getHost(creatorId).then((host) => {
        setHostName(host);
      });
      if (placeId) {
        setPhotoURI(await loadPhoto(placeId));
      }
      if (creatorId === route.params.currentUser.id) {
        setUserIsInvited(true);
      }
      const allInvitees = await DataStore.query(Invitee);
      const invitees = allInvitees.filter((invitee) => invitee.plan?.id === planId);
      setInvitees(invitees);
    };
    const checkStatus = async () => {
      const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
      const currentUserStatus = await getCurrentUser().then((currentUser) => {
        if (currentUser && currentUser.id) {
        }
        const currentUserInvitee = invitees.find((invitee) => invitee.phoneNumber === currentUser.phoneNumber);
        return currentUserInvitee?.status;
      });

      if (currentUserStatus) {
        const inviteStatus = currentUserStatus.toString();
        if (inviteStatus == 'ACCEPTED') {
          setAcceptedInvite(true);
        }
      }
    };
    loadCard();
    checkStatus();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={() => navigation.push('PlanDetails', { plan: plan })} style={styles.container}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.date}>{date && formatDayOfWeekDate(date)}</Text>
            <Text numberOfLines={1} style={styles.title}>
              {title.length > 16 ? title.substring(0, 15) + '...' : title}
            </Text>
            {userIsInvited ? (
              <View style={styles.creatorContainer}>
                <Text style={styles.creatorText}>You are hosting this plan</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.hostName}>{hostName}</Text>
              </View>
            )}
          </View>

          <View>
            {photoURI ? (
              <Image source={{ uri: photoURI }} style={styles.image} />
            ) : (
              <Image source={require('../../assets/Vector.png')} style={styles.image} />
            )}
          </View>
        </View>
        <View style={styles.invited}>
          <View style={styles.invitedContainer}>
            {userIsInvited === false &&
              (acceptedInvite ? (
                <Entypo style={{ marginRight: 6 }} name="check" size={24} color={TEAL_0} />
              ) : (
                <AntDesign name="question" size={24} color={'red'} />
              ))}
            <Text style={styles.invitedText}>{invitees.length} Invited</Text>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.invitedText}>
              {location!.length > 18 ? location?.substring(0, 17) + '...' : location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: GREY_9,
  },
  container: {
    backgroundColor: WHITE,
    marginTop: 2,
    paddingBottom: 9,
    marginHorizontal: 7,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 7,
  },
  date: {
    fontSize: 16,
    fontFamily: JOST['400'],
    color: GOLD_6,
    lineHeight: 24,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '400',
    color: GREY_3,
    paddingTop: 5,
  },
  image: {
    width: 120,
    height: 110,
    borderRadius: 5,
    marginTop: 5,
  },
  invited: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    paddingVertical: 4,
  },

  invitedText: {
    fontSize: 16,
    color: GREY_3,
    marginLeft: 4,
    fontFamily: JOST['400'],
  },
  creatorContainer: {
    backgroundColor: TEAL_7,
    padding: 4,
    marginTop: 4,
    borderRadius: 3,
  },
  creatorText: {
    fontFamily: JOST['400'],
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: JOST['400'],
    marginVertical: 2,
    lineHeight: 30,
  },
  invitedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
