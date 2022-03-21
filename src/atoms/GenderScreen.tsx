import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { GenderItemCard } from '../molecules/GenderItemCard';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}
const data = [
  {
    gender: 'Female',
  },
  {
    gender: 'Male',
  },
  {
    gender: 'Nonbinary',
  },
  {
    gender: 'Prefer Not to Say',
  },
];
export const GenderScreen: React.FC<Props> = ({ navigation, route }: Props) => (
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
    <View style={{ backgroundColor: '#E5E5E5' }}>
      <Text style={{ marginTop: 34, marginLeft: 20, fontSize: 20, fontFamily: JOST['400'] }}>
        What&apos;s your gender?
      </Text>
      <View style={{ borderRadius: 12, backgroundColor: WHITE, marginTop: 35 }}>
        {data.map((item, index) => (
          <GenderItemCard item={item} key={index} />
        ))}
      </View>
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
        onPress={() => navigation.navigate('Availability', {})}
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
