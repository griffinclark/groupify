import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { JOST } from '../res/styles/Fonts';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { TopNavBar } from '../molecules/TopNavBar';
import { WHITE } from '../res/styles/Colors';
import { tags } from '../res/staticData';
import { InterestBox } from './InterestBox';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const HobbyScreen: React.FC<Props> = ({ navigation, route }: Props) => {
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
      <View style={{ backgroundColor: '#E5E5E5' }}>
        <Text style={{ marginTop: 34, marginLeft: 20, fontSize: 20, fontFamily: JOST['400'] }}>
          What are your interests?
        </Text>
        <View style={{ backgroundColor: WHITE, borderRadius: 12, marginTop: 34 }}>
          <View style={{ marginTop: 19, marginHorizontal: 20 }}>
            <FlatList
              data={tags}
              numColumns={6}
              snapToEnd={true}
              columnWrapperStyle={{
                flexWrap: 'wrap',
              }}
              renderItem={({ item }) => <InterestBox item={item.name} />}
              keyExtractor={(item) => item.id + ''}
            />
          </View>
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
          onPress={() => navigation.navigate('Login', {})}
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
