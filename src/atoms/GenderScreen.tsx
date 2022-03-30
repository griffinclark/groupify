import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { Divider } from 'react-native-elements';
import { Gender, User } from '../models';
import { RadioButton } from 'react-native-paper';
import Dots from 'react-native-dots-pagination';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

enum SelectedOptions {
  female = 'Female',
  male = 'Male',
  nonBinary = 'Nonbinary',
  preferNotToSay = 'Prefer Not to Say',
}
export const GenderScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [state, setState] = useState<any>(SelectedOptions.female);
  const [user, setUser] = useState<User>();
  const [genderSelected, setGenderSelected] = useState('');
  const [activeState, setActiveState] = useState(1);

  useEffect(() => {
    const loadDatastore = async () => {
      const userInfo = await Auth.currentUserInfo();
      const users = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number), {
        limit: 1,
      });
      console.log('users', users);
      if (users.length === 1) {
        setUser(users[0]);
      }
    };
    //   switch (state) {
    //     case SelectedOptions.female === state:
    //       setGenderSelected('Female');
    //       break;
    //     case SelectedOptions.male === state:
    //       setGenderSelected('MALE');
    //       break;
    //     case SelectedOptions.nonBinary === state:
    //       setGenderSelected('NONBINARY');
    //       break;
    //     case SelectedOptions.preferNotToSay === state:
    //       setGenderSelected('PREFER_NOT_TO_SAY');
    //       break;
    //   }
    loadDatastore();
    // console.log(state);
    console.log(genderSelected);
  }, [state]);

  useEffect(() => {
    console.log('state', state);
  }, []);

  const handleNext = async () => {
    const gender = genderSelected;
    if (state === 'Female') {
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.gender = Gender.FEMALE;
        }),
      );
    }
    if (state === 'Male') {
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.gender = Gender.MALE;
        }),
      );
    }
    if (state == 'Nonbinary') {
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.gender = Gender.NONBINARY;
        }),
      );
    }
    if (state == 'Prefer Not to Say') {
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.gender = Gender.PREFER_NOT_TO_SAY;
        }),
      );
    }

    navigation.navigate('Availability', {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={true}
        route={route}
        targetScreen={'Onboarding'}
      />
      <View style={{ backgroundColor: WHITE }}>
        <Text style={{ marginTop: 34, marginLeft: 20, fontSize: 20, fontFamily: JOST['400'] }}>
          What&apos;s your gender?
        </Text>
        <LinearGradient colors={['#fff', '#ccc']} style={styles.gradientStyle} />
        <View style={{ borderRadius: 12, backgroundColor: WHITE, marginTop: 35 }}>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => setState(SelectedOptions.female)}
              style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}
            >
              {/* <Checkbox.Android
                status={state == SelectedOptions.female ? 'checked' : 'unchecked'}
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
              /> */}
              <RadioButton
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
                value={SelectedOptions.female}
                status={state == SelectedOptions.female ? 'checked' : 'unchecked'}
              />
              <Text style={{ fontFamily: JOST['400'], fontSize: 16 }}>Female</Text>
            </TouchableOpacity>
            <Divider color="#8B8B8B" style={{ width: 335, marginLeft: 10 }} orientation="horizontal" />
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => setState(SelectedOptions.male)}
              style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}
            >
              {/* <Checkbox.Android
                status={state == SelectedOptions.male ? 'checked' : 'unchecked'}
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
              /> */}
              <RadioButton
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
                value={SelectedOptions.male}
                status={state == SelectedOptions.male ? 'checked' : 'unchecked'}
              />
              <Text style={{ fontFamily: JOST['400'], fontSize: 16 }}>Male</Text>
            </TouchableOpacity>
            <Divider color="#8B8B8B" style={{ width: 335, marginLeft: 10 }} orientation="horizontal" />
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => setState(SelectedOptions.nonBinary)}
              style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}
            >
              {/* <Checkbox.Android
                status={state == SelectedOptions.nonBinary ? 'checked' : 'unchecked'}
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
              /> */}
              <RadioButton
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
                value={SelectedOptions.nonBinary}
                status={state == SelectedOptions.nonBinary ? 'checked' : 'unchecked'}
              />
              <Text style={{ fontFamily: JOST['400'], fontSize: 16 }}>Nonbinary</Text>
            </TouchableOpacity>
            <Divider color="#8B8B8B" style={{ width: 335, marginLeft: 10 }} orientation="horizontal" />
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => setState(SelectedOptions.preferNotToSay)}
              style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}
            >
              {/* <Checkbox.Android
                status={state == SelectedOptions.preferNotToSay ? 'checked' : 'unchecked'}
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
              /> */}
              <RadioButton
                color="#3F8A8D"
                uncheckedColor="#3F8A8D"
                value={SelectedOptions.preferNotToSay}
                status={state == SelectedOptions.preferNotToSay ? 'checked' : 'unchecked'}
              />
              <Text style={{ fontFamily: JOST['400'], fontSize: 16 }}>Prefer Not to Say</Text>
            </TouchableOpacity>
            <Divider color="#8B8B8B" style={{ width: 335, marginLeft: 10 }} orientation="horizontal" />
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
        <Dots activeColor="#3F8A8D" length={4} active={activeState} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity style={{ marginHorizontal: 21, alignItems: 'center' }}>
          <Text style={{ fontFamily: JOST['500'], fontSize: 20, lineHeight: 28.9, color: '#3F8A8D' }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: '#3F8A8D',
            width: 222,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontFamily: JOST['500'], fontSize: 20, lineHeight: 28.9, color: WHITE }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    height: 70,
  },
});
