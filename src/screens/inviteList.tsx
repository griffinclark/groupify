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
        <View style={{ width: 200, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <View style={[styles.sphere, { backgroundColor: backgroundColor, marginRight: 25 }]}>
            <Text style={styles.initial}>{item.name.slice(0, 1)}</Text>
          </View>
          <Text>{item.name}</Text>
        </View>
        <View
          style={
            item.status === Status.ACCEPTED
              ? styles.accepted
              : item.status === Status.PENDING
              ? styles.pending
              : styles.declined
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
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{plan.title}</Text>
          <Icon
            name="close"
            type="fa"
            style={{ paddingVertical: 4 }}
            size={40}
            onPress={() => navigation.navigate('PlanDetails', {})}
          />
        </View>
        <View style={styles.image}>
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" />
        </View>
      </View>
      <View style={{ flex: 2, padding: 20 }}>
        <Text style={styles.hostName}>Attendees</Text>
        <FlatList
          style={styles.inviteesList}
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
  inviteImg: {
    width: '100%',
    height: 200,
    top: 40,
  },
  hostName: {
    fontSize: 25,
    marginVertical: 10,
    color: '#616060',
  },
  hostNameTitle: {
    position: 'absolute',
    width: 150,
    top: 78,
    marginLeft: 20,
    marginTop: 10,
    color: '#616060',
  },
  image: {
    height: 200,
    width: '100%',
  },
  evText3: {
    fontSize: 12,
    color: '#616060',
    width: 86,
    height: 16,
  },
  evText4: {
    fontSize: 12,
    color: '#31A59F',
  },
  evText5: {
    left: 20,
    fontSize: 12,
    color: TEAL,
    top: 15,
  },
  desc1: {
    fontSize: 12,
    color: '#616060',
    marginLeft: 20,
  },
  desc2: {
    left: 20,
  },
  desc3: {
    fontSize: 12,
    color: '#616060',
    top: 15,
    marginLeft: 20,
  },
  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
  },
  initial: {
    top: 5,
    fontSize: 20,
    color: WHITE,
  },
  inviteesList: {},
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
  accepted: {
    width: 150,
    height: 40,
    borderWidth: 3,
    borderRadius: 25,
    borderColor: '#31A59F',
  },
  pending: {
    width: 150,
    height: 40,
    borderWidth: 3,
    borderRadius: 25,
    borderColor: '#BE8C2C',
  },
  declined: {
    width: 150,
    height: 40,
    borderWidth: 3,
    borderRadius: 25,
    borderColor: GREY_0,
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
});
