import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { Button, SearchBar, Alert } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
//import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ContactContainer, FriendContainer } from '../organisms/OrganismsExports';
import { GREY_3, GREY_4, WHITE, TEAL } from '../res/styles/Colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const SelectFriends: React.FC<Props> = ({ navigation, route }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [menuItemSelected, setMenuItemSelected] = useState('contacts');
  const [eventObject, setEventObject] = useState({
    date: '',
    description: '',
    imageURL: '',
    location: '',
    time: '',
    title: '',
    uuid: '',
    placeId: '',
  });
  const [friends, setFriends] = useState<User[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  useEffect(() => {
    loadContacts();
    setEventObject(route.params.data.eventData);
    getFriends();
  }, []);

  const getFriends = async () => {
    const user = await DataStore.query(User, (user) => user.id('contains', route.params.currentUser.id));
    const userFriends = user[0].friends;
    const friendList = [];
    if (userFriends) {
      for (let i = 0; i < userFriends.length; i++) {
        const friendId = userFriends[i];
        if (friendId) {
          const friend = await DataStore.query(User, friendId);
          friendList.push(friend);
        }
      }
    }
    if (friendList) {
      setFriends(friendList);
    }
  };

  const loadContacts = async () => {
    const importedContacts = await getAllImportedContacts();
    setContacts(importedContacts);
    setFilteredContacts(importedContacts);
  };

  const searchFriends = (text: string) => {
    setFilteredContacts(
      contacts.filter((contact) => {
        let contactLowercase = '';
        try {
          contactLowercase = contact.name.toLowerCase();
        } catch {
          console.log('error filtering a contact');
        }
        const textLowercase = text.toLowerCase();
        return contactLowercase.indexOf(textLowercase) > -1;
      }),
    );
  };

  const sendContactMessage = async () => {
    const event = route.params.data.eventData;
    navigation.navigate('SendMessage', {
      currentUser: route.params.currentUser,
      data: {
        eventData: {
          uuid: event.uuid,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
          imageURL: event.imageURL,
          placeId: event.placeId,
          friends: selectedFriends,
          contacts: selectedContacts,
        },
      },
    });
    await Analytics.logEvent('send_message_on_create_event', {});
  };

  const menuSelection = (item: string) => {
    setMenuItemSelected(item);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={{ uri: eventObject.imageURL || '' }} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.header}>
          <View style={styles.rowContainer}>
            <View style={styles.icon}>
              <AntDesign name="leftcircle" size={30} color="white" onPress={() => navigation.goBack()} />
            </View>
          </View>
          <View style={styles.title}>
            <AppText style={styles.titleText}>Edit Event Details</AppText>
          </View>
          <View style={styles.icon}>
            <AntDesign name="closecircle" size={30} color="white" onPress={() => navigation.navigate('Home')} />
          </View>
        </View>

        <View style={styles.body}>
          <AppText style={styles.planInfoTitle}>{eventObject.title}</AppText>
          <View style={styles.rowContainer}>
            <View style={styles.calendar}>
              <MaterialCommunityIcons name="calendar-blank" size={24} color="white" style={styles.calendarIcon} />
            </View>
            <AppText style={styles.planInfo}>{eventObject.date}</AppText>
            <AppText style={styles.planInfo}>{eventObject.time}</AppText>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.calendar}>
              <AntDesign name="enviromento" size={24} color="white" />
            </View>
            <AppText numberOfLines={1} style={styles.planInfo}>
              {eventObject.location}
            </AppText>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.friendContainer}>
        <View style={styles.menu}>
          {/* <View style={menuItemSelected === 'friends' && styles.itemSelectedContainer}>
            <Text
              style={[
                menuItemSelected === 'friends' ? styles.menuItemSelected : styles.menuItemNotSelected,
                styles.menuItem,
              ]}
              onPress={() => menuSelection('friends')}
            >
              FRIENDS
            </Text>
          </View> */}
          <View style={menuItemSelected === 'contacts' && styles.itemSelectedContainer}>
            <AppText
              style={[
                menuItemSelected === 'contacts' ? styles.menuItemSelected : styles.menuItemNotSelected,
                styles.menuItem,
              ]}
              onPress={() => menuSelection('contacts')}
            >
              CONTACTS
            </AppText>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {menuItemSelected === 'friends' && (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <AppText style={styles.text}>Send your friends an in app notification!</AppText>
              {friends.length > 0 ? (
                <View style={styles.friendBubbleContainer}>
                  <FriendContainer friends={friends} adjustSelectedFriends={setSelectedFriends} />
                </View>
              ) : null}
              <View style={{ marginBottom: 27, alignSelf: 'center' }}>
                <Button
                  title={selectedFriends.length === 0 ? 'Skip' : 'Next'}
                  onPress={() => setMenuItemSelected('contacts')}
                />
              </View>
            </View>
          )}
          {menuItemSelected === 'contacts' && (
            <View style={styles.contactsContainer}>
              <View style={{ flex: 1 }}>
                <AppText style={styles.text}>Who would you like to invite?</AppText>
                <SearchBar onInputChange={searchFriends} />
                <ContactContainer contacts={filteredContacts} adjustSelectedContacts={setSelectedContacts} />
              </View>
              {selectedContacts.length == 0 && <Alert status={'error'} message={'Select a friend to continue'} />}
              <TouchableOpacity onPress={sendContactMessage} disabled={selectedContacts.length === 0 ? true : false}>
                {selectedContacts.length > 0 ? (
                  <AppText style={[styles.navText, { backgroundColor: TEAL, color: WHITE }]}>Next</AppText>
                ) : (
                  <AppText style={[styles.navText, { backgroundColor: GREY_4, color: GREY_3 }]}>Next</AppText>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  icon: {
    top: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.25,
  },
  calendar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  calendarIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  planInfoTitle: {
    fontSize: 20,
    margin: 5,
    fontWeight: '400',
    color: 'white',
  },
  planInfo: {
    fontSize: 16,
    margin: 5,
    fontWeight: '400',
    color: 'white',
  },
  friendContainer: {
    flex: 3,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
  },
  body: {
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 6,
    height: 50,
    paddingLeft: 20,
    borderBottomWidth: 3,
    borderColor: 'gray',
  },
  itemSelectedContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#32A59F',
  },
  menuItem: {
    marginHorizontal: 15,
    fontSize: 14,
    paddingBottom: 4,
  },
  menuItemSelected: {
    color: '#32A59F',
    fontWeight: '700',
  },
  menuItemNotSelected: {
    color: 'gray',
  },
  text: {
    textAlign: 'center',
    padding: 30,
    fontSize: 20,
  },
  friendBubbleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  contactsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  navText: {
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});
