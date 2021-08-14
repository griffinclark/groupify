import { DataStore, Auth } from 'aws-amplify';
import Qs from 'qs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Screen, Button } from '../atoms/AtomsExports';
import { formatTime, convertDateStringToDate } from '../res/utilFunctions';
import { TEAL, WHITE, GREY_0, GREY_4, GOLD } from '../res/styles/Colors';
import { Plan, User, Invitee, Status } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { userID: string }) => void;
  };
  route: {
    params: {
      plan: Plan;
      user: User;
    };
  };
}

export const InviteeList: React.FC<Props> = ({ navigation, route }: Props) => {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
  const plan = route.params.plan;
  const [hostName, setHostName] = useState('');
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [userInvitee, setUserInvitee] = useState<Invitee>();
  const [photoURI, setPhotoURI] = useState('');
  const [showRespondOptions, setShowRespondOptions] = useState(false);
  const [refreshAttendeeList, setRefreshAttendeeList] = useState(false);

  useEffect(() => {
    loadPhoto();
  }, []);

  useEffect(() => {
    loadInvitees();
  }, [refreshAttendeeList]);

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
    const userInfo = await Auth.currentUserInfo();
    for (const invitee of invitees) {
      if (invitee.phoneNumber === userInfo.attributes.phone_number) {
        setUserInvitee(invitee);
        setShowRespondOptions(true);
        break;
      }
    }
  };

  const renderInvitee = ({ item }: { item: Invitee }) => {
    let backgroundColor = GOLD;
    if (item.status === Status.ACCEPTED) {
      backgroundColor = TEAL;
    } else if (item.status === Status.DECLINED) {
      backgroundColor = GREY_4;
    }
    return (
      <View style={[styles.sphere, { backgroundColor: backgroundColor }]}>
        <Text style={styles.initial}>{item.name.slice(0, 1)}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <View style={{ top: 38, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Invitees</Text>
        <Icon
          name="close"
          type="fa"
          style={{ paddingVertical: 4 }}
          size={40}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={styles.image}>
        {photoURI ? <Image source={{ uri: photoURI }} resizeMode="cover" /> : <Text>No image</Text>}
      </View>
      <View>
        <Text style={styles.hostName}>Invitees</Text>
        <Text style={styles.hostNameTitle}>Host</Text>
      </View>

      <View style={{ top: 300 }}>
        <FlatList
          style={styles.inviteesList}
          data={invitees}
          renderItem={renderInvitee}
          ListEmptyComponent={() => (
            <View style={styles.title}>
              <Text>No Attendees Yet</Text>
            </View>
          )}
          horizontal={true}
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
    position: 'absolute',
    width: 300,
    top: 60,
    marginLeft: 18,
    fontSize: 25,
    color: '#31A59F',
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
    top: 160,
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
  inviteesList: {
    position: 'absolute',
    left: 20,
    bottom: 20,
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
});
