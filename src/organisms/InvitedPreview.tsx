import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Plan } from '../models';
import { MiniPlanTile } from '../molecules/MiniPlanTile';
import { background, GREY_4, TEAL } from '../res/styles/Colors';
import { loadInviteeStatus } from '../res/utilFunctions';
import { ViewAll } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';

interface Props {
  invitedPlans: Plan[];
  userPlans: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  reload: boolean;
}

export const InvitedPreview: React.FC<Props> = ({ invitedPlans, navigation, reload, userPlans }: Props) => {
  const [pendingSelected, setPendingSelected] = useState(false);
  const [acceptedSelected, setAcceptedSelected] = useState(true);
  const [pendingPlans, setPendingPlans] = useState<JSX.Element[]>([]);
  const [acceptedPlans, setAcceptedPlans] = useState<JSX.Element[]>([]);

  useEffect(() => {
    getPendingPlans();
    getAcceptedPlans();
  }, [reload]);

  const getPendingPlans = () => {
    setPendingPlans([]);
    const newPendingPlans: JSX.Element[] = [];
    for (const plan of invitedPlans) {
      loadInviteeStatus(plan).then((result) => {
        if (result === 'PENDING') {
          const newPlan = (
            <MiniPlanTile
              key={plan.id}
              plan={plan}
              onPress={() => {
                navigation.navigate('PlanDetails', { plan: plan });
              }}
            />
          );
          newPendingPlans.push(newPlan);
          if (newPendingPlans.length === 3) {
            setPendingPlans(newPendingPlans.slice(0, 3));
          }
        }
      });
    }
  };

  const getAcceptedPlans = async () => {
    setAcceptedPlans([]);
    const newAcceptedPlans: JSX.Element[] = [];
    for (const plan of invitedPlans) {
      loadInviteeStatus(plan).then((result) => {
        if (result === 'ACCEPTED') {
          const newPlan = (
            <MiniPlanTile
              key={plan.id}
              plan={plan}
              onPress={() => {
                navigation.navigate('PlanDetails', { plan: plan });
              }}
            />
          );
          newAcceptedPlans.push(newPlan);
          if (newAcceptedPlans.length === 3) {
            setAcceptedPlans(newAcceptedPlans.slice(0, 3));
          }
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <TouchableOpacity
          style={[styles.selectorItem, { borderBottomColor: pendingSelected ? TEAL : background }]}
          onPress={() => {
            setPendingSelected(true);
            setAcceptedSelected(false);
          }}
        >
          <AppText style={[styles.selectorText, { color: pendingSelected ? TEAL : GREY_4 }]}>PENDING</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectorItem, { borderBottomColor: acceptedSelected ? TEAL : background }]}
          onPress={() => {
            setAcceptedSelected(true);
            setPendingSelected(false);
          }}
        >
          <AppText style={[styles.selectorText, { color: acceptedSelected ? TEAL : GREY_4 }]}>ACCEPTED</AppText>
        </TouchableOpacity>
      </View>
      {pendingSelected &&
        (pendingPlans.length > 0 ? (
          pendingPlans
        ) : (
          <View style={{ padding: 30 }}>
            <AppText style={{ textAlign: 'center', fontSize: 20 }}>No pending plans at the moment.</AppText>
            <TouchableOpacity onPress={() => navigation.push('PlanCreate', {})}>
              <AppText style={{ textAlign: 'center', fontSize: 20, color: TEAL, marginTop: 30 }}>
                You can create one!
              </AppText>
            </TouchableOpacity>
          </View>
        ))}
      {acceptedSelected &&
        (acceptedPlans.length > 0 ? (
          acceptedPlans
        ) : (
          <View style={{ padding: 20, marginHorizontal: 30 }}>
            <AppText style={{ textAlign: 'center', fontSize: 20, lineHeight: 28.6 }}>
              Looks like you haven&apos;t accepted any plans
            </AppText>
          </View>
        ))}

      {(acceptedPlans.length > 0 || pendingPlans.length > 0) && (
        <ViewAll
          navigation={navigation}
          destination={'ViewPlans'}
          payload={{
            userPlans: userPlans,
            invitedPlans: invitedPlans,
          }}
        />
      )}
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
