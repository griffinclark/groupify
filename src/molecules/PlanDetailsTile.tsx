import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Plan } from '../models';
import { AppText } from '../atoms/AppText';
import { convertDateStringToDate, formatTime } from '../res/utilFunctions';
import { TEAL_0 } from '../res/styles/Colors';
import { Edit } from '../../assets/Icons/IconExports';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import Clipboard from 'expo-clipboard';
import { GREY_6 } from './../res/styles/Colors';

interface Props {
  plan: Plan;
  creator: boolean;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const PlanDetailsTile: React.FC<Props> = ({ plan, creator, navigation }: Props) => {
  const [hostName, setHostName] = useState<string>('Loading');
  const [displayCopy, setDisplayCopy] = useState<boolean>(false);

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

  const copyToClipboard = () => {
    if (plan.location) Clipboard.setString(plan.location);
    setDisplayCopy(true);
    setTimeout(() => setDisplayCopy(false), 1000);
  };

  return (
    <View>
      <AppText style={{ fontSize: 18, fontWeight: '700', paddingBottom: 35 }}>Host:</AppText>
      <View style={styles.nameRow}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View style={[styles.sphere, { backgroundColor: TEAL_0 }]}>
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
        <View>
          <AppText style={{ fontSize: 16, fontWeight: '700' }}>Where: </AppText>
          <AppText style={{ fontWeight: '400', marginLeft: 75, marginTop: -20, paddingBottom: 25, lineHeight: 22.88 }}>
            {plan.title}
            {'\n'}

            <TouchableOpacity onPressIn={copyToClipboard}>
              <AppText>
                {plan.location?.substring(0, plan.location.indexOf(',') + 1)}
                {'\n'}
                {plan.location?.substring(plan.location.indexOf(',') + 2)}
              </AppText>
            </TouchableOpacity>
          </AppText>
          {displayCopy && (
            <View style={styles.clipboard}>
              <AppText>Copied to Clipboard</AppText>
            </View>
          )}
        </View>
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
  clipboard: {
    backgroundColor: GREY_6,
    borderRadius: 8,
    position: 'absolute',
    top: -20,
    right: 70,
    left: 70,
    bottom: 70,
    padding: 10,
    alignItems: 'center',
  },
});
