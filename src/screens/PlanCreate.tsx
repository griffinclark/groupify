import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import { AppText, BottomButton, Screen } from '../atoms/AtomsExports';
import { Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { formatIosTimeInput, formatTime, roundDate } from '../res/utilFunctions';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { TEAL } from '../res/styles/Colors';
import { RoutePropParams } from '../res/root-navigation';
import * as Analytics from 'expo-firebase-analytics';
import { LocationBlock, DateTimeSelector }  from '../molecules/MoleculesExports';
import { AppTextInput } from '../atoms/AppTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { globalStyles } from '../res/styles/GlobalStyles';

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
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    const [locationName, setLocationName] = useState<string>('');
    const [locationAddress, setLocationAddress] = useState<string>('');

    const currentDate = roundDate(new Date());


    const onDateChange = (date: Date) => {
        setDate(date.toLocaleDateString());

        const formatedTime = Platform.OS === 'ios' ? formatIosTimeInput(date.toLocaleDateString()) : formatTime(date.toLocaleTimeString());
        setTime(formatedTime);
    }

    useEffect(() => {
        if(route.params.data) {
            const { data } = route.params;

            if (data.eventData.locationName) {
                setLocationName(data.eventData.locationName);
                setName(data.eventData.locationName);
            }
        
            if(data.eventData.location) {
                setLocationAddress(data.eventData.location);
            }
        }
    }, [route.params.data]);

    const onFormSubmit = async () => {
        const id = uuid.v4();

        navigation.navigate('PlanInvite', {
            currentUser: route.params.currentUser,
            data: {
                eventData: {
                    uuid: id,
                    title: name,
                    date: date ? date : currentDate.toLocaleDateString(),
                    time: time
                        ? time
                        : Platform.OS === 'android'
                        ? formatTime(currentDate.toLocaleTimeString())
                        : formatIosTimeInput(currentDate.toLocaleTimeString()),
                    locationName: locationName,
                    location: locationAddress,
                    placeId: route.params.data ? route.params.data.eventData.placeId : ''
                }
            }
        });

        await Analytics.logEvent('submit_create_event_to_friends', {userId: id})
    };
    return (                
        <Screen>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: 'white' }}
                    behavior={"position"} keyboardVerticalOffset={Constants.statusBarHeight}
                > 
                    <View style={globalStyles.container}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                            <AppText style={globalStyles.navTitle}>Build a Plan</AppText>
                        </View>

                        
                        <View style={globalStyles.topBlockBack}>
                            <BackChevronIcon height={'20'} onPress={() => navigation.goBack()} />
                            <LocationBlock locationName={locationName} locationAddress={locationAddress} />
                        </View>

                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                paddingTop: Constants.statusBarHeight - 340,
                              }}
                        >
                            <AppText style={globalStyles.sectionTitle}>When are we meeting?</AppText>
                            <DateTimeSelector onDateChange={onDateChange} />
                            
                            <View>
                                <AppTextInput
                                        editable={true}
                                        label={'Name Your plan - Optional'}
                                        onChangeText={(e: string) => setName(e)}
                                        placeholder={'Name Your Plan'}
                                        value={name === locationName ? '' : name}
                                        textStyle={{fontWeight: 'bold', fontSize: 18}}
                                    />
                            </View>
                        </ScrollView>
                    </View>
                    </KeyboardAvoidingView>

                <BottomButton disabled={false} title="Invite Friends" onPress={onFormSubmit} />
            </View>
        </Screen>
    );
};
