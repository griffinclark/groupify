import { DataStore, API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { Contact, NavigationProps } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { User, Plan, Status, Invitee } from '../models';
import { ContactContainer } from '../organisms/OrganismsExports';
import { LocationBlock } from '../molecules/MoleculesExports';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { ScrollView, View } from 'react-native';
import { AppText, BottomButton, SearchBar, Screen } from '../atoms/AtomsExports';
import { globalStyles } from '../res/styles/GlobalStyles';
import { formatDatabaseDate, formatDatabaseTime, formatDayOfWeekDate } from '../res/utilFunctions';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { sendPushNotification } from '../res/notifications';
import { copy } from './../res/groupifyCopy';
import { TopNavBar } from '../molecules/TopNavBar';
import { TEAL_7, BLACK } from '../res/styles/Colors';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { PlanConfirmModal } from '../molecules/PlanConfirmModal';

export interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const PlanInvite: React.FC<Props> = ({ navigation, route }: Props) => {
  const currentUser: User = route.params.currentUser;
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const [planObject, setPlanObject] = useState({
    date: '',
    location: '',
    locationName: '',
    time: '',
    title: '',
    uuid: '',
    placeId: '',
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    loadContacts();
    setPlanObject(route.params.data.planData);
  }, []);

  const loadContacts = async () => {
    const importedContacts = await getAllImportedContacts();
    setContacts(importedContacts);
    setFilteredContacts(importedContacts);
  };

  const searchFriends = (text: string) => {
    setFilteredContacts(
      contacts.filter((contact) => {
        let contactLowercase = '';

        if (typeof contact.name === 'string') {
          contactLowercase = contact.name.toLowerCase();
        } else {
          console.log('error filtering a contact');
        }

        const textLowercase = text.toLowerCase();

        return contactLowercase.indexOf(textLowercase) > -1;
      }),
    );
  };

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
  };

  const formatPhoneNumber = (friend: Contact) => {
    const util = PhoneNumberUtil.getInstance();
    const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
    const newNumber = util.format(num, PhoneNumberFormat.E164);
    return newNumber;
  };

  const inviteMessage = `Hi {friend's first name}! ${currentUser.name} is inviting you to ${
    planObject.title ? planObject.title : 'their event'
  } at ${planObject.locationName}, on ${formatDayOfWeekDate(planObject.date)} at ${planObject.time}. ${
    planObject.location
  }\n${
    planObject.description.length > 0 ? '\n' + planObject.description + '\n' : ''
  }Plan created using the Groupify App https://apps.apple.com/us/app/groupify-make-a-plan/id1566937955.`;

  const storeInvitess = async () => {
    const newPlan = await DataStore.save(
      new Plan({
        title: planObject.title,
        location: planObject.location,
        placeID: planObject.placeId,
        date: formatDatabaseDate(planObject.date),
        time: formatDatabaseTime(planObject.time),
        creatorID: currentUser.id,
      }),
    );

    const inviteeList: Invitee[] = [];
    const contacts = formatContacts(selectedContacts);

    for (const contact of contacts) {
      if (contact.phoneNumber !== 'No phone number found') {
        const invitee = await DataStore.save(
          new Invitee({
            name: contact.name,
            phoneNumber: formatPhoneNumber(contact),
            status: Status.PENDING,
            pushToken: '',
            plan: newPlan,
          }),
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
        plan: newPlan,
      }),
    );

    inviteeList.push(userInvitee);

    await DataStore.save(
      Plan.copyOf(newPlan, (item) => {
        item.invitees = inviteeList;
      }),
    );

    const name = currentUser.name;
    const nonUsers = [];
    const pushTokenRegex = /ExponentPushToken\[.{22}]/;
    for (const invitee of inviteeList) {
      const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', invitee.phoneNumber));
      const user = userQuery.map((user) => user);

      if (user.length) {
        if (pushTokenRegex.test(user[0].pushToken) && user[0].pushToken !== currentUser.pushToken) {
          sendPushNotification(user[0].pushToken, `You Have Been Invited by ${name}!!!`, 'Tap to open the app', {});
        }
      } else {
        nonUsers.push(invitee);
      }
    }

    pushEvent(nonUsers, inviteMessage);
  };

  const handleCreatePlan = async (): Promise<void> => {
    try {
      await storeInvitess();

      setOpenConfirmModal(false);

      navigation.navigate('PlanSuccess', {
        currentUser: route.params.currentUser,
        data: {
          planData: {
            ...planObject,
            selectedContacts: selectedContacts,
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Screen>
      <View testID="PlanInviteScreen" style={{ flex: 1 }}>
        <TopNavBar
          stickyHeader={false}
          title={copy.createAPlanTitle}
          navigation={navigation}
          displayGroupify={false}
          displayBackButton={false}
          displaySettings={true}
          route={route}
          targetScreen={'PlanCreate'}
        />
        <ScrollView
          contentContainerStyle={[
            globalStyles.container,
            {
              backgroundColor: TEAL_7,
              paddingBottom: 20,
              marginTop: keyboardOffset,
            },
          ]}
        >
          <View style={[globalStyles.topBlockBack, { marginVertical: 20 }]}>
            <BackChevronIcon height={'20'} onPress={() => navigation.goBack()} />
            <LocationBlock
              planName={planObject.title}
              locationName={planObject.locationName}
              locationAddress={planObject.location}
              date={planObject.date}
              time={planObject.time}
            />
          </View>

          {planObject.description.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <AppText style={{ fontSize: 16, color: BLACK }}>{planObject.description}</AppText>
            </View>
          )}

          <View style={globalStyles.fieldContainer}>
            <View>
              <SearchBar
                testID={'FriendSearchBar'}
                onChangeText={searchFriends}
                placeholder="Search for friends"
                leftIcon={<MagnifyingGlassIcon />}
                onFocus={() => setKeyboardOffset(-150)}
                onBlur={() => setKeyboardOffset(0)}
              />
            </View>

            <View>
              <AppText style={[globalStyles.sectionTitle, { marginTop: 10 }]}>Send Invite</AppText>

              <AppText style={{ fontSize: 16 }}>Who do you want to hang out with?</AppText>

              <ContactContainer
                contacts={filteredContacts}
                adjustSelectedContacts={setSelectedContacts}
                containerStyles={{ marginBottom: 5 }}
              />
            </View>
          </View>
        </ScrollView>

        <BottomButton
          disabled={selectedContacts.length == 0 ? true : false}
          title="Send Invite"
          onPress={() => setOpenConfirmModal(true)}
        />
        <PlanConfirmModal
          message={inviteMessage}
          selectedContacts={selectedContacts}
          isOpen={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          onSubmit={() => handleCreatePlan()}
        />
      </View>
    </Screen>
  );
};
