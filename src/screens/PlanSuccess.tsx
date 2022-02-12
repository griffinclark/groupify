import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, View, Image } from 'react-native';
import { Button, AppText } from '../atoms/AtomsExports';
import { CloseIcon } from '../../assets/Icons/Close';
import { ConfettiAnimation } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { formatDatePlanView } from '../res/utilFunctions';
import { globalStyles } from '../res/styles/GlobalStyles';
import { ActivityImage } from '../molecules/ActivityImage';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string) => void;
  };
  route: RoutePropParams;
}

export const PlanSuccess: React.FC<Props> = ({ navigation, route }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const goHome = () => {
    navigation.navigate('Home', {});
    setIsVisible(false);
  };

  const friendNames = () => {
    let friendString = '';

    route.params.data.planData.selectedContacts?.some((contact, index) => {
      if (index > 4) return true;

      friendString += contact.name + ', ';
    });

    if (route.params.data.planData.selectedContacts?.length < 5) {
      friendString = friendString.slice(0, -2);
    } else {
      friendString += '+' + (route.params.data.planData.selectedContacts.length - 5);
    }

    return friendString;
  };

  return (
    <View>
      <ConfettiAnimation />

      <Modal animationType="slide" transparent={true} visible={isVisible} style={{ zIndex: -1 }}>
        <View style={globalStyles.centeredView}>
          <View style={[globalStyles.modalView]}>
            <CloseIcon onPress={goHome} />
            <View style={{ alignSelf: 'center', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <AppText style={[globalStyles.bodyMedium, { marginVertical: 16, alignSelf: 'flex-start' }]}>
                You&apos;re all set! Enjoy your plan!
              </AppText>
              {route.params.data.planData.imageURL ? (
                <ActivityImage
                  referenceId={route.params.data.planData.imageURL}
                  width={Dimensions.get('screen').width * 0.85 - 32}
                  height={208}
                  borderRadius={5}
                />
              ) : (
                <Image
                  source={require('../../assets/activity-selector-bg/image-activity-4.png')}
                  style={{ width: Dimensions.get('screen').width * 0.85 - 32, height: 208, borderRadius: 10 }}
                  resizeMode="cover"
                />
              )}

              <View style={[styles.modalPlanContent, globalStyles.dropShadow]}>
                <AppText style={styles.modalTitle}>
                  {route.params.data.planData.title
                    ? route.params.data.planData.title
                    : route.params.data.planData.locationName}
                </AppText>

                <AppText style={[globalStyles.bodyMedium, { marginBottom: 16 }]}>
                  {formatDatePlanView(route.params.data.planData.date)} {'\n'}
                  {route.params.data.planData.time}
                </AppText>

                {route.params.data.planData.description.length > 0 ? (
                  <AppText style={globalStyles.bodyMedium}>{route.params.data.planData.description}</AppText>
                ) : null}

                <AppText
                  style={[globalStyles.bodySmall, { fontFamily: JOST['600'], marginTop: 16, marginBottom: 8 }]}
                >{`${route.params.data.planData.selectedContacts?.length} People Invited`}</AppText>

                <AppText style={globalStyles.bodySmall}>{friendNames()}</AppText>
              </View>

              <Button
                title={'Awesome Sauce'}
                onPress={goHome}
                containerStyle={{ width: '100%' }}
                buttonStyle={{ minWidth: '100%', borderRadius: 5, marginTop: 15, marginBottom: 0 }}
                textStyle={{ fontSize: 13 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalPlanContent: {
    backgroundColor: WHITE,
    padding: 16,
    paddingBottom: 24,
    borderRadius: 10,
    marginTop: -108,
    marginBottom: 8,
    width: Dimensions.get('screen').width * 0.85 - 56,
    marginHorizontal: 'auto',
  },
  modalTitle: {
    color: TEAL_0,
    fontFamily: JOST['600'],
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
