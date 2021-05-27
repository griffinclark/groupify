import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { Event } from '../res/dataModels';
import { deleteUserEventFromUUID, getUserEventFromUUID } from '../res/storageFunctions';
import { TwoButtonAlert } from '../atoms/AtomsExports';
import { EventTile } from '../molecules/MoleculesExports';
import { Navbar } from '../molecules/MoleculesExports';
import { RootStackParamList, RoutePropParams } from '../res/root-navigation';

interface Props {
  navigation: RootStackParamList;
  route: RoutePropParams;
}

export const EventDetails: React.FC<Props> = ({ navigation, route }: Props) => {
  const [event, setEvent] = useState<Event | undefined>();

  useEffect(() => {
    // console.log(route.params.data.eventUUID);
    getUserEvent(route.params.data.eventUUID);
  }, [route.params.data.eventUUID]);

  const getUserEvent = async (uuid: string) => {
    const event = await getUserEventFromUUID(uuid);
    setEvent(event);
  };

  const createTwoButtonAlert = () =>
    TwoButtonAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this event?',
      button1Text: 'Cancel',
      button2Text: 'Delete',
      button2OnPress: onPressDelete,
    });

  const onPressDelete = async () => {
    await deleteUserEventFromUUID(event.uuid);
    navigation.navigate('Home', { data: { prevAction: 'deleted event' + event?.uuid } });
  };

  return (
    <SafeAreaView>
      <Navbar navigation={navigation} />
      <View style={{ height: 50 }} />
      {event ? (
        <EventTile
          uuid={event.uuid}
          title={event.title}
          showImage={event.showImage}
          imageURL={event.imageURL}
          description={event.description}
          tags={event.tags}
          friends={event.friends}
          displayButton={false}
          navigation={navigation}
          date={event.date}
          time={event.time}
          location={event.location}
        />
      ) : (
        <Text>Loading event details...</Text>
      )}
      <View style={{ height: 600 }} />
      <Button title="Delete Event" onPress={createTwoButtonAlert} />
    </SafeAreaView>
  );
};
