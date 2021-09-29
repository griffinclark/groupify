import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { Alert, AppText, BottomButton, Button, Navbar, SearchBar } from '../atoms/AtomsExports';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';
import { ContactContainer, FriendContainer } from '../organisms/OrganismsExports';
import { PlanTextMessage } from '../molecules/PlanTextMessage';
import { GRAY_LIGHT, TEAL } from '../res/styles/Colors';
import Constants from 'expo-constants';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const PlanInvite: React.FC<Props> = ({ navigation, route }: Props) => {
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
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    loadContacts();
    setEventObject(route.params.data.eventData);
    getFriends();
    createInitialMessage();
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

  const sendContactMessage = () => {
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
          message: message,
        },
      },
    });
    await Analytics.logEvent('send_message_on_create_event', {});
  };

  const menuSelection = (item: string) => {
    setMenuItemSelected(item);
  };

  const createInitialMessage = async (): Promise<void> => {
    const event = route.params.data.eventData;
    const userInfo = await Auth.currentUserInfo();
    const name = userInfo.attributes.name;

    const initMessage =
      `Hey, ${name} is inviting you ` +
      `to '${event.title}'` +
      `${event.time ? ' at ' + event.time : ''}` +
      `${event.date ? ' on ' + event.date : ''}` +
      `${event.location ? ' at ' + event.location : ''}` +
      `${event.description}` +
      '. Hope to see you there!';

    setMessage(initMessage);
  };

  return (
    <View style={styles.screen}>
      <Navbar location={'PlanCreate'} navigation={navigation} title={'Invite Friends'} />

      <View style={styles.title}>
        <AppText style={styles.titleText}>Who do you want to invite to {eventObject.title}</AppText>
      </View>

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
          <View
            style={[
              menuItemSelected === 'contacts' ? styles.menuItemSelectedContainer : styles.menuItemNotSelectedContainer,
              styles.menuItemContainer,
            ]}
          >
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
          {/* <View style={[styles.menuItemNotSelectedContainer, styles.menuItemContainer]} /> */}
        </View>

        <View style={{ flex: 1 }}>
          {menuItemSelected === 'friends' && (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
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
            <ScrollView>
              <View>
                <PlanTextMessage
                  label="Once you create this event, we will send out a text message to your contacts who haven’t joined the app yet as shown below. Feel free to edit:"
                  onChangeText={(e) => setMessage(e)}
                  text={message}
                />
              </View>
              <View style={{ paddingVertical: 30, borderBottomWidth: 0.75, borderBottomColor: GRAY_LIGHT }}>
                <SearchBar onInputChange={searchFriends} placeholder="Search for Contacts to Invite" />
              </View>

              <View style={styles.contactsScrollContainer}>
                <ScrollView>
                  <View style={styles.contactsContainer}>
                    <ContactContainer contacts={filteredContacts} adjustSelectedContacts={setSelectedContacts} />
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 50, width: '100%', alignSelf: 'center' }}>
        {selectedContacts.length == 0 && <Alert status={'error'} message={'Select a contact to continue'} />}
      </View>
      <BottomButton
        disabled={selectedContacts.length == 0 ? true : false}
        title="Preview Plan"
        onPress={sendContactMessage}
      />
    </View>
  );
};
//
const styles = StyleSheet.create({
  contactsScrollContainer: {
    height: Dimensions.get('window').height - Constants.statusBarHeight - 340,
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginTop: 27,
    marginHorizontal: 63,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  friendContainer: {
    flex: 3,
  },
  menu: {
    flexDirection: 'row',
    borderColor: '#8B8B8B',
    marginTop: 30,
  },
  menuItemContainer: {
    alignItems: 'center',
    borderBottomWidth: 3,
    paddingBottom: 13,
    width: '100%',
  },
  menuItemSelectedContainer: {
    borderBottomColor: TEAL,
  },
  menuItemNotSelectedContainer: {
    // borderBottomColor: '#E5E5E5',
    borderBottomColor: TEAL,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  menuItemSelected: {
    color: TEAL,
  },
  menuItemNotSelected: {
    color: '#8B8B8B',
  },
  body: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
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
});
