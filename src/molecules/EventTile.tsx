import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DK_PURPLE, GREY_5, POST_SPACING } from '../res/styles/Colors';
import { FriendList } from '../organisms/FriendList';
import { Plan } from '../models';
import { formatTime, formatDate } from '../res/utilFunctions';
import { AppText } from '../atoms/AtomsExports';

interface Props {
  plan: Plan;
}

export const EventTile: React.FC<Props> = ({ plan }: Props) => {
  return (
    <View style={styles.rootContainer}>
      <AppText style={styles.title}>{plan.title}</AppText>
      <AppText>{plan.description}</AppText>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <AppText style={styles.label}>When</AppText>
          <AppText>{plan.date ? formatDate(plan.date) : ''}</AppText>
          <AppText>{plan.time ? formatTime(plan.time) : ''}</AppText>
        </View>
        <View style={styles.infoItem}>
          <AppText style={styles.label}>Where</AppText>
          <AppText>{plan.location}</AppText>
        </View>
      </View>
      <FriendList title="Invited Friends" friends={plan.invitees} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    // height: 500,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREY_5,
    borderRadius: 10,
    marginTop: POST_SPACING,
    marginHorizontal: POST_SPACING,
    padding: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  infoItem: {
    margin: 5,
  },
  title: {
    fontSize: 25,
    color: DK_PURPLE,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 16,
    color: DK_PURPLE,
  },
});
