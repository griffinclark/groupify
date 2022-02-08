import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DownArrow, UpArrow } from '../../assets/Icons/IconExports';
import { PlanImageTile, WhiteButton, AppText } from '../atoms/AtomsExports';
import { Plan } from '../models';
import { InviteePreviewTile, PlanDetailsTile, Details } from '../molecules/MoleculesExports';
import { background, BLACK, GREY_6, TEAL_0 } from '../res/styles/Colors';
import { loadInviteeStatus } from '../res/utilFunctions';

interface Props {
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  modal: (payload: string, plan: Plan) => void;
  reload: boolean;
}

export const ViewPlanTile: React.FC<Props> = ({ plan, navigation, modal, reload }: Props) => {
  const [extendedDetails, setExtendedDetails] = useState(false);
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    const getStatus = async () => {
      const status = await loadInviteeStatus(plan);
      setUserStatus(status);
    };
    getStatus();
  }, [reload]);

  return (
    <View style={{ backgroundColor: userStatus === 'PENDING' ? background : 'white' }}>
      <View style={styles.container}>
        <View>
          {plan.placeID ? (
            <>
              <PlanImageTile plan={plan} />
              <Details plan={plan} />
              {extendedDetails && (
                <>
                  <PlanDetailsTile navigation={navigation} creator={false} plan={plan} />
                  <InviteePreviewTile plan={plan} reload={reload} />
                </>
              )}
            </>
          ) : (
            <>
              <AppText maxFontSizeMultiplier={1} style={{ fontSize: 20 }}>
                {plan.title}
              </AppText>
              {plan.description ? (
                <AppText maxFontSizeMultiplier={1} style={{ fontSize: 14 }}>
                  {plan.description}
                </AppText>
              ) : null}
              <PlanDetailsTile navigation={navigation} creator={false} plan={plan} />
              {extendedDetails && (
                <>
                  <InviteePreviewTile plan={plan} reload={reload} />
                </>
              )}
            </>
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: userStatus != 'PENDING' && !extendedDetails ? 0 : 1,
            borderBottomColor: GREY_6,
            paddingBottom: 10,
          }}
        >
          {!extendedDetails && <DownArrow onPress={() => setExtendedDetails(true)} />}
          {extendedDetails && <UpArrow onPress={() => setExtendedDetails(false)} />}
        </View>
        {extendedDetails && (
          <TouchableOpacity
            onPress={() => navigation.navigate('PlanDetails', { plan: plan, step: 'ViewPlans' })}
            style={{ alignSelf: 'center', paddingTop: 10 }}
          >
            <AppText style={{ fontSize: 20, color: TEAL_0 }}>View Full Plan</AppText>
          </TouchableOpacity>
        )}
        {userStatus === 'PENDING' && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <WhiteButton
              style={styles.button}
              onPress={() => {
                modal('reject', plan);
              }}
              text={'Decline'}
            />
            <WhiteButton
              style={[styles.button, { backgroundColor: TEAL_0 }]}
              textStyles={{ color: 'white' }}
              onPress={() => {
                modal('accept', plan);
              }}
              text={'Accept'}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: '3%',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 40,
    marginTop: 40,
  },
  button: {
    width: 147,
  },
});
