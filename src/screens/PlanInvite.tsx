import { DataStore, Auth, API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { User, Plan, Status, Invitee } from '../models';
import { ContactContainer, FriendContainer } from '../organisms/OrganismsExports';
import { LocationBlock }  from '../molecules/MoleculesExports';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { AppText, BottomButton, Button, Navbar, SearchBar, Screen } from '../atoms/AtomsExports';
// import { GRAY_LIGHT, TEAL } from '../res/styles/Colors';
import Constants from 'expo-constants';
import { globalStyles } from '../res/styles/GlobalStyles';
import { formatDatabaseDate, formatDatabaseTime, formatPhoneNumber, convertDateStringToDate } from '../res/utilFunctions';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { sendPushNotification } from '../res/notifications';


export interface Props {
    navigation: {
        navigate: (ev: string, {}) => void;
        goBack: () => void;
    };
    route: RoutePropParams
}

export const PlanInvite: React.FC<Props> = ({ navigation, route }: Props) => {
    const currentUser: User = route.params.currentUser;
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

    const [planObject, setPlanObject] = useState({
        date: '',
        location: '',
        locationName: '',
        time: '',
        title: '',
        uuid: '',
        placeId: '',
    });

    const [friends, setFriends] = useState<User[]>([]);
    const [selectedFriends, setSelectedFriends] = useState<User[]>([]);

    useEffect(() => {
        loadContacts();
        setPlanObject(route.params.data.eventData);
        getFriends();
        //createInitialMessage();
    }, []);

    const loadContacts = async () => {
        const importedContacts = await getAllImportedContacts();
        setContacts(importedContacts);
        setFilteredContacts(importedContacts);
    };

    const getFriends = async () => {
        const userQuery = await DataStore.query(User, route.params.currentUser.id);

        const friends: User[] = [];

        if(userQuery) {
            const friendIds = userQuery.friends?.split(',');

            if(friendIds) {
                for(const friendId of friendIds) {
                    if(friendId) {
                      const friend = await DataStore.query(User, friendId);
                      
                      if(friend) {
                          friends.push(friend);
                      }
                    }
                }
            }
        }

        if(friends.length) {
            setFriends(friends);
        }
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
            })
        )
    }

    const pushEvent = async (friends: Invitee[], message: string): Promise<void> => {
        const util = PhoneNumberUtil.getInstance();
        const attendees = friends.map((friend) => {
          const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
          return util.format(num, PhoneNumberFormat.E164);
        });
        const obj = { attendees: attendees, content: message };
        console.log(await API.post('broadcastsApi', '/broadcasts', { body: obj }));
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
    }

    const formatPhoneNumber = (friend: Contact) => {
        const util = PhoneNumberUtil.getInstance();
        const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
        const newNumber = util.format(num, PhoneNumberFormat.E164);
        return newNumber;
    };

    const storeInvitess = async () => {
        
        const newPlan = await DataStore.save(
            new Plan({
              title: planObject.title,
              location: planObject.location,
              placeID: planObject.placeId,
              date: formatDatabaseDate(planObject.date),
              time: formatDatabaseTime(planObject.time),
              creatorID: currentUser.id,
            })
        );

        const inviteeList: Invitee[] = [];
        const contacts = formatContacts(selectedContacts);

        for (const contact of contacts) {
            if(contact.phoneNumber !== 'No phone number found') {
                const invitee = await DataStore.save(
                    new Invitee({
                        name: contact.name,
                        phoneNumber: formatPhoneNumber(contact),
                        status: Status.PENDING,
                        pushToken: '',
                        plan: newPlan
                    })
                );

                inviteeList.push(invitee);
            }
        }
        
        // Add the invitor to the plan. 
        //I don't really like it. Should have a more elegant way to combine the 2
        const userInvitee = await DataStore.save(
            new Invitee({
                name: currentUser.name,
                phoneNumber: currentUser.phoneNumber,
                status: Status.ACCEPTED,
                pushToken: currentUser.pushToken,
                plan: newPlan
            })
        );

        inviteeList.push(userInvitee);

        await DataStore.save(
            Plan.copyOf(newPlan, (item) => {
                item.invitees = inviteeList;
            })
        );

        const name = currentUser.name;
        const nonUsers = [];
        const pushTokenRegex = /ExponentPushToken\[.{22}]/;
        const message = 
            `Hey, ${name} is inviting you ` +
            `to '${planObject.title}'` +
            `${planObject.time ? ' at ' + planObject.time : ''}` +
            `${planObject.date ? ' on ' + planObject.date : ''}` +
            `${planObject.location ? ' at ' + planObject.location : ''}` +
            '. Hope to see you there!';
        
        for(const invitee of inviteeList) {
            const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', invitee.phoneNumber));
            const user = userQuery.map((user) => user);

            if(user.length) {
                if(pushTokenRegex.test(user[0].pushToken) && user[0].pushToken !== currentUser.pushToken) {
                    sendPushNotification(user[0].pushToken, `You Have Been Invited by ${name}!!!`, 'Tap to open the app', {})
                }
            }
            else {
                nonUsers.push(invitee);
            }
        }

        pushEvent(nonUsers, message);
    }

    const handleSubmit = async (): Promise<void> => {
        try {
            await storeInvitess();

            navigation.navigate('PlanConfirm', {
                currentUser: route.params.currentUser,
                data: {
                    eventData: {
                        title: route.params.data.eventData.title,
                        date: route.params.data.eventData.date,
                        time: route.params.data.eventData.time
                    }
                }
            });
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <Screen>
            <View testID="PlanInviteScreen" style={{ flex: 1 }}>
                <ScrollView style={globalStyles.container}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                        <AppText style={styles.title}>Build a Plan</AppText>
                    </View>

                    
                    <View style={globalStyles.topBlockBack}>
                        <BackChevronIcon height={'20'} onPress={() => navigation.goBack()} />
                        <LocationBlock 
                            planName={route.params.data.eventData.title} 
                            locationName={route.params.data.eventData.locationName} 
                            locationAddress={route.params.data.eventData.location}
                            date={route.params.data.eventData.date} 
                            time={route.params.data.eventData.time} 
                        />
                    </View>

                    <View style={{ paddingVertical: 30 }}>
                        <SearchBar onInputChange={searchFriends} placeholder="Search for friends" />
                    </View>

                    {/* <View>
                        <AppText style={globalStyles.sectionTitle}>Add Groupies</AppText>
                        <AppText style={{ fontSize: 18 }}>Send a friend request to these Groupify users.</AppText>
                        {friends.length > 0 ? (
                            <View style={styles.friendBubbleContainer}>
                                <FriendContainer friends={friends} adjustSelectedFriends={setSelectedFriends} />
                            </View>
                        ) : null}
                    </View> */}

                    <View>
                        <AppText style={globalStyles.sectionTitle}>Send Invite</AppText>
                        <AppText style={{ fontSize: 18 }}>Add a friend who isn't on groupify yet.</AppText>
                        {/* <ScrollView> */}
                            <View style={styles.contactsContainer}>
                                <ContactContainer contacts={filteredContacts} adjustSelectedContacts={setSelectedContacts} />
                            </View>
                        {/* </ScrollView> */}
                    </View>
                </ScrollView>
                <BottomButton
                    disabled={selectedContacts.length == 0 ? true : false}
                    title="Preview Plan"
                    onPress={handleSubmit}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    topBlock: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    title: {
        paddingLeft: 15,
        fontSize: 30,
        textTransform: 'capitalize'
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
    contactsScrollContainer: {
        // height: Dimensions.get('window').height - Constants.statusBarHeight - 340,
    },
});