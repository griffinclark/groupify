/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Invitee, Plan } from '../models';
import { loadPhoto, formatDayOfWeekDate, getHost } from '../res/utilFunctions';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { WHITE, GOLD, GREY_3, GREEN, TEAL } from '../res/styles/Colors';

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
  plan,
}: Props) => {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');

  useEffect(() => {
    const loadCard = async () => {
      getHost(creatorId).then((host) => {
        setHostName(host);
      });
      if (placeId) {
        setPhotoURI(await loadPhoto(placeId));
      }
      const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === planId);
      setInvitees(invitees);
    };
    loadCard();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.push('PlanDetails', { plan: plan })} style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.date}>{date && formatDayOfWeekDate(date)}</Text>
          <Text numberOfLines={1} style={styles.title}>
            {title.length > 20 ? title.substring(0, 19) + '...' : title}
          </Text>
          {creator ? (
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
          <Image
            source={{
              uri: photoURI ? photoURI : 'https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112__340.jpg',
            }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.invited}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {invited
            ? <Entypo style={{ marginRight: 6 }} name="check" size={24} color={TEAL} /> ||
              (!creator && <AntDesign name="question" size={24} color="red" />)
            : null}
          <Text style={styles.invitedText}>{invitees.length} Invited</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.invitedText}>
            {location.length > 20 ? location?.substring(0, 19) + '...' : location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    marginTop: 1,
    // paddingBottom: 9,
    borderBottomWidth: 0.1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 7,
  },
  date: {
    fontSize: 19,
    fontWeight: '600',
    color: GOLD,
    marginBottom: 5,
  },
  hostName: {
    fontSize: 20,
    fontWeight: '500',
    color: GREY_3,
    paddingTop: 5,
  },
  image: {
    width: 125,
    height: 105,
    borderRadius: 10,
    marginTop: 5,
  },
  invited: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    paddingVertical: 4,
  },

  invitedText: {
    fontSize: 18,
    color: GREY_3,
    marginLeft: 4,
    fontWeight: '500',
  },
  creatorContainer: {
    backgroundColor: GREEN,
    padding: 4,
    marginTop: 4,
    borderRadius: 5,
  },
  creatorText: {
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginVertical: 5,
  },
});
