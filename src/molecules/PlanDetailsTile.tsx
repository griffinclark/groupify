import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Plan } from '../models';
import { AppText } from '../atoms/AppText';
import { convertDateStringToDate, formatTime } from '../res/utilFunctions';
import { TEAL } from '../res/styles/Colors';
import { Edit } from '../../assets/Icons/IconExports';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';

interface Props {
  plan: Plan;
  creator: boolean;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const PlanDetailsTile: React.FC<Props> = ({ plan, creator, navigation }: Props) => {
  const [hostName, setHostName] = useState('Loading');

  useEffect(() => {
    getPlanHost(plan.creatorID);
  }, []);

  const getPlanHost = async (id: string) => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const userQuery: any = await API.graphql({
      query: queries.getUser,
      variables: { id: id },
    });
    const user = userQuery.data.getUser;
    if (user) {
      setHostName(user.name);
    }
  };

  return (
    <View>
      <AppText style={{ fontSize: 18, fontWeight: '700', paddingBottom: 35 }}>Host:</AppText>
      <View style={styles.nameRow}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View style={[styles.sphere, { backgroundColor: TEAL }]}>
            <AppText maxFontSizeMultiplier={1} style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>
              {hostName.slice(0, 1)}
            </AppText>
          </View>
          <AppText style={{ fontSize: 18 }}>{hostName}</AppText>
        </View>
        {creator && <Edit onPress={() => navigation.navigate('EditPlan', { currentUserPlan: plan })} />}
      </View>
      <AppText style={{ fontSize: 16, fontWeight: '700', paddingBottom: 10 }}>Date: </AppText>
      <AppText style={{ fontWeight: '400', marginLeft: 75, marginTop: -30, paddingBottom: 25, lineHeight: 22.88 }}>
        {plan.date && convertDateStringToDate(plan.date).toDateString()}
        {'\n'}
        {plan.time && formatTime(plan.time)}
      </AppText>
      {plan.location ? (
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
      ) : null}
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
  nameRow: {
    marginLeft: 75,
    marginTop: -75,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
});
