import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DK_PURPLE, GREY_3, WHITE } from '../res/styles/Colors';
import { Invitee } from '../models';
import { AppText } from '../atoms/AtomsExports';

interface Props {
  friends?: (Invitee | null)[];
  title?: string;
  style?: Record<string, unknown>;
}

export const FriendList: React.FC<Props> = ({ friends, title, style }: Props) => {
  return (
    <View style={[styles.outer, style]}>
      {title && <Text style={styles.friendTitle}>{title}</Text>}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.friendContainer}
        persistentScrollbar={true}
      >
        {friends?.map((friend) => (
          <View style={styles.friend} key={friend?.id}>
            <AppText style={styles.friendText}>{friend?.name}</AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    margin: 10,
    flexGrow: 1,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  friendContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  friend: {
    backgroundColor: GREY_3,
    borderRadius: 20,
    padding: 7,
    paddingHorizontal: 12,
    margin: 5,
  },
  friendText: {
    color: WHITE,
    fontWeight: 'bold',
  },
  friendTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 16,
    color: DK_PURPLE,
  },
});
