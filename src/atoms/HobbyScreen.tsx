import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Interests } from '../models';
import { User } from '../models';
import { JOST } from '../res/styles/Fonts';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { TopNavBar } from '../molecules/TopNavBar';
import { WHITE } from '../res/styles/Colors';
import { tags } from '../res/staticData';
import { InterestBox } from './InterestBox';
import Dots from 'react-native-dots-pagination';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const HobbyScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [activeState, setActiveState] = useState(3);
  const [user, SetUser] = useState<User>();
  const [interestItems, setInterestItems] = useState<string[]>([]);

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
    console.log('interest Items', [...interestItems]);
  }, [interestItems]);

  const handlePress = (item: string, removed: boolean) => {
    const newInterestItems: string[] = [];
    if (removed) {
      for (let i = 0; i < newInterestItems.length; i++) {
        if (newInterestItems[i] === item) {
          newInterestItems.splice(i, 1);
        }
      }
    } else {
      newInterestItems.push(item);
    }
    setInterestItems((int) => [...int, ...newInterestItems]);
  };

  const handleNext = async () => {
    try {
      const addInterest = await DataStore.save(
        new Interests({
          interest: [...interestItems],
        }),
      );
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.Interest = addInterest;
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
    navigation.navigate('SelectorMenu', {});
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
        targetScreen={'Availability'}
      />
      <View style={{ backgroundColor: WHITE }}>
        <Text style={{ marginTop: 34, marginLeft: 20, fontSize: 20, fontFamily: JOST['400'] }}>
          What are your interests?
        </Text>
        <LinearGradient colors={['#fff', '#ccc']} style={styles.gradientStyle} />
        <View style={{ backgroundColor: WHITE, borderRadius: 12, marginTop: 34 }}>
          <View style={{ marginTop: 19, marginHorizontal: 20, height: 530 }}>
            <FlatList
              data={tags}
              numColumns={7}
              // horizontal={false}
              // snapToEnd={true}
              scrollEventThrottle={1900}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                flexWrap: 'wrap',
              }}
              renderItem={({ item }) => <InterestBox handlePress={handlePress} item={item.name} />}
              keyExtractor={(item) => item.id + ''}
            />
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 70, alignSelf: 'center' }}>
        <Dots activeColor="#3F8A8D" length={4} active={activeState} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
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
    height: 80,
  },
});
