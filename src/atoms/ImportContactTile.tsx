/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getAllImportedContacts } from '../res/storageFunctions';
import { Contact } from '../res/dataModels';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const ImportContactTile = ({ navigation }: Props) => {
  const [contactd, setContactd] = React.useState<Contact[]>([]);
  const [emptyState, setEmptyState] = React.useState('false');

  useEffect(() => {
    checkContacts();
  }, []);

  const checkContacts = async () => {
    const contacts: Contact[] = await getAllImportedContacts();
    setContactd(contacts);
    if (contacts.length > 0) {
      setEmptyState('true');
    } else {
      setEmptyState('false');
    }
  };
  return (
    <View>
      {emptyState === 'false' ? (
        <View style={tw`mt-2 bg-white pb-4`}>
          <View style={tw`flex-row justify-between px-4 items-center py-8`}>
            <Text style={tw`text-xl text-gray-800 font-semibold`}>Your Contacts</Text>
            <Text style={tw`text-xl text-gray-500 font-medium`}>0 Contacts</Text>
          </View>

          <View style={tw`items-center py-2`}>
            <Text style={tw` mx-4 text-center text-lg font-semibold text-gray-500 pb-4 `}>
              Look like you don&apos;t have any contacts in the app yet. Let&apos;s add some of your friends.!{' '}
            </Text>

            <TouchableOpacity activeOpacity={0.4} style={tw`bg-green-700 py-2 px-24 rounded-xl`}>
              <Text style={tw`text-xl font-semibold text-white`}>Import Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={tw`mt-2 bg-white pb-4`}>
          <View style={tw`flex-row justify-between px-4 items-center py-8`}>
            <Text style={tw`text-xl text-gray-800 font-semibold`}>Your Contacts</Text>
            <Text style={tw`text-xl text-gray-500 font-medium`}>{contactd.length} Contacts</Text>
          </View>
          {contactd
            .filter((item, index) => index < 3)
            .map((contact: Contact) => (
              <Text key={contact.id} style={tw`text-xl ml-4 text-gray-700 font-medium`}>
                {contact.name}
              </Text>
            ))}
          <View style={tw`flex-row justify-between mx-4 mt-2`}>
            <TouchableOpacity onPress={() => navigation.navigate('ImportContacts', {})}>
              <Text style={tw`text-lg text-green-700 font-semibold `}>Add Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ContactList', {})}>
              <Text style={tw`text-lg text-green-700 font-semibold`}>See All Contacts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
