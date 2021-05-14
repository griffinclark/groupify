import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Contact } from "../res/dataModels"
import { DK_PURPLE, GREY_3, WHITE } from "../res/styles/Colors";

interface FriendProps {
    friends: Contact[],
    title?: string,
    style?: object
}
export const FriendList: React.FC<FriendProps> = ({friends, title, style}) => {
    return (<View style={[styles.outer, style]}>
        { title &&
            <Text style={styles.friendTitle}>{title}</Text>}
        <ScrollView 
            style={styles.scrollContainer} 
            contentContainerStyle={styles.friendContainer}
            persistentScrollbar={true}
        >
            {friends.map(friend => (<View style={styles.friend} key={friend.id}>
                <Text style={styles.friendText}>{friend.name}</Text>
                </View>)
            )}
        </ScrollView>
    </View>)
};

const styles = StyleSheet.create({
    outer: {
        width: "100%",
        margin: 10,
        // borderWidth: 1,
        flexGrow: 1, 
        flex: 1,  
    },
    scrollContainer: {
       flex: 1
    },
    friendContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        width: "100%",
        // borderWidth: 1,
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