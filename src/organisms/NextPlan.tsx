import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Plan } from '../models';
import { GREY_0, TEAL } from '../res/styles/Colors';
import { formatDayOfWeekDate, formatTime, loadPhoto } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';
import { InviteePreviewTile } from '../molecules/InviteePreviewTile';
import * as queries from '../graphql/queries';

interface Props {
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  reload: boolean;
}

export const NextPlan: React.FC<Props> = ({ plan, navigation, reload }: Props) => {
  const [photoURI, setPhotoURI] = useState('');
  const [hostName, setHostName] = useState('');

  useEffect(() => {
    getHost(plan.creatorID);
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, [reload]);

  const getHost = async (id: string) => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const userQuery: any = await API.graphql({
      query: queries.getUser,
      variables: { id: id },
    });
    const user = userQuery.data.getUser;
    if (user) {
      setHostName(user.name);
      return user.name;
    }
  };

  return (
    <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.push('PlanDetails', { plan: plan })}>
      <View style={styles.planContainer}>
        {photoURI ? (
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover">
            <View style={styles.dateContainer}>
              <AppText style={styles.date}>{plan.date && formatDayOfWeekDate(plan.date, true)}</AppText>
            </View>
          </Image>
        ) : null}
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <AppText style={{ fontWeight: '400', fontSize: 12, marginVertical: 12 }}>Host: {hostName}</AppText>
          <AppText style={{ fontWeight: '400', fontSize: 20 }}>{plan.description ? plan.description : null}</AppText>
          <View style={{ marginVertical: 20 }}>
            <AppText style={{ fontWeight: '700', fontSize: 12 }}>DETAILS</AppText>
            <AppText style={{ fontSize: 12, fontWeight: '400', marginVertical: 4 }}>
              Date: {plan.date && formatDayOfWeekDate(plan.date)} Time: {plan.time && formatTime(plan.time)}
            </AppText>
            <AppText style={{ fontSize: 12, fontWeight: '400' }}>Where: {plan.title}</AppText>
          </View>
          <InviteePreviewTile plan={plan} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
    color: GREY_0,
  },
  date: {
    fontWeight: '400',
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-end',
  },
  dateContainer: {
    backgroundColor: TEAL,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 10,
  },
});
