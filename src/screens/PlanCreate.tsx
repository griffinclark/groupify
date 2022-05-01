import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { AppText, BottomButton, Screen } from '../atoms/AtomsExports';
import { Platform, View, StyleSheet } from 'react-native';
import { formatIosTimeInput, formatTime, roundDate } from '../res/utilFunctions';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { RoutePropParams } from '../res/root-navigation';
import * as Analytics from 'expo-firebase-analytics';
import { LocationBlock, DateTimeSelector } from '../molecules/MoleculesExports';
import { AppTextInput } from '../atoms/AppTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../res/styles/GlobalStyles';
import { TEAL_7 } from '../res/styles/Colors';
import { TopNavBar } from '../molecules/TopNavBar';
import { copy } from '../res/groupifyCopy';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const PlanCreate: React.FC<Props> = ({ navigation, route }: Props) => {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');

  const [locationName, setLocationName] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

  const currentDate = roundDate(new Date());

  const onDateChange = (date: Date) => {
    setDate(date);

    const formatedTime =
      Platform.OS === 'ios' ? formatIosTimeInput(date.toLocaleTimeString()) : formatTime(date.toLocaleTimeString());
    setTime(formatedTime);
  };

  useEffect(() => {
    if (route.params.data) {
      const { data } = route.params;

      if (data.planData.locationName) {
        setLocationName(data.planData.locationName);
        setName(data.planData.locationName);
      }

      if (data.planData.location) {
        setLocationAddress(data.planData.location);
      }
    }
  }, [route.params.data]);

  const onFormSubmit = async () => {
    const id = uuid.v4();
    navigation.navigate('PlanInvite', {
      currentUser: route.params.currentUser,
      data: {
        planData: {
          uuid: id,
          title: name,
          date: date ? date.toString() : currentDate.toString(),
          time: time
            ? time
            : Platform.OS === 'android'
            ? formatTime(currentDate.toLocaleTimeString())
            : formatIosTimeInput(currentDate.toLocaleTimeString()),
          locationName: locationName,
          location: locationAddress,
          placeId: route.params.data ? route.params.data.planData.placeId : '',
          description: desc.trim(),
          imageURL: route.params.data.planData.imageURL,
        },
      },
    });

    await Analytics.logEvent('submit_create_event_to_friends', { userId: id });
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <TopNavBar
          stickyHeader={false}
          title={copy.createAPlanTitle}
          navigation={navigation}
          displayGroupify={false}
          displayBackButton={false}
          displaySettings={true}
          route={route}
          targetScreen={'PlanCreate'}
        />
        <ScrollView
          contentContainerStyle={[
            {
              backgroundColor: TEAL_7,
              marginTop: keyboardOffset,
              paddingBottom: 20,
            },
            globalStyles.container,
          ]}
        >
          <View style={[globalStyles.topBlockBack, { marginVertical: 20 }]}>
            <BackChevronIcon height={'20'} onPress={navigation.goBack} />
            <LocationBlock locationName={locationName} locationAddress={locationAddress} />
          </View>

          <View style={globalStyles.fieldContainer}>
            <AppTextInput
              editable={true}
              label={'Name Your plan - Optional'}
              onChangeText={(e: string) => setName(e)}
              placeholder={'Name Your Plan'}
              value={name === locationName ? '' : name}
              textStyle={globalStyles.sectionTitle}
            />
          </View>

          <View style={[globalStyles.fieldContainer, styles.fieldContainerAfterFirst]}>
            <AppText style={globalStyles.sectionTitle}>{copy.createAPlanChooseTime}</AppText>
            <DateTimeSelector onDateChange={onDateChange} />
          </View>

          <View style={[globalStyles.fieldContainer, styles.fieldContainerAfterFirst]}>
            <AppTextInput
              editable={true}
              label={'Describe Your Plan - Optional'}
              onChangeText={(e: string) => setDesc(e)}
              placeholder={'Describe your Groupify plan'}
              value={desc}
              textStyle={globalStyles.sectionTitle}
              multiline={true}
              inputStyle={{ height: 118 }}
              onBlur={() => {
                setKeyboardOffset(0);
              }}
              onFocus={() => {
                setKeyboardOffset(-250);
              }}
            />
          </View>
        </ScrollView>
        <BottomButton disabled={false} title="Invite Friends" onPress={onFormSubmit} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  fieldContainerAfterFirst: {
    marginTop: 5,
  },
});
