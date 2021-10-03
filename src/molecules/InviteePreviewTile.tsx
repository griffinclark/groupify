import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppText } from '../atoms/AtomsExports';
import { Invitee, Plan } from '../models';
import { TEAL } from '../res/styles/Colors';

interface Props {
  plan: Plan;
}

export const InviteePreviewTile: React.FC<Props> = ({ plan }: Props) => {
  const [acceptedInvitees, setAcceptedInvitees] = useState<Invitee[]>([]);
  const [pendingInvitees, setPendingInvitees] = useState<Invitee[]>([]);

  useEffect(() => {
    loadInvitees();
  });

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
    const accepted = [];
    const pending = [];
    for (let i = 0; i < invitees.length; i++) {
      const invitee = invitees[i];
      if (invitee.status === 'ACCEPTED') {
        accepted.push(invitee);
      }
      if (invitee.status === 'PENDING') {
        pending.push(invitee);
      }
    }
    setAcceptedInvitees(accepted);
    setPendingInvitees(pending);
  };

  const renderInvitee = ({ item }: { item: Invitee }) => {
    return (
      <View style={[styles.sphere, { backgroundColor: TEAL }]}>
        <AppText style={styles.initial}>{item.name.slice(0, 1)}</AppText>
      </View>
    );
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <View>
        <AppText style={{ fontSize: 12, fontWeight: '700' }}>ACCEPTED INVITES</AppText>
        <FlatList
          data={acceptedInvitees}
          renderItem={renderInvitee}
          ListEmptyComponent={() => (
            <View>
              <AppText style={styles.title}>No accepted invitees</AppText>
            </View>
          )}
          horizontal={true}
        />
      </View>
      <View>
        <AppText style={{ fontSize: 12, fontWeight: '700', marginRight: '20%' }}>PENDING INVITES</AppText>
        <FlatList
          data={pendingInvitees}
          renderItem={renderInvitee}
          ListEmptyComponent={() => (
            <View>
              <AppText style={styles.title}>No pending invitees</AppText>
            </View>
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: TEAL,
    flexWrap: 'wrap',
    maxWidth: 250,
    textAlign: 'left',
  },
});
