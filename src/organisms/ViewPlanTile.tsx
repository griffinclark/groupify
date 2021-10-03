import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DownArrow, UpArrow } from '../../assets/Icons/IconExports';
import { PlanImageTile } from '../atoms/AtomsExports';
import { Plan } from '../models';
import { InviteePreviewTile } from '../molecules/InviteePreviewTile';
import { PlanDetailsTile } from '../molecules/PlanDetailsTile';

interface Props {
  plan: Plan;
}

export const ViewPlanTile: React.FC<Props> = ({ plan }: Props) => {
  const [extendedDetails, setExtendedDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ height: !extendedDetails ? 205 : 460, overflow: 'hidden' }}>
        <PlanImageTile plan={plan} />
        <View>
          <PlanDetailsTile plan={plan} />
          <InviteePreviewTile plan={plan} />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        {!extendedDetails && <DownArrow onPress={() => setExtendedDetails(true)} />}
        {extendedDetails && <UpArrow onPress={() => setExtendedDetails(false)} />}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
