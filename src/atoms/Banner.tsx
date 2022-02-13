/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Plan, Invitee } from '../models';
import { loadPhoto, formatDayOfWeekDate, getHost } from '../res/utilFunctions';
import { DataStore } from '@aws-amplify/datastore';
import { TEAL_0, WHITE, GREY_3, BLACK, GOLD_6, GREY_6 } from '../res/styles/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import {JOST} from '../res/styles/Fonts';

interface Props {
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  reload: boolean;
}

export const Banner: React.FC<Props> = ({ plan, reload, navigation }: Props) => {
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');
  const [invitees, setInvitees] = useState<Invitee[]>([]);

  useEffect(() => {
    const loadCard = async () => {
      getHost(plan.creatorID).then((name: any) => setHostName(name));
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
      const inviteesOnDB = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
      setInvitees(inviteesOnDB);
    };
    loadCard();
  }, [reload]);

  return (
    <View style={{ borderBottomWidth: 4, borderBottomColor: GREY_6 }}>
      <ImageBackground
        source={{ uri: photoURI ? photoURI : 'https://cdn.pixabay.com/photo/2021/12/07/21/17/sheep-6854087__340.jpg' }}
        resizeMode="cover"
        style={styles.imgBackground}
      >
        <LinearGradient colors={['rgba(180, 180, 180, 0.9)', 'rgba(22,22,22,0.5)']} style={styles.gradientStyle} />
        <Text style={styles.containerText}>Your Next Event</Text>
        <TouchableOpacity
          onPress={() => navigation.push('PlanDetails', { plan: plan })}
          activeOpacity={0.8}
          style={styles.card}
        >
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.date}>{plan.date && formatDayOfWeekDate(plan.date)}</Text>
              <Text style={styles.title}>
                {plan.title.length > 16 ? plan.title.substring(0, 15) + '...' : plan.title}
              </Text>
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
            <View style={{ flexDirection: 'row' }}>
              <Entypo style={{ marginRight: 6 }} name="check" size={24} color={TEAL_0} />
              <Text style={styles.invitedText}>{invitees?.length} Invited</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.invitedText}>
                {plan.location.length > 15 ? plan.location?.substring(0, 14) + '...' : plan.location}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: JOST['500'],
    color: BLACK,
    marginTop: 18,
    marginBottom: 12,
  },
  image: {
    width: 115,
    height: 95,
    borderRadius: 5,
    marginTop: 5,
  },
  title: {
    fontFamily: JOST['400'],
    fontSize: 20,
    marginVertical: 6,
    lineHeight: 28,
  },
  hostName: {
    fontSize: 16,
    fontFamily: JOST['400'],
    color: GREY_3,
    lineHeight: 23.12,
  },
  invitedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  invitedText: {
    fontSize: 16,
    color: GREY_3,
    marginLeft: 4,
    fontFamily: JOST['400'],
  },
  card: {
    backgroundColor: WHITE,
    marginHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
  },
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 240,
  },
  imgBackground: {
    height: 200,
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  date: {
    fontSize: 16,
    color: GOLD_6,
    fontFamily: JOST['400'],
    lineHeight: 23.12,
  },
});
