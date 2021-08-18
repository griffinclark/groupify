import { DataStore } from 'aws-amplify';
import Qs from 'qs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { Screen } from '../atoms/AtomsExports';
import { TEAL, WHITE, GREY_0, GREY_4, GOLD } from '../res/styles/Colors';
import { Plan, Invitee, Status } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: {
    params: {
      plan: Plan;
    };
  };
}

export const InviteeList: React.FC<Props> = ({ navigation, route }: Props) => {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
  const plan = route.params.plan;
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [photoURI, setPhotoURI] = useState('');

  useEffect(() => {
    loadPhoto();
    loadInvitees();
  }, []);

  const loadPhoto = async () => {
    const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    const search = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${plan.placeID}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    const detail = await response.json();
    const photoReference = detail.result.photos[0].photo_reference;
    const photoRequetsParams = {
      key: GOOGLE_PLACES_API_KEY,
      maxwidth: 500,
      maxheight: 500,
      photoreference: photoReference,
    };
    const completeUri = photoRequestURL + Qs.stringify(photoRequetsParams);
    setPhotoURI(completeUri);
  };

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
    setInvitees(invitees);
  };

  const renderInvitee = ({ item }: { item: Invitee }) => {
    let backgroundColor = GOLD;
    if (item.status === Status.ACCEPTED) {
      backgroundColor = TEAL;
    } else if (item.status === Status.DECLINED) {
      backgroundColor = GREY_4;
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <View style={[styles.sphere, { backgroundColor: backgroundColor, marginRight: 10 }]}>
            <Text style={styles.initial}>{item.name.slice(0, 1)}</Text>
          </View>
          <Text>{item.name}</Text>
        </View>
        <View
          style={
            item.status === Status.ACCEPTED
              ? [styles.status, { borderColor: '#31A59F' }]
              : item.status === Status.PENDING
              ? [styles.status, { borderColor: '#BE8C2C' }]
              : [styles.status, { borderColor: GREY_0 }]
          }
        >
          <Text
            style={
              item.status === Status.ACCEPTED
                ? styles.acceptedText
                : item.status === Status.PENDING
                ? styles.pendingText
                : styles.declinedText
            }
          >
            {item.status === Status.ACCEPTED ? 'Accepted' : item.status === Status.PENDING ? 'Pending' : 'Declined'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <View style={styles.titleNav}>
          <Text style={styles.title}>{plan.title}</Text>
          <Icon name="close" type="fa" size={40} onPress={() => navigation.navigate('PlanDetails', {})} />
        </View>
        <View style={styles.image}>
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" />
        </View>
      </View>
      <View style={{ flex: 2, padding: 20 }}>
        <Text style={styles.hostName}>Attendees</Text>
        <FlatList
          data={invitees}
          renderItem={renderInvitee}
          ListEmptyComponent={() => (
            <View style={styles.title}>
              <Text>No Attendees Yet</Text>
            </View>
          )}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: TEAL,
    left: 20,
    width: '80%',
    fontWeight: 'bold',
  },
  hostName: {
    fontSize: 25,
    marginVertical: 10,
    color: '#616060',
  },
  image: {
    height: 200,
    width: '100%',
  },
  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: 20,
    color: WHITE,
  },
  planResponse: {
    maxWidth: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '2%',
  },
  button: {
    width: '50%',
  },
  declineButton: {
    backgroundColor: WHITE,
    color: GREY_0,
    borderWidth: 2,
    borderColor: TEAL,
  },
  status: {
    width: 120,
    height: 40,
    borderWidth: 3,
    borderRadius: 25,
  },
  acceptedText: {
    alignSelf: 'center',
    paddingTop: 6,
    fontSize: 18,
    fontWeight: '600',
    color: '#31A59F',
  },
  pendingText: {
    alignSelf: 'center',
    paddingTop: 6,
    fontSize: 18,
    fontWeight: '600',
    color: '#BE8C2C',
  },
  declinedText: {
    alignSelf: 'center',
    paddingTop: 6,
    fontSize: 18,
    fontWeight: '600',
    color: GREY_0,
  },
  titleNav: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});