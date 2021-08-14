import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { GREY_1, WHITE, POST_SPACING } from '../res/styles/Colors';
import { Plan } from '../models';
import { formatTime, formatDate } from '../res/utilFunctions';

interface MiniPlanTileProps {
  plan: Plan;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MiniPlanTile: React.FC<MiniPlanTileProps> = ({ plan, onPress }: MiniPlanTileProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>{plan.title}</Text>
        <View style={styles.infoItemRow}>
          <Text style={styles.infoItem}>{plan.date ? formatDate(plan.date) : ''}</Text>
          <Text>{plan.time ? formatTime(plan.time) : ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: 300,
    flexDirection: 'column',
    backgroundColor: WHITE,
    borderRadius: 10,
    marginTop: POST_SPACING,
    marginHorizontal: POST_SPACING,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginBottom: 10,
  },
  infoItemRow: {
    flexDirection: 'row',
  },
  infoItem: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: GREY_1,
    fontWeight: 'bold',
  },
});
