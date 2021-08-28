import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { GREY_1, WHITE, POST_SPACING, TEAL, TEAL_5, TEAL_2 } from '../res/styles/Colors';
import { Plan } from '../models';
import { formatTime, formatDate, isToday } from '../res/utilFunctions';

interface Props {
  plan: Plan;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MiniPlanTile: React.FC<Props> = ({ plan, onPress }: Props) => {
  const [today, setToday] = useState(false);

  useEffect(() => {
    if (plan.date) {
      setToday(isToday(plan.date));
    }
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>{plan.title}</Text>
        <View style={styles.infoItemRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.infoItem}>{plan.date ? formatDate(plan.date) : ''}</Text>
            <Text>{plan.time ? formatTime(plan.time) : ''}</Text>
          </View>
          {today && (
            <View style={styles.today}>
              <Text>Today!</Text>
            </View>
          )}
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
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoItem: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: GREY_1,
    fontWeight: 'bold',
  },
  today: {
    backgroundColor: TEAL,
    padding: 3,
    borderRadius: 25,
  },
});
