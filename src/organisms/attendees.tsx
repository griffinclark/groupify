import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Pressable, Image } from 'react-native';
import { Screen, Button, NavButton } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import { Auth } from 'aws-amplify';
import { Plan, User } from '../models';
import { Event, Contact } from '../res/dataModels';
import { color } from 'react-native-elements/dist/helpers';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { data?: { prevAction?: string } }) => void;
  };
  route: RoutePropParams;
}

export const Attendees: React.FC<Props> = ({ navigation, route }: Props) => {
  const [TextColor, setTextColor] = useState(false);
  interface renderContactProps {
    item: Contact;
  }

  const handlePress = () => setTextColor(!TextColor);

  const textStyle = { color: TextColor ? '#000' : '#31A59F' };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Alison King',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Ryan Love',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Jason Kim',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29h34',
      title: 'Naomi mama',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e25758',
      title: 'Cory Dorr',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2jj67',
      title: 'Olivia Lorenzo',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2jj68',
      title: 'Olivia Kahn',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1455714tf5',
      title: 'Stanley Asoking',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1455714tf6',
      title: 'Paul Lorenzo',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1455714tf7',
      title: 'Kyle Lore',
    },
  ];

  const Item = ({ title }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: any) => <Item title={item.title} />;

  return (
    <Screen>
      <View style={{ top: 38, zIndex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 25, color: '#31A59F', left: 20, fontWeight: 'bold' }}>Sabrina Cafe</Text>
        <Pressable onPress={() => navigation.navigate('PlansFeed')}>
          <Text style={{ color: '#31A59F', top: 5, fontWeight: 'bold', right: 11 }}>Back To Home</Text>
        </Pressable>
      </View>

      <Image style={styles.inviteImg} source={require('../../assets/pain.png')} />

      <Text style={{ top: 60, left: 20, fontSize: 18, color: '#616060' }}>Attendees</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', top: 90, height: 16 }}>
        <Pressable onPress={handlePress}>
          <Text style={[textStyle, { fontWeight: 'bold' }]}>Going</Text>
        </Pressable>

        <Pressable onPress={handlePress}>
          <Text style={[textStyle, { fontWeight: 'bold' }]}>Waiting</Text>
        </Pressable>

        <Pressable onPress={handlePress}>
          <Text style={[textStyle, { fontWeight: 'bold' }]}>See all</Text>
        </Pressable>
      </View>

      <View style={{ top: 120, flex: 1 }}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>

      <View style={{ top: 670, position: 'absolute', left: 108 }}>
        <Button title="Invite" onPress={() => navigation.navigate('AcceptDecline')} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  inviteImg: {
    width: '100%',
    height: 200,
    top: 40,
  },
  item: {
    width: 160,
    height: 100,
    padding: -40,
    left: 60,
  },
  title: {
    fontSize: 18,
  },
});
