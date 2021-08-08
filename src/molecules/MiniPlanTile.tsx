import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GREY_6, GREY_1, POST_SPACING } from '../res/styles/Colors';
import { Plan } from '../models';
import { formatTime, formateDate } from '../res/utilFunctions';

interface MiniPlanTileProps {
  plan: Plan;
}

export const MiniPlanTile: React.FC<MiniPlanTileProps> = ({ plan }: MiniPlanTileProps) => {
  const onPress = () => {
    console.log('Go to plan details');
    // TODO: Make this go to plan details screen.
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>{plan.title}</Text>
        <View style={styles.infoItemRow}>
          <Text style={styles.infoItem}>{plan.date ? formateDate(plan.date) : ''}</Text>
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
    backgroundColor: GREY_6,
    borderRadius: 10,
    marginTop: POST_SPACING,
    marginHorizontal: POST_SPACING,
    padding: 15,
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
