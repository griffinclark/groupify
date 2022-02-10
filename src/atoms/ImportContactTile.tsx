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
  const [contact, setContact] = React.useState<Contact[]>([]);
  const [emptyState, setEmptyState] = React.useState(false);

  useEffect(() => {
    const checkContacts = async () => {
      const contacts: Contact[] = await getAllImportedContacts();
      setContact(contacts);
      if (contacts.length > 0) {
        setEmptyState(false);
      } else {
        setEmptyState(true);
      }
    };
    checkContacts();
  }, [contact]);

  return (
    <View>
      {emptyState ? (
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
              <Text style={styles.importText}>Import Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.emptyContainer}>
          <View style={styles.contactContainer}>
            <Text style={styles.header}>Your Contacts</Text>
            <Text style={styles.subHeader}>{contact.length} Contacts</Text>
          </View>
          {contact
            .filter((item, index) => index < 3)
            .map((contact: Contact) => (
              <Text key={contact.id} style={styles.contact}>
                {contact.name}
              </Text>
            ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ImportContacts', {})}>
              <Text style={styles.buttonText}>Add Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ImportContactDetails', {})}>
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
    marginTop: 2,
    backgroundColor: '#fff',
    paddingBottom: 9,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    alignItems: 'center',
    paddingVertical: 22,
    marginHorizontal: 4,
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
  contact: {
    fontSize: 20,
    marginHorizontal: 15,
    fontWeight: '500',
    marginVertical: 9,
  },
  importText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 22,
  },
});
