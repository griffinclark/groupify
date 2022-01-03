import { DataStore, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { User } from '../models';
import { ContactContainer, FriendContainer } from '../organisms/OrganismsExports';
import { LocationBlock }  from '../molecules/MoleculesExports';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { AppText, BottomButton, Button, Navbar, SearchBar, Screen } from '../atoms/AtomsExports';
// import { GRAY_LIGHT, TEAL } from '../res/styles/Colors';
import Constants from 'expo-constants';
import { globalStyles } from '../res/styles/GlobalStyles';

export interface Props {
    navigation: {
        navigate: (ev: string, {}) => void;
        goBack: () => void;
    };
    route: RoutePropParams
}

export const PlanInvite: React.FC<Props> = ({ navigation, route }: Props) => {
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

    return (
        <Screen>
            <View testID="PlanInviteScreen" style={{ flex: 1 }}>
                <View style={globalStyles.container}>
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

                    <View>
                        <AppText style={globalStyles.sectionTitle}>Add Groupies</AppText>
                        <AppText style={{ fontSize: 18 }}>Send a friend request to these Groupify users.</AppText>
                        {friends.length > 0 ? (
                            <View style={styles.friendBubbleContainer}>
                                <FriendContainer friends={friends} adjustSelectedFriends={setSelectedFriends} />
                            </View>
                        ) : null}
                    </View>

                    <View>
                        <AppText style={globalStyles.sectionTitle}>Send Invite</AppText>
                        <AppText style={{ fontSize: 18 }}>Add a friend who isn't on groupify yet.</AppText>
                        <ScrollView>
                            <View style={styles.contactsContainer}>
                                <ContactContainer contacts={filteredContacts} adjustSelectedContacts={setSelectedContacts} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <BottomButton
                    disabled={selectedContacts.length == 0 ? true : false}
                    title="Preview Plan"
                    onPress={() => console.log('click')}
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