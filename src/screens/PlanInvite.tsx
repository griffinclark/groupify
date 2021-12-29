import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { AppText, BottomButton, Button, Navbar, SearchBar } from '../atoms/AtomsExports';
import { API, Auth } from 'aws-amplify';
import { User } from '../models';
import { ContactContainer, FriendContainer } from '../organisms/OrganismsExports';
import { GRAY_LIGHT, TEAL_0 } from '../res/styles/Colors';
import Constants from 'expo-constants';
import * as queries from '../graphql/queries';
import { copy } from '../res/groupifyCopy';

export interface Props {
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
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const userQuery: any = await API.graphql({
      query: queries.getUser,
      variables: { id: route.params.currentUser.id },
    });
    const userFriends = userQuery.data.getUser.friends;
    const friendList = [];
    if (userFriends) {
      for (let i = 0; i < userFriends.length; i++) {
        const friendId = userFriends[i];
        if (friendId) {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const friendQuery: any = await API.graphql({
            query: queries.getUser,
            variables: { id: friendId },
          });
          const friend = friendQuery.data.getUser;
          if (friend) friendList.push(friend);
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

  const formatContacts = (arr: Contact[]) => {
    const formattedArr: Contact[] = [];
    let i = 1;
    arr.forEach((contact) => {
      if (contact.name) {
        formattedArr.push(contact);
      } else {
        contact.name = `Guest ${i}`;
        i++;
        formattedArr.push(contact);
      }
    });
    return formattedArr;
  };

  const sendContactMessage = async () => {
    const formattedContacts = formatContacts(selectedContacts);
    const event = route.params.data.eventData;
    navigation.navigate('ConfirmPlan', {
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
          contacts: formattedContacts,
          message: message,
        },
      },
    });
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

  /* Contact items displayed as 'friends' temporary until friend section finished */
  return (
    <View style={styles.screen} testID="PlanInviteScreen">
      <Navbar location={'PlanCreate'} navigation={navigation} data={route.params} title={'Invite Friends'} />
      <View style={styles.title}>
        <AppText style={styles.titleText}>{copy.whoToInvite + eventObject.title + '?'}</AppText>
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
              FRIENDS
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
                  title={selectedFriends.length === 0 ? copy.skipSelectContactsButton : copy.nextButtonTitle}
                  onPress={() => setMenuItemSelected('contacts')}
                />
              </View>
            </View>
          )}

          {menuItemSelected === 'contacts' && (
            <View style={{ marginHorizontal: 20 }}>
              <View style={{ paddingVertical: 30, borderBottomWidth: 0.75, borderBottomColor: GRAY_LIGHT }}>
                <SearchBar onChangeText={searchFriends} placeholder={copy.lookForFriends} />
              </View>
              <View style={styles.contactsScrollContainer}>
                <ScrollView>
                  <View style={styles.contactsContainer}>
                    <ContactContainer contacts={filteredContacts} adjustSelectedContacts={setSelectedContacts} />
                  </View>
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </View>
      <BottomButton
        disabled={selectedContacts.length == 0 ? true : false}
        title={copy.previewPlan}
        onPress={sendContactMessage}
      />
    </View>
  );
};

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
    borderBottomColor: TEAL_0,
  },
  menuItemNotSelectedContainer: {
    // borderBottomColor: '#E5E5E5',
    borderBottomColor: TEAL_0,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  menuItemSelected: {
    color: TEAL_0,
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
