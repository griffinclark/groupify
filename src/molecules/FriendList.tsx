import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Contact } from "../res/dataModels"
import { DK_PURPLE, GREY_3, WHITE } from "../res/styles/Colors";

interface FriendProps {
    friends: Contact[],
    title?: string
}
export const FriendList: React.FC<FriendProps> = ({friends, title}) => {
    return (<View style={styles.outer}>
        { title &&
            <Text style={styles.friendTitle}>{title}</Text>}
        <View style={styles.friendContainer}>
            {friends.map(friend => (<View style={styles.friend}>
                <Text style={styles.friendText} key={friend.name}>{friend.name}</Text>
                </View>)
            )}
        </View>
    </View>)
};

const styles = StyleSheet.create({
    outer: {
        width: "100%",
    },
    friendContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
      },
      friend: {
        backgroundColor: GREY_3,
        borderRadius: 20,
        padding: 7,
        paddingHorizontal: 12,
        margin: 5
      },
      friendText: {
        color: WHITE,
        fontWeight: "bold",
      },
      friendTitle: {
        fontWeight: 'bold',
        marginBottom: 3,
        fontSize: 16,
        color: DK_PURPLE,
      }
})