import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Plan, User } from '../models';
import { AppText } from '../atoms/AppText';
import { convertDateStringToDate, formatTime } from '../res/utilFunctions';
import { TEAL } from '../res/styles/Colors';
import { DataStore } from '@aws-amplify/datastore';

interface Props {
  plan: Plan;
}

export const PlanDetailsTile: React.FC<Props> = ({ plan }: Props) => {
  const [hostName, setHostName] = useState('Loading');

  useEffect(() => {
    getPlanHost(plan.creatorID);
  }, []);

  const getPlanHost = async (id: string) => {
    const user = await DataStore.query(User, (user) => user.id('eq', id));
    if (user[0]) {
      setHostName(user[0].name);
    }
  };

  return (
    <View>
      <AppText style={{ fontSize: 18, fontWeight: '700', paddingBottom: 35 }}>Host:</AppText>
      <View style={{ marginLeft: 75, marginTop: -75, flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
        <View style={[styles.sphere, { backgroundColor: TEAL }]}>
          <AppText style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>{hostName.slice(0, 1)}</AppText>
        </View>
        <AppText style={{ fontSize: 18 }}>{hostName}</AppText>
      </View>
      <AppText style={{ fontSize: 16, fontWeight: '700', paddingBottom: 10 }}>Date: </AppText>
      <AppText style={{ fontWeight: '400', marginLeft: 75, marginTop: -30, paddingBottom: 25, lineHeight: 22.88 }}>
        {plan.date && convertDateStringToDate(plan.date).toDateString()}
        {'\n'}
        {plan.time && formatTime(plan.time)}
      </AppText>
      {plan.location && (
        <>
          <AppText style={{ fontSize: 16, fontWeight: '700' }}>Where: </AppText>
          <AppText style={{ fontWeight: '400', marginLeft: 75, marginTop: -20, paddingBottom: 25, lineHeight: 22.88 }}>
            {plan.title}
            {'\n'}
            {plan.location?.substring(0, plan.location.indexOf(',') + 1)}
            {'\n'}
            {plan.location?.substring(plan.location.indexOf(',') + 2)}
          </AppText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sphere: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginRight: 15,
  },
});
