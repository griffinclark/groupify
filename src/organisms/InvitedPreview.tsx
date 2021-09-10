import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Plan } from '../models';
import { MiniPlanTile } from '../molecules/MiniPlanTile';
import { GREY_4, TEAL } from '../res/styles/Colors';
import { loadInviteeStatus } from '../res/utilFunctions';
import { ViewAll } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';

interface Props {
  invitedPlans: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const InvitedPreview: React.FC<Props> = ({ invitedPlans, navigation }: Props) => {
  const [pendingSelected, setPendingSelected] = useState(false);
  const [acceptedSelected, setAcceptedSelected] = useState(true);
  const [pendingPlans, setPendingPlans] = useState([]);
  const [acceptedPlans, setAcceptedPlans] = useState([]);

  useEffect(() => {
    getPendingPlans();
    getAcceptedPlans();
  }, []);

  const getPendingPlans = () => {
    let x = 0;
    for (let i = 0; i < invitedPlans.length; i++) {
      if (pendingPlans.length >= 3) {
        break;
      }
      const plan = invitedPlans[i];
      loadInviteeStatus(plan).then((result) => {
        if (result === 'PENDING') {
          x++;
          const newPlan = [
            <MiniPlanTile
              key={plan.id}
              plan={plan}
              onPress={() => {
                navigation.navigate('PlanDetails', { plan: plan });
              }}
            />,
          ];
          if (x <= 3) {
            setPendingPlans((pendingPlans) => [...pendingPlans, newPlan]);
          }
        }
      });
    }
  };

  const getAcceptedPlans = async () => {
    let x = 0;
    for (let i = 0; i < invitedPlans.length; i++) {
      if (acceptedPlans.length >= 3) {
        break;
      }
      const plan = invitedPlans[i];
      loadInviteeStatus(plan).then((result) => {
        if (result === 'ACCEPTED') {
          x++;
          const newPlan = [
            <MiniPlanTile
              key={plan.id}
              plan={plan}
              onPress={() => {
                navigation.navigate('PlanDetails', { plan: plan });
              }}
            />,
          ];
          if (x <= 3) {
            setAcceptedPlans((acceptedPlans) => [...acceptedPlans, newPlan]);
          }
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <TouchableOpacity
          style={[styles.selectorItem, { borderBottomColor: pendingSelected ? TEAL : 'white' }]}
          onPress={() => {
            setPendingSelected(true);
            setAcceptedSelected(false);
          }}
        >
          <AppText style={[styles.selectorText, { color: pendingSelected ? TEAL : GREY_4 }]}>PENDING</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectorItem, { borderBottomColor: acceptedSelected ? TEAL : 'white' }]}
          onPress={() => {
            setAcceptedSelected(true);
            setPendingSelected(false);
          }}
        >
          <AppText style={[styles.selectorText, { color: acceptedSelected ? TEAL : GREY_4 }]}>ACCEPTED</AppText>
        </TouchableOpacity>
      </View>
      {pendingSelected && pendingPlans}
      {acceptedSelected && acceptedPlans}
      <ViewAll navigation={navigation} destination={'InvitedPlans'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectorItem: {
    padding: 15,
    borderBottomWidth: 4,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
