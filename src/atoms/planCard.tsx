/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Invitee, Plan } from '../models';
import { loadPhoto, formatDayOfWeekDate, getHost } from '../res/utilFunctions';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { WHITE, GREY_3, TEAL } from '../res/styles/Colors';

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
    <View style={{ backgroundColor: WHITE, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <TouchableOpacity onPress={() => navigation.push('PlanDetails', { plan: plan })} style={styles.container}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.date}>{date && formatDayOfWeekDate(date)}</Text>
            <Text numberOfLines={1} style={styles.title}>
              {title.length > 16 ? title.substring(0, 15) + '...' : title}
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
              {location.length > 15 ? location?.substring(0, 14) + '...' : location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: '400',
    color: '#C3982C',
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
    fontWeight: '400',
  },
  creatorContainer: {
    backgroundColor: '#D0EAE9',
    padding: 4,
    marginTop: 4,
    borderRadius: 3,
  },
  creatorText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    marginVertical: 5,
    lineHeight: 30,
  },
});
