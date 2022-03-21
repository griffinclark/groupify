import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { Checkbox } from 'react-native-paper';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { AvailabilityDayTile } from './AvailabilityDayTile';
import { AvailabilityItem } from './AvailabilityItem';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  // selected: boolean;
}
enum Day {
  Mon = 'Monday',
  Tues = 'Tuesday',
  Wed = 'Wednesday',
  Thur = 'Thursday',
  Fri = 'Friday',
  Sat = 'Saturday',
  Sun = 'Sunday',
}
const dayOfWeek = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
export const AvailablityScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [selected, setSelected] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(Day.Mon);

  const handlePress = () => {
    if (!selected) {
      setSelected(true);
    }
    if (selected) {
      setSelected(false);
    }
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
        targetScreen={'Gender'}
      />
      <View style={{ backgroundColor: '#E5E5E5' }}>
        <Text style={{ marginTop: 34, marginLeft: 20, fontSize: 20, fontFamily: JOST['400'] }}>
          When are you usually free to hang out?
        </Text>

        <View style={{ backgroundColor: WHITE, borderRadius: 12, marginTop: 34 }}>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: WHITE,
            }}
          >
            {dayOfWeek.map((item, index) => (
              <AvailabilityDayTile selectedDay={selectedDay} setSelectedDay={setSelectedDay} item={item} key={index} />
            ))}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 20 }}>
        <Checkbox.Android
          status={selected ? 'checked' : 'unchecked'}
          onPress={handlePress}
          color="#3F8A8D"
          uncheckedColor="#3F8A8D"
        />
        <Text style={{ fontSize: 12, fontFamily: JOST['500'], lineHeight: 17.34 }}>
          Apply Same Times To Every Week Day
        </Text>
      </View>
      <Divider color="#8B8B8B" style={{ width: 360, alignSelf: 'center', marginTop: 15 }} orientation="horizontal" />
      <View>
        <AvailabilityItem />
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
          onPress={() => navigation.navigate('Hobby', {})}
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
