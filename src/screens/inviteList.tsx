import { DataStore } from 'aws-amplify';
import Qs from 'qs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { TEAL_0, WHITE, GREY_0, GREY_4, GOLD_0 } from '../res/styles/Colors';
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
  // FIXME API key stored in code!!
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
    let backgroundColor = GOLD_0;
    if (item.status === Status.ACCEPTED) {
      backgroundColor = TEAL_0;
    } else if (item.status === Status.DECLINED) {
      backgroundColor = GREY_4;
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <View style={[styles.sphere, { backgroundColor: backgroundColor, marginRight: 10 }]}>
            <AppText style={styles.initial}>{item.name.slice(0, 1)}</AppText>
          </View>
          <AppText>{item.name}</AppText>
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
          <AppText
            style={
              item.status === Status.ACCEPTED
                ? styles.acceptedText
                : item.status === Status.PENDING
                ? styles.pendingText
                : styles.declinedText
            }
          >
            {item.status === Status.ACCEPTED ? 'Accepted' : item.status === Status.PENDING ? 'Pending' : 'Declined'}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <View style={styles.titleNav}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            size={30}
            onPress={() => navigation.navigate('PlanDetails', {})}
          />
          <AppText style={styles.title}>{plan.title}</AppText>
        </View>
        <View style={styles.image}>
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" />
        </View>
      </View>
      <View style={{ flex: 2, padding: 20 }}>
        <AppText style={styles.hostName}>Attendees</AppText>
        <FlatList
          data={invitees}
          renderItem={renderInvitee}
          ListEmptyComponent={() => (
            <View style={styles.title}>
              <AppText>No Attendees Yet</AppText>
            </View>
          )}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: TEAL_0,
    flexWrap: 'wrap',
    maxWidth: 250,
    textAlign: 'right',
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
    backgroundColor: TEAL_0,
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
    borderColor: TEAL_0,
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});
