import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Plan, Invitee } from '../models';
import { loadPhoto, formatDayOfWeekDate, getHost } from '../res/utilFunctions';
import { DataStore } from '@aws-amplify/datastore';
import { TEAL_0, WHITE, GREY_3, BLACK } from '../res/styles/Colors';
import { LinearGradient } from 'expo-linear-gradient';

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
      getHost(plan.creatorID).then((name) => setHostName(name));
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
      const inviteesOnDB = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
      setInvitees(inviteesOnDB);
    };
    loadCard();
  }, [reload]);

  return (
    <View>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, color: '#C3982C', fontWeight: '400', lineHeight: 23.12 }}>
                {plan.date && formatDayOfWeekDate(plan.date)}
              </Text>
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
            <Entypo style={{ marginRight: 6 }} name="check" size={24} color={TEAL_0} />
            <Text style={styles.invitedText}>{invitees?.length} Invited</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginHorizontal: 8,
    fontSize: 22,
    fontWeight: '600',
    color: BLACK,
    marginTop: 6,
    marginBottom: 8,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 5,
    marginTop: 5,
  },
  title: {
    fontWeight: '400',
    fontSize: 22,
    marginVertical: 6,
    lineHeight: 28,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '400',
    color: GREY_3,
    lineHeight: 23.12,
  },
  invitedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  invitedText: {
    fontSize: 18,
    fontWeight: '400',
    color: GREY_3,
    lineHeight: 23.12,
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
});
