/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getAllImportedContacts } from '../res/storageFunctions';
import { Contact } from '../res/dataModels';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const ImportContactTile = ({ navigation }: Props) => {
  // TODO should be contacts not contactd
  const [contactd, setContactd] = React.useState<Contact[]>([]);
  // TODO why is this a string?? Should be a boolean
  const [emptyState, setEmptyState] = React.useState('false');

  useEffect(() => {
    checkContacts();
  }, []);

  const checkContacts = async () => {
    // TODO you can just put this code straight into the useEffect. Improves readability
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
      {/* TODO once you chang emptyState to boolean, change this to {emptyState ? ():()} */}
      {emptyState === 'false' ? (
        <View style={styles.emptyContainer}>
          <View style={styles.contactContainer}>
            <Text style={styles.header}>Your Contacts</Text>
            <Text style={styles.subHeader}>0 Contacts</Text>
          </View>

          <View style={{ alignItems: 'center', paddingVertical: 10 }}>
            <Text style={styles.emptyText}>
              Look like you don&apos;t have any contacts in the app yet. Let&apos;s add some of your friends.!{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ImportContacts', {})}
              activeOpacity={0.4}
              style={styles.emptyButton}
            >
              <Text style={{ fontWeight: '600', color: 'white', fontSize: 22 }}>Import Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.emptyContainer}>
          <View style={styles.contactContainer}>
            <Text style={styles.header}>Your Contacts</Text>
            <Text style={styles.subHeader}>{contactd.length} Contacts</Text>
          </View>
          {contactd
            .filter((item, index) => index < 3)
            .map((contact: Contact) => (
              <Text key={contact.id} style={{ fontSize: 20, marginLeft: 8, fontWeight: '500' }}>
                {contact.name}
              </Text>
            ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ImportContacts', {})}>
              <Text style={styles.buttonText}>Add Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ContactList', {})}>
              <Text style={styles.buttonText}>See All Contacts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 5,
    backgroundColor: '#fff',
    paddingBottom: 9,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    alignItems: 'center',
    paddingVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 19,
    fontWeight: '600',
    color: '#767676',
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 8,
    fontWeight: '600',
    color: '#767676',
    paddingBottom: 18,
  },
  emptyButton: {
    backgroundColor: 'teal',
    paddingVertical: 9,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 19,
    color: 'teal',
    fontWeight: '600',
  },
});
