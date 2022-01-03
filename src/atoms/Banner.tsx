import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Plan, Invitee } from '../models';
import * as queries from '../graphql/queries';
import { API } from 'aws-amplify';
import { loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';
import { DataStore } from '@aws-amplify/datastore';

interface Props {
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  reload: boolean;
}

export const Banner: React.FC<Props> = ({ plan, reload }: Props) => {
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');
  // TODO typo
  const [inviteesd, setInviteesd] = useState<Invitee[]>([]);

  const getHost = async (id: string) => {
    const userQuery: any = await API.graphql({
      query: queries.getUser,
      variables: { id: id },
    });
    const user = userQuery.data.getUser;
    if (user) {
      setHostName(user.name);
      return user.name;
    }
  };

  useEffect(() => {
    getHost(plan.creatorID);
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, [reload]);

  useEffect(() => {
    // TODO merge with other useEffect
    loadInvitees();
  }, [reload]);

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
    setInviteesd(invitees);
  };
  return (
    <View>
      <ImageBackground
        source={{ uri: photoURI ? photoURI : 'https://cdn.pixabay.com/photo/2021/12/07/21/17/sheep-6854087__340.jpg' }}
        resizeMode="cover"
        style={{ height: 240, width: '100%' }}
      >
        <Text style={styles.containerText}>Your Next Event</Text>
        <View style={{ backgroundColor: '#fff', marginHorizontal: 8, paddingVertical: 8, borderRadius: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}
          >
            <View>
              <Text style={{ fontSize: 19, color: '#C3982C', fontWeight: '500' }}>
                {plan.date && formatDayOfWeekDate(plan.date)}
              </Text>
              <Text style={styles.title}>{plan.title}</Text>
              <Text style={styles.hostName}>{hostName}</Text>
            </View>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: photoURI ? photoURI : 'https://cdn.pixabay.com/photo/2021/12/07/21/17/sheep-6854087__340.jpg',
                }}
              />
            </View>
          </View>
          <View style={styles.invitedContainer}>
            <AntDesign style={{ marginRight: 6 }} name="checkcircle" size={30} color="#31A59F" />
            <Text style={styles.invitedText}>{inviteesd?.length} Invited</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginHorizontal: 8,
    marginVertical: 4,
    fontSize: 24,
    fontWeight: '700',
    color: '#fbfbfb',
  },
  image: {
    width: 120,
    height: 110,
    borderRadius: 7,
    marginTop: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    marginVertical: 8,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  invitedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  invitedText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
});
