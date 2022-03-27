import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { getCurrentUser } from '../res/utilFunctions';
import Dots from 'react-native-dots-pagination';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

interface AgeProps {
  age: string;
  setAge: (age: string) => void;
}

const AgeCard: React.FC<AgeProps> = ({ age, setAge }: AgeProps) => (
  <View style={{ backgroundColor: WHITE }}>
    <Text style={styles.text1}>Hey Joni, Let&apos;s get your account set up.</Text>
    <LinearGradient colors={['#fff', '#ccc']} style={styles.gradientStyle} />
    <View
      style={{
        marginTop: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: WHITE,
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: JOST['400'], lineHeight: 28.9, marginTop: 20 }}>How old are you?</Text>
        <TextInput
          value={age}
          maxLength={2}
          onChangeText={(text) => {
            setAge(text);
            console.log(age);
          }}
          style={styles.input}
        />
      </View>
    </View>
  </View>
);

export const OnboardingScreens: React.FC<Props> = ({ navigation, route }: Props) => {
  const [age, setAge] = useState('');
  const [user, SetUser] = useState<User>();
  const [activeState, setActiveState] = useState(0);

  useEffect(() => {
    const loadDatastore = async () => {
      const userInfo = await Auth.currentUserInfo();
      const users = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number), {
        limit: 1,
      });
      console.log('users', users);
      if (users.length === 1) {
        SetUser(users[0]);
      }
    };
    loadDatastore();
  }, []);

  const handleSubmit = async () => {
    await DataStore.save(
      User.copyOf(user, (updated) => {
        updated.age = age;
      }),
    );
    navigation.navigate('Gender', {});
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={true}
        route={route}
        targetScreen={'SelectorMenu'}
      />
      <View>
        <AgeCard age={age} setAge={setAge} />
      </View>
      <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
        <Dots activeColor="#3F8A8D" length={4} active={activeState} />
      </View>
      <View
        style={{
          paddingVertical: 20,
          position: 'absolute',
          bottom: 15,
          alignSelf: 'center',
          backgroundColor: WHITE,
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={{ marginHorizontal: 21, alignItems: 'center' }}>
            <Text style={{ fontFamily: JOST['500'], fontSize: 20, lineHeight: 28.9, color: '#3F8A8D' }}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  text1: {
    marginTop: 14,
    fontSize: 16,
    fontFamily: JOST['400'],
    marginLeft: 20,
    lineHeight: 23.12,
    marginBottom: 20,
  },
  input: {
    marginTop: 35,
    borderBottomWidth: 1,
    fontFamily: JOST['400'],
    fontSize: 20,
  },
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    height: 30,
  },
});
