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
  //TODO for consistency in our code and to improve readability, we declare optionals with title?:string instead of title: string|undefined. Also note that you use both here
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
    //TODO remove unnecessary () at the and and wrapping async
    (async () => {
      if (placeId) {
        setPhotoURI(await loadPhoto(placeId));
      }
    })();
  }, []);

  useEffect(() => {
    //TODO why are these useEffect calls in two different functions? Merge them together if possible
    loadInvitees();
    getHost(creatorId);
  }, []);

  //TODO since loadInvitees is just being used once and is pretty small you can put this code inside the useEffect
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
            //TODO never use colors like '#FFFFFF' in your code. Always reference colors.WHITE (you'll have to import colors). If we don't have the color you need, you can add it in. This appears in multiple places throughout your code
            //TODO styling should go in StyleSheet not inline. This appears in multiple places throughout your code. 
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
          {/* TODO  instead of saying "is this true? show x. is this false? show y" you can use {invited ? (return x):(return y)}. Reduces errors */}
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
