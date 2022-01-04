/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Invitee } from '../models';
import { loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { WHITE, GOLD, GREY_3, GREEN } from '../res/styles/Colors';

export interface Props {
  title: string;
  date?: string;
  location: string;
  planId?: string;
  placeId?: string;
  creator?: boolean;
  invited?: boolean;
  creatorId: string;
}
export const PlanCard = ({ title, date, location, planId, placeId, creator, invited, creatorId }: Props) => {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');

  const getHost = async (id: string) => {
    //TODO why is this type any? This should have a type, especially if you're calling variable.value on it. This appears multiple places in your code
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const userQuery: any = await API.graphql({
      query: queries.getUser,
      variables: { id: id },
    });
    const user = userQuery.data.getUser;
    if (user) {
      setHostName(user.name);
      return user.name;
    }
    console.log('host name', hostName);
  };

  useEffect(() => {
    (async () => {
      if (placeId) {
        setPhotoURI(await loadPhoto(placeId));
      }
    })(); // TODO why is this async?, well its fixes lazy loading of images
    const loadInvitees = async () => {
      const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === planId);
      setInvitees(invitees);
    };

    loadInvitees();
    getHost(creatorId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.date}>{date && formatDayOfWeekDate(date)}</Text>
          <Text numberOfLines={1} style={{ fontWeight: '500', fontSize: 20, marginVertical: 5 }}>
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
            ? <AntDesign name="checkcircle" size={24} color="green" /> ||
              (!creator && <MaterialCommunityIcons name="dots-horizontal-circle" size={24} color="red" />)
            : null}
          <Text style={styles.invitedText}>{invitees.length} Invited</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.invitedText}>
            {location?.length > 20 ? location?.substring(0, 19) + '...' : location}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    marginTop: 5,
    paddingBottom: 9,
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
    width: 130,
    height: 110,
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
});
