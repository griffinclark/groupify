import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { DK_PURPLE, GREY_5, POST_SPACING } from '../res/styles/Colors';
import { FriendList } from '../organisms/FriendList';
import { Plan } from '../models';
import { formatTime, formatDate } from '../res/utilFunctions';

interface PlanTileProps {
  plan: Plan;
}

export const EventTile: React.FC<PlanTileProps> = ({ plan }: PlanTileProps) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{plan.title}</Text>
      <Text>{plan.description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>When</Text>
          <Text>{plan.date ? formatDate(plan.date) : ''}</Text>
          <Text>{plan.time ? formatTime(plan.time) : ''}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Where</Text>
          <Text>{plan.location}</Text>
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
