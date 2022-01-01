/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Invitee } from '../models';
import { loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';

export interface Props {
  title: string | undefined;
  date: string | undefined;
  location: string | undefined;
  planId: string | undefined;
  placeId: string | undefined;
  creator?: boolean;
  invited?: boolean;
  creatorId: string;
}
export const PlanCard = ({ title, date, location, planId, placeId, creator, invited, creatorId }: Props) => {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');

  const getHost = async (id: string) => {
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
    })();
  }, []);

  useEffect(() => {
    loadInvitees();
    getHost(creatorId);
  }, []);

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === planId);
    setInvitees(invitees);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.date}>{date && formatDayOfWeekDate(date)}</Text>
          <Text numberOfLines={1} style={{ fontWeight: '500', fontSize: 20, marginVertical: 5 }}>
            {title}
          </Text>
          {creator ? (
            <View style={{ backgroundColor: '#cdffcd', padding: 4, marginTop: 4, borderRadius: 5 }}>
              <Text style={{ fontWeight: '500' }}>You are hosting this plan</Text>
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
          {invited && <AntDesign name="checkcircle" size={24} color="green" />}
          {!invited && !creator && <MaterialCommunityIcons name="dots-horizontal-circle" size={24} color="red" />}
          <Text style={styles.invitedText}>{invitees.length} Invited</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.invitedText}>
            {location?.slice(0, 17)}...
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    color: '#C3982C',
    marginBottom: 5,
  },
  hostName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'gray',
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
    color: '#8B8B8B',
    marginLeft: 4,
    fontWeight: '500',
  },
});
