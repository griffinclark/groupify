import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FriendBubble } from '../atoms/AtomsExports';
import { User } from '../models';

interface Props {
  friends: User[];
  adjustSelectedFriends: (friends: User[]) => void;
}

export const FriendContainer: React.FC<Props> = ({ friends, adjustSelectedFriends }: Props) => {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);

  useEffect(() => {
    adjustSelectedFriends(selectedFriends);
  }, [selectedFriends]);

  const addSelectedFriend = (friend: User) => {
    setSelectedFriends((selectedFriends) => [...selectedFriends, friend]);
  };

  const removeSelectedFriend = (friend: User) => {
    let index = 0;
    for (let i = 0; i < selectedFriends.length; i++) {
      if (selectedFriends[i].id === friend.id) {
        index = i;
        break;
      }
    }
    selectedFriends.splice(index, 1);
    setSelectedFriends(selectedFriends.slice(0));
  };

  const renderFriend = () => {
    const friendsList = [];
    for (let i = 0; i < friends.length; i++) {
      const item = friends[i];
      friendsList.push(
        <FriendBubble
          selectedFriends={selectedFriends}
          friend={item}
          key={item.id}
          addUser={addSelectedFriend}
          removeUser={removeSelectedFriend}
        />,
      );
    }
    return <View style={styles.friendsList}>{friendsList}</View>;
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.friendContainer}>{renderFriend()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  friendsList: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    maxWidth: Dimensions.get('screen').width,
    flexWrap: 'wrap',
  },
  friendContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    overflow: 'scroll',
  },
});
