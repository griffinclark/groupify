import React, { useEffect, useState } from "react";
import { RoutePropParams } from '../res/root-navigation';
import { StyleSheet, View, Image } from "react-native";
import { AppText, Screen } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { API, Auth } from 'aws-amplify';
import { User } from '../models';
import { GREY_3 } from '../res/styles/Colors';


export interface Props {
    navigation: {
        navigate: (ev: string, {}) => void;
    };
    route: RoutePropParams;
}

export const Settings: React.FC<Props> = ({ navigation, route }: Props) => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [state, setState] = useState('loading');

    return (
        <Screen>
            <View testID="SettingsScreen" style={styles.settingsContainer}>
                <View style={styles.settingsContent}>
                    <Image style={styles.partyIcon} source={require('../../assets/Party.png')} />
                    <AppText style={{fontSize: 20}}>
                        Nothing to see here!
                    </AppText>
                    <AppText style={styles.greyText}>
                        This page is still in development,{"\n"}
                        Please wait for future updates.
                    </AppText>
                </View>
            </View>
            <View style={styles.navbar}>
                <HomeNavBar user={currentUser} navigation={navigation} userPlans={userPlans} invitedPlans={invitedPlans} />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1
    },
    settingsContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    greyText: {
        fontSize: 20,
        color: GREY_3,
        textAlign: 'center'
    },
    partyIcon: {
        marginBottom: 24
    }
});